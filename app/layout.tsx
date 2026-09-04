import type { Metadata } from "next"
import { Vazirmatn } from "next/font/google"
import "./globals.css"
import "react-toastify/dist/ReactToastify.css"
import { CalendarProvider } from "./contexts/CalenderContext"
import { SettingsProvider } from "./contexts/SettingsContext"
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

const themeScript = `
(function () {
  try {
    var raw = localStorage.getItem("dp:settings");
    var theme = "system";
    if (raw) { theme = JSON.parse(raw).theme || "system"; }
    var dark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  } catch (e) {
    document.documentElement.setAttribute("data-theme", "light");
  }
})();
`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl" className={vazir.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={vazir.className}>
        <CalendarProvider>
          <SettingsProvider>
            {children}
            <ToastContainer position="bottom-left" rtl closeOnClick pauseOnHover />
          </SettingsProvider>
        </CalendarProvider>
      </body>
    </html>
  )
}