import { z } from "zod"


export const registerSchema = z.object({

    username: z
        .string()
        .min(3,"نام کاربری حداقل ۳ کاراکتر باشد"),


    email: z
        .string()
        .email("ایمیل معتبر نیست"),


    password: z
        .string()
        .min(8,"رمز عبور حداقل ۸ کاراکتر باشد"),


    confirmPassword:z
        .string()

})
.refine(
    data => data.password === data.confirmPassword,
    {
        message:"رمز عبور و تکرار آن یکسان نیست",
        path:["confirmPassword"]
    }
)



export const loginSchema = z.object({

    email:z
    .string()
    .email("ایمیل معتبر نیست"),


    password:z
    .string()
    .min(1,"رمز عبور را وارد کنید")

})

