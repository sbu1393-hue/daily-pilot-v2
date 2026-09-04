import Link from "next/link"
import type { AvatarUser } from "@/app/components/Avatar"
import styles from "./landing.module.css"

// مثل Hero: نشست معتبر یعنی به جای «ساخت حساب»، کاربر مستقیم وارد برنامه می‌شود.
export default function CTASection({ user }: { user: AvatarUser | null }) {

  return (
    <section className={styles.ctaSection}>
      <div className={styles.ctaCard}>
        <h2 className={styles.ctaTitle}>آماده‌ای روزهای بهتری بسازی؟</h2>
        <p className={styles.ctaText}>همین الان حساب خودت را بساز و شروع کن.</p>
        <Link
          href={user ? "/dashboard" : "/auth/register"}
          className={styles.primaryBtn}
        >
          {user ? "ورود به برنامه" : "ساخت حساب رایگان"}
        </Link>
      </div>
    </section>
  )
}