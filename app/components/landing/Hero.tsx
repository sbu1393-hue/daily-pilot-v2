import Link from "next/link"
import type { AvatarUser } from "@/app/components/Avatar"
import styles from "./landing.module.css"

// user را صفحه‌ی والد (app/page.tsx) یک بار می‌خواند و پاس می‌دهد؛
// اگر نشست معتبر باشد، به جای دکمه‌های ورود/ثبت‌نام، «ورود به برنامه» دیده می‌شود.
export default function Hero({ user }: { user: AvatarUser | null }) {

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
          {user ? (
            <Link href="/dashboard" className={styles.primaryBtn}>
              ورود به برنامه
            </Link>
          ) : (
            <>
              <Link href="/auth/register" className={styles.primaryBtn}>شروع رایگان</Link>
              <Link href="/auth/login" className={styles.secondaryBtn}>ورود به حساب</Link>
            </>
          )}
        </div>
      </div>
    </section>
  )
}