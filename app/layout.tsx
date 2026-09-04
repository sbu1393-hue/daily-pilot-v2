import type { Metadata } from "next"
import { Vazirmatn } from "next/font/google"
import "./globals.css"
import "react-toastify/dist/ReactToastify.css"
import { CalendarProvider } from "./contexts/CalenderContext"
import { ToastContainer } from "react-toastify"

const vazir = Vazirmatn({
  subsets: ["arabic"],
  variable: "--font-vazir",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Daily Pilot",
  description: "مدیریت هوشمند کارهای روزانه با هوش مصنوعی",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl" className={vazir.variable}>
      <body className={vazir.className}>
        <CalendarProvider>
          {children}
          <ToastContainer position="bottom-left" rtl closeOnClick pauseOnHover />
        </CalendarProvider>
      </body>
    </html>
  )
}
