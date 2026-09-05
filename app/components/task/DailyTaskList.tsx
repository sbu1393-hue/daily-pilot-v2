"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useCalendar } from "@/app/contexts/CalenderContext"
import { useDaySummary } from "../../hooks/UseDaySummary"
import { todayKey, shiftDayKey } from "../../lib/jalili"
import { faDigits } from "@/app/lib/time"
import { toast } from "react-toastify"
import { type TaskItem } from "./taskTypes"
import TaskCard from "./TaskCard"
import CreateTaskModal from "./CreateTaskModal"
import CompleteTaskModal from "./CompleteTaskModal"
import RolloverDialog from "./RolloverDialog"
import styles from "./task.module.css"
import ReanalyzeModal from "./ReanalyzeModal"

const priorityWeight: Record<TaskItem["priority"], number> = { HIGH: 3, MEDIUM: 2, LOW: 1 }

// پارس دفاعی: پاسخ ممکن است { data } یا { tasks } باشد
function readTasks(json: unknown): TaskItem[] {
    const obj = (json ?? {}) as { data?: unknown; tasks?: unknown }
    const list = Array.isArray(obj.data) ? obj.data : Array.isArray(obj.tasks) ? obj.tasks : []
    return list as TaskItem[]
}

export default function DailyTaskList() {
    const { selectedDate } = useCalendar()
    const { summary, refresh: refreshSummary } = useDaySummary()

    const [tasks, setTasks] = useState<TaskItem[]>([])
    const [overdue, setOverdue] = useState<TaskItem[]>([])
    const [loading, setLoading] = useState(true)
    const [busy, setBusy] = useState(false)

    const [createOpen, setCreateOpen] = useState(false)
    const [completeTask, setCompleteTask] = useState<TaskItem | null>(null)
    const [rolloverOpen, setRolloverOpen] = useState(false)
    const [deleteTask, setDeleteTask] = useState<TaskItem | null>(null)

    const [reanalyzeTask, setReanalyzeTask] = useState<TaskItem | null>(null)

    const requestSeq = useRef(0) // محافظ race هنگام تعویض سریع روز

    const loadDay = useCallback(async () => {
        const seq = ++requestSeq.current
        setLoading(true)
        try {
            const res = await fetch(`/api/tasks?dayKey=${selectedDate}`)
            const json = await res.json().catch(() => ({}))
            if (!res.ok) throw new Error((json as { message?: string }).message || "خطا در دریافت تسک‌ها")
            if (seq === requestSeq.current) setTasks(readTasks(json))
        } catch (e) {
            if (seq === requestSeq.current) {
                toast.error(e instanceof Error ? e.message : "خطا در دریافت تسک‌ها")
            }
        } finally {
            if (seq === requestSeq.current) setLoading(false)
        }
    }, [selectedDate])

    // تسک‌های ناتمام روزهای قبل — اندپوینت مخصوص بازگرداندنِ تسک‌های عقب‌افتاده
    const loadOverdue = useCallback(async () => {
        try {
            const res = await fetch("/api/tasks/overdue")
            const json = await res.json().catch(() => ({}))
            if (!res.ok) return
            const limit = shiftDayKey(todayKey(), -6) // فقط ۷ روز اخیر
            setOverdue(readTasks(json).filter((t) => t.dayKey >= limit))
        } catch {
            /* بی‌صدا */
        }
    }, [])

    const refreshAll = useCallback(async () => {
        await Promise.all([loadDay(), loadOverdue()])
    }, [loadDay, loadOverdue])

    useEffect(() => {
        refreshAll()
    }, [refreshAll])

    const afterMutation = useCallback(
        async (msg?: string) => {
            await Promise.all([refreshAll(), refreshSummary(true)])
            window.dispatchEvent(new Event("planner:mutated")) // نوار آمار فاز ۵ هم رفرش بشه
            if (msg) toast.success(msg)
        },
        [refreshAll, refreshSummary],
    )

    const ordered = useMemo(() => {
        const scoreOf = (t: TaskItem) => t.score ?? 0
        return [...tasks].sort((a, b) => {
            const aDone = a.status === "DONE" ? 1 : 0
            const bDone = b.status === "DONE" ? 1 : 0
            if (aDone !== bDone) return aDone - bDone
            if (aDone === 1) return (b.completedOn ?? "").localeCompare(a.completedOn ?? "")
            if (a.status === "IN_PROGRESS" && b.status !== "IN_PROGRESS") return -1
            if (b.status === "IN_PROGRESS" && a.status !== "IN_PROGRESS") return 1
            const d = scoreOf(b) - scoreOf(a)
            return d !== 0 ? d : priorityWeight[b.priority] - priorityWeight[a.priority]
        })
    }, [tasks])

    const doneCount = useMemo(() => tasks.filter((t) => t.status === "DONE").length, [tasks])
    const overCommitted = (summary?.overCommittedMinutes ?? 0) > 0

    const handleDelete = async () => {
        if (!deleteTask) return
        setBusy(true)
        try {
            const res = await fetch(`/api/tasks/${deleteTask.id}`, { method: "DELETE" })
            const json = await res.json().catch(() => ({}))
            if (!res.ok) throw new Error((json as { message?: string }).message || "خطا در حذف تسک")
            setDeleteTask(null)
            await afterMutation("تسک حذف شد؛ زمانش به استخر روز برگشت 🕊")
        } catch (e) {
            toast.error(e instanceof Error ? e.message : "خطا در حذف تسک")
        } finally {
            setBusy(false)
        }
    }

    const handleRollover = async (ids: number[]) => {
        setBusy(true)
        try {
            const res = await fetch("/api/tasks/rollover", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ taskIds: ids }),
            })
            const json = await res.json().catch(() => ({}))
            if (!res.ok) throw new Error((json as { message?: string }).message || "خطا در انتقال کارها")
            setRolloverOpen(false)
            await afterMutation("کارها به امروز منتقل و دوباره زمان‌بندی شدند ✅")
        } catch (e) {
            toast.error(e instanceof Error ? e.message : "خطا در انتقال کارها")
        } finally {
            setBusy(false)
        }
    }


    return (
        <section className={styles.section}>
            <div className={styles.headerRow}>
                <h3>
                    برنامه روز {faDigits(selectedDate.replaceAll("-", "/"))}
                </h3>
                {tasks.length > 0 && (
                    <span className={styles.count}>
                        {faDigits(doneCount)} از {faDigits(tasks.length)} انجام شده
                    </span>
                )}
            </div>

            {overCommitted && (
                <div className={styles.warningBar}>
                    ⚠️ ظرفیت روز پر شده و زمان بعضی کارها کم شده. اگه تسک جدید اضافه کنی، از کارهای
                    کم‌اهمیت‌تر کم می‌شود — یا «زمان آزاد» روز را زیاد کن.
                </div>
            )}

            {overdue.length > 0 && (
                <div className={styles.banner}>
                    <span>
                        📥 {faDigits(overdue.length)} کار از روزهای قبل ناتمام مانده
                    </span>
                    <button className={styles.btnPrimary} onClick={() => setRolloverOpen(true)}>
                        انتقال به امروز
                    </button>
                </div>
            )}

            {loading && tasks.length === 0 ? (
                <p className={styles.empty}>در حال بارگذاری…</p>
            ) : ordered.length === 0 ? (
                <div className={styles.empty}>
                    هنوز کاری برای این روز ثبت نشده.
                    <br />
                    اولین تسک را بساز تا هوش مصنوعی اولویت و زمان‌بندیش را مشخص کند.
                </div>
            ) : (
                <ul className={styles.list}>
                    {/* AnimatePresence تا کارت‌ها هنگام حذف/اتمام، با انیمیشن خارج شوند */}
                    <AnimatePresence initial={false} mode="popLayout">
                        {ordered.map((task) => (
                            <TaskCard
                                key={task.id}
                                task={task}
                                onComplete={setCompleteTask}
                                onDelete={setDeleteTask}
                                onReanalyze={setReanalyzeTask}
                            />
                        ))}
                    </AnimatePresence>
                </ul>
            )}

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} style={{ width: "fit-content" }}>
                <button className={styles.btnPrimary} onClick={() => setCreateOpen(true)}>
                    + تسک جدید
                </button>
            </motion.div>

            <CreateTaskModal
                open={createOpen}
                onClose={() => setCreateOpen(false)}
                onCreated={() => afterMutation()}
            />

            <CompleteTaskModal
                task={completeTask}
                onClose={() => setCompleteTask(null)}
                onCompleted={() => afterMutation()}
            />

            {rolloverOpen && overdue.length > 0 && (
                <RolloverDialog
                    tasks={overdue}
                    onClose={() => setRolloverOpen(false)}
                    onConfirm={handleRollover}
                    busy={busy}
                />
            )}

            {deleteTask && (
                <div className={styles.overlay} onClick={() => setDeleteTask(null)}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalHead}>
                            <h4>حذف تسک</h4>
                        </div>
                        <p className={styles.hint}>
                            «{deleteTask.text}» حذف شود؟ زمانِ تخصیص‌یافته‌اش به استخر روز برمی‌گردد.
                        </p>
                        <div className={styles.modalActions}>
                            <button
                                className={`${styles.btnPrimary} ${styles.btnDanger}`}
                                onClick={handleDelete}
                                disabled={busy}
                            >
                                حذف کن
                            </button>
                            <button className={styles.btnGhost} onClick={() => setDeleteTask(null)}>
                                انصراف
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <ReanalyzeModal
                key={reanalyzeTask?.id ?? "none"} // باز شدن دوباره = مونت مجدد = state تمیز
                task={reanalyzeTask}
                onClose={() => setReanalyzeTask(null)}
                onDone={() => afterMutation()}
            />
        </section>
    )
}
