import styles from "./landing.module.css"

const tasks = [
    { label: "مطالعه کتاب", done: true },
    { label: "تمرین زبان", done: false },
    { label: "آماده کردن گزارش", done: false },
]

export default function DashboardPreview() {
    return (
        <section className={styles.previewSection} aria-label="پیش‌نمایش داشبورد">
            <div className={styles.previewCard}>
                <div className={styles.previewBar}>
                    <span className={styles.previewDots} aria-hidden="true">
                        <i /><i /><i />
                    </span>
                    <span className={styles.previewUrl}>app.dailypilot.ir</span>
                </div>
                <div className={styles.previewBody}>
                    <div className={styles.previewHeader}>
                        <h3>برنامه امروز</h3>
                        <span className={styles.previewBadge}>۳ کار</span>
                    </div>
                    <ul className={styles.taskList}>
                        {tasks.map((t) => (
                            <li key={t.label} className={`${styles.task} ${t.done ? styles.taskDone : ""}`}>
                                <span className={styles.taskCheck} aria-hidden="true">{t.done ? "✓" : ""}</span>
                                <span className={styles.taskLabel}>{t.label}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    )
}
