"use client"


import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema } from "@/app/schema/formSchema"
import { z } from "zod"
import { useState } from "react"
import FormInput from "@/app/components/FormInput"
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

        <form

            onSubmit={
                handleSubmit(onSubmit)
            }

            className="
            card
            p-4
            shadow
            rounded-4
            "

        >


            <h3 className="mb-4">
                ورود
            </h3>



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

                className="
                btn
                btn-primary
                "
            >
                {
                    loading
                        ?
                        "در حال ورود..."
                        :
                        "ورود"
                }
            </button>
            <Link href="/auth/register" className="text-decoration-none my-2">
                <small>
                    ثبت نام کرده اید؟
                </small>
            </Link>


        </form>

    )

}