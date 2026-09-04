import { CalendarDays, Target, TrendingUp } from "lucide-react"
import styles from "./landing.module.css"

const features = [
    {
        icon: CalendarDays,
        title: "برنامه‌ریزی روزانه",
        text: "روز خودت را با تقویم و برنامه‌های مشخص مدیریت کن.",
    },
    {
        icon: Target,
        title: "مدیریت Task",
        text: "کارها را ایجاد، دسته‌بندی و پیگیری کن.",
    },
    {
        icon: TrendingUp,
        title: "رشد شخصی",
        text: "پیشرفت خودت را ببین و بهتر عمل کن.",
    },
]

export default function Features() {
    return (
        <section className={styles.features}>
            {features.map(({ icon: Icon, title, text }) => (
                <div key={title} className={styles.featureCard}>
                    <div className={styles.featureIcon}>
                        <Icon size={26} strokeWidth={1.8} />
                    </div>
                    <h3 className={styles.featureTitle}>{title}</h3>
                    <p className={styles.featureText}>{text}</p>
                </div>
            ))}
        </section>
    )
}
