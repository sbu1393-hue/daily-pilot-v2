"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Logo from "./Logo"

export default function Header() {
    const router = useRouter()
    const [busy, setBusy] = useState(false)

    const logout = async () => {
        if (busy) return
        setBusy(true)
        try {
            await fetch("/api/auth/logout", { method: "POST" })
        } catch {
            /* حتی اگر درخواست خطا بدهد، کاربر به صفحه ورود برمی‌گردد */
        } finally {
            setBusy(false)
            router.push("/auth/login")
            router.refresh()
        }
    }

    return (
        <header className="app-header">
            <div className="header-inner">
                <Link href="/dashboard" className="dp-link-reset">
                    <Logo />
                </Link>

                <div className="header-actions">
                    <Link href="/dashboard" className="dp-header-link">
                        📅 برنامه امروز
                    </Link>
                    <button
                        type="button"
                        className="dp-btn dp-btn-ghost"
                        onClick={logout}
                        disabled={busy}
                    >
                        {busy ? "…" : "خروج"}
                    </button>
                </div>
            </div>
        </header>
    )
}