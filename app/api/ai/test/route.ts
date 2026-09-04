import { NextResponse } from "next/server"
import { analyzeTask } from "@/app/lib/ai/analyzeTask"

export async function GET() {
    const samples = [
        "گزارش فوری پروژه مشتری را آماده کن",
        "خرید نان از نانوایی",
        "تمرین زبان برای آزمون هفته بعد",
    ]

    const results = []
    for (const text of samples) {
        results.push(await analyzeTask(text))
    }

    return NextResponse.json(results)
}
