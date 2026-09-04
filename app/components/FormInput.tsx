"use client"

import {
    FieldValues,
    Path,
    UseFormRegister,
    FieldErrors
} from "react-hook-form"


type FormItem<T extends FieldValues> = {
    name: Path<T>
    type: string
    label: string
    placeholder?: string
}


type FormInputProps<T extends FieldValues> = {
    formItem: FormItem<T>
    register: UseFormRegister<T>
    errors: FieldErrors<T>
}



export default function FormInput<T extends FieldValues>({ formItem, register, errors }: FormInputProps<T>) {

    return (
        <div className="mb-3">
            <label className="form-label">
                {formItem.label}
            </label>
            <input
                type={formItem.type}
                placeholder={formItem.placeholder}
                className="form-control"
                {...register(formItem.name)}
            />
            {
                errors[formItem.name] &&
                <p className="text-danger small mt-2">
                    {
                        String(
                            errors[formItem.name]?.message
                        )
                    }
                </p>
            }
        </div>

    )
}