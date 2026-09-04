"use client"

import { Clock, ListChecks, Timer, Sparkles, Pencil } from "lucide-react"
import { fmtMinutes } from "@/app/lib/time"
import type { DaySummary } from "../hooks/UseDaySummary"
import styles from "./dashboard.module.css"

export default function DayStatsBar({
    summary,
    onEdit,
}: {
    summary: DaySummary
    onEdit: () => void
}) {
    const over = summary.overCommittedMinutes > 0
    const pct =
        summary.availableMinutes > 0
            ? Math.min(100, Math.round((summary.committedMinutes / summary.availableMinutes) * 100))
            : 0

    return (
        <>
            <div className={styles.statsWrap}>
                <div className={styles.statCard}>
                    <div className={styles.statHead}>
                        <Clock size={15} /> بودجهی روز
                    </div>
                    <div className={styles.statValue}>{fmtMinutes(summary.availableMinutes)}</div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statHead}>
                        <ListChecks size={15} /> تخصیص‌شده
                    </div>
                    <div className={styles.statValue}>{fmtMinutes(summary.committedMinutes)}</div>
                    <div className={`${styles.progressTrack} ${over ? styles.over : ""}`}>
                        <div className={styles.progressFill} style={{ width: `${over ? 100 : pct}%` }} />
                    </div>
                    {over && <div className={styles.warnChip}>بیش از بودجه</div>}
                </div>

                <div className={`${styles.statCard} ${styles.pool}`}>
                    <div className={styles.statHead}>
                        <Timer size={15} /> وقت آزاد
                    </div>
                    <div className={styles.statValue}>{fmtMinutes(summary.poolMinutes)}</div>
                </div>

                <div className={`${styles.statCard} ${styles.saved}`}>
                    <div className={styles.statHead}>
                        <Sparkles size={15} /> سیو شده‌ی امروز
                    </div>
                    <div className={styles.statValue}>{fmtMinutes(summary.savedMinutes)}</div>
                </div>
            </div>

            <div className={styles.statsFooter}>
                <button className={styles.editBtn} onClick={onEdit}>
                    <Pencil size={14} /> تنظیم وقت روز
                </button>
            </div>
        </>
    )
}
