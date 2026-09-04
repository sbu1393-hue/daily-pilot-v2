"use client"


import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema } from "@/app/schema/formSchema"
import { z } from "zod"
import { useState } from "react"
import FormInput from "@/app/components/FormInput"
import AuthCard from "@/app/components/AuthCard"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import Link from "next/link"


export type LoginInput = z.infer<typeof loginSchema>



export const loginFields = [

    {
        name: "email",
        type: "email",
        label: "ایمیل",
        placeholder: "example@email.com"
    },

    {
        name: "password",
        type: "password",
        label: "رمز عبور",
        placeholder: "رمز عبور را وارد کنید"
    }

] satisfies {

    name: keyof LoginInput

    type: string

    label: string

    placeholder: string

}[]

export default function LoginForm() {


    const { register, handleSubmit, formState: { errors } } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) })

    const [loading, setLoading] = useState(false)

    const router = useRouter()


    const onSubmit = async (data: LoginInput) => {


        try {

            setLoading(true)

            const res = await fetch(
                "/api/auth/login",
                {

                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(data)

                }
            )

            const result = await res.json()

            if (!res.ok) {
                toast.error(result.message)
                return
            }

            toast.success("ورود با موفقیت انجام شد")

            router.push("/dashboard")

        }
        catch (error) {
            console.log(error)
            toast.error("ورود با شکست مواجه شد")
        }
        finally {
            setLoading(false)
        }
    }


    return (
        <AuthCard
            title="ورود به Daily Pilot"
            subtitle="روزت را با خلبان خودکار برنامهریزی کن"
        >
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="dp-form"
            >


                {
                    loginFields.map((item) => (

                        <FormInput
                            key={item.name}
                            formItem={item}
                            register={register}
                            errors={errors}
                        />
                    ))
                }



                <button
                    type="submit"
                    disabled={loading}

                    className="dp-btn dp-btn-primary dp-btn-block"
                >
                    {
                        loading
                            ?
                            "در حال ورود..."
                            :
                            "ورود"
                    }
                </button>
            </form>

            <div className="dp-auth-switch">
                حساب کاربری نداری؟{" "}
                <Link href="/auth/register">
                    ثبتنام کن
                </Link>
            </div>
        </AuthCard>
    )

}