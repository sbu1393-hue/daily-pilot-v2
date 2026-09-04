export type TaskCategory = "Work" | "Personal" | "Urgent" | "Health"

export type TaskPriority = "LOW" | "MEDIUM" | "HIGH"

export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE"

export type CreateTaskInput = {
    text: string
    category: string // از پیکربندی یا سفارشی (OTHER)
    scheduledDate: string // کلید روز جلالی مثل "1403-05-17"
}

export type Task = {
    id: number
    text: string
    category: string | null
    priority: TaskPriority
    score: number | null
    reason: string | null
    status: TaskStatus
    estimatedTime: number | null
    allocatedMinutes: number | null
    spentMinutes: number | null
    scheduledDate: string // ISO میلادی از سرور
    dayKey: string | null // کلید جلالی روز برنامه‌ریزی
    previousScheduledDate: string | null
    completedAt: string | null
    completedOn: string | null // کلید جلالی روز اتمام → تاریخچه
    createdAt: string
    updatedAt: string
}
