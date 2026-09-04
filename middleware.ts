import { NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"


export function middleware(req: NextRequest) {


    // const token = req.cookies.get("token")?.value

    // const { pathname } = req.nextUrl



    // const publicRoutes = [
    //     "/",
    //     "/auth/login",
    //     "/auth/register"
    // ]


    // const isPublicRoute =
    //     publicRoutes.includes(pathname)



    // if (!token) {


    //     if (!isPublicRoute) {

    //         return NextResponse.redirect(
    //             new URL("/auth/login", req.url)
    //         )

    //     }


    //     return NextResponse.next()

    // }


    // try {

    //     const secret = process.env.JWT_SECRET

    //     if (!secret) {

    //         throw new Error(
    //             "JWT_SECRET missing"
    //         )

    //     }



    //     jwt.verify(
    //         token,
    //         secret
    //     )



    //     if (isPublicRoute) {

    //         return NextResponse.redirect(
    //             new URL("/dashboard", req.url)
    //         )

    //     }



    //     return NextResponse.next()


    // }
    // catch(error){


    //     const response =
    //         NextResponse.redirect(
    //             new URL("/auth/login", req.url)
    //         )


    //     response.cookies.delete("token")


    //     return response

    // }

}


export const config = {

    matcher:[
        "/((?!api|_next/static|_next/image|favicon.ico).*)"
    ]

}