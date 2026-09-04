// تبدیل ارقام به فارسی
export function faDigits(input: number | string): string {
    return String(input).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)])
}

// ۹۰ → «۱ ساعت و ۳۰ دقیقه»
export function fmtMinutes(minutes: number): string {
    const m = Math.max(0, Math.round(minutes))
    if (m < 60) return `${faDigits(m)} دقیقه`
    const h = Math.floor(m / 60)
    const r = m % 60
    return r === 0 ? `${faDigits(h)} ساعت` : `${faDigits(h)} ساعت و ${faDigits(r)} دقیقه`
}
