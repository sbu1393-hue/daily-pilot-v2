import {
    NextRequest,
    NextResponse
} from "next/server"


import {getPrisma} from "@/app/lib/getPrisma"

import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { loginSchema } from "@/app/schema/formSchema"


export async function POST(
    req:NextRequest
){

try{

const body =
await req.json()

const validation =
loginSchema.safeParse(body)

if(!validation.success){

return NextResponse.json(
{
message:"اطلاعات نامعتبر است",
errors:validation.error.flatten()
},
{
status:400
}
)

}

const {
email,
password
}=validation.data

const user =
await getPrisma().user.findUnique({

where:{
email
}

})


if(!user){

return NextResponse.json(
{
message:"ایمیل یا رمز عبور اشتباه است"
},
{
status:401
}
)

}



const passwordMatch =
await bcrypt.compare(
password,
user.password
)



if(!passwordMatch){

return NextResponse.json(
{
message:"ایمیل یا رمز عبور اشتباه است"
},
{
status:401
}
)

}



const secret =
process.env.JWT_SECRET



if(!secret){

throw new Error(
"JWT_SECRET missing"
)

}



const token =
jwt.sign(
{
id:user.id,
email:user.email
},

secret,

{
expiresIn:"7d"
}

)





const response =
NextResponse.json(
{
message:"ورود موفق بود",

user:{
id:user.id,
username:user.username,
email:user.email
}

},

{
status:200
}

)




response.cookies.set(
"token",
token,
{

httpOnly:true,

secure:
process.env.NODE_ENV==="production",

sameSite:"lax",

maxAge:
60*60*24*7,

path:"/"

}

)



return response



}
catch(error){

return NextResponse.json(
{
message:"خطای سرور"
},
{
status:500
}
)

}


}