"use client"

import { Task } from "@/app/types/taskType"


type Props = {
    task:Task
}


function DailyTaskCard({
    task
}:Props){


    const isDone =
        task.status === "DONE"


    return (

        <div
            className={`
            card
            border-0
            mb-3
            shadow-sm
            overflow-hidden
            ${isDone ? "opacity-75" : ""}
            `}
            style={{
                borderRadius:"18px"
            }}
        >


            <div
                className="
                card-body
                p-3
                d-flex
                align-items-center
                "
            >


                <div
                    className={`
                    rounded-circle
                    d-flex
                    align-items-center
                    justify-content-center
                    ${
                    isDone
                    ?
                    "bg-success"
                    :
                    "border border-primary"
                    }
                    `}
                    style={{
                        width:"24px",
                        height:"24px"
                    }}
                >

                    {
                    isDone &&
                    <span className="text-white">
                        ✓
                    </span>
                    }

                </div>



                <div className="flex-grow-1 ms-3">


                    <h6
                    className={`
                    mb-0
                    fw-semibold
                    ${
                    isDone
                    ?
                    "text-decoration-line-through text-muted"
                    :
                    "text-dark"
                    }
                    `}
                    >

                        {task.text}

                    </h6>



                    <div className="mt-2">

                        <span
                        className="
                        badge
                        bg-light
                        text-primary
                        rounded-pill
                        "
                        >

                            {task.category}

                        </span>

                    </div>


                </div>




                <div>

                    {
                    isDone
                    ?
                    <span>
                    ✨
                    </span>
                    :
                    <span>
                    ⏳
                    </span>
                    }

                </div>


            </div>


        </div>

    )

}


export default DailyTaskCard