"use client"


export function useTask() {


    const createTask = async (data: {
        text: string
        category?: string
        scheduledDate: string
    }) => {


        const res = await fetch("/api/tasks", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(data)

        })



        const result = await res.json()



        if (!res.ok) {

            throw new Error(
                result.message
            )

        }


        return result.data


    }



    return {
        createTask
    }


}