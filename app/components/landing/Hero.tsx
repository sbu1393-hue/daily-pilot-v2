import Link from "next/link"
import styles from "./landing.module.css"

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <div className={styles.heroLogo}>D</div>
        <h1>
          مدیریت روزهای خودت
          <br />
          با <span className={styles.brand}>Daily Pilot</span>
        </h1>
        <p>یک سیستم هوشمند برای برنامه‌ریزی، مدیریت کارها و ساختن عادت‌های بهتر.</p>
        <div className={styles.heroActions}>
          <Link href="/auth/register" className={styles.primaryBtn}>شروع رایگان</Link>
          <Link href="/auth/login" className={styles.secondaryBtn}>ورود به حساب</Link>
        </div>
      </div>
    </section>
  )
}
