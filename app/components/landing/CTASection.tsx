import Link from "next/link"
import styles from "./landing.module.css"

export default function CTASection() {
    return (
        <section className={styles.ctaSection}>
            <div className={styles.ctaCard}>
                <h2 className={styles.ctaTitle}>آماده‌ای روزهای بهتری بسازی؟</h2>
                <p className={styles.ctaText}>همین الان حساب خودت را بساز و شروع کن.</p>
                <Link href="/auth/register" className={styles.primaryBtn}>
                    ساخت حساب رایگان
                </Link>
            </div>
        </section>
    )
}
