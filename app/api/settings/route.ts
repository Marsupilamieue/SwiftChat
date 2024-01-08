import getCurrentUser from "@/app/actions/getCurrentUser"
import { NextResponse } from "next/server"
import prisma from "@/app/utils/db"

export async function POST(
    request: Request
){
    try {
        const currentUser = await getCurrentUser()
        const body = await request.json()
        const { name, image} = body

        if(!currentUser?.id || !currentUser.email){
            return new NextResponse('Unauthorized', { status : 401 })
        }

        const updateUser = await prisma.user.update({
            where : {
                id : currentUser.id
            },
            data : {
                name : name,
                image
            }
        })
        
        return NextResponse.json(updateUser)
        
    }catch ( error : any) {
        console.log(error, "ERROR_MESSAGE_EDIT_PROFILE")
        return new NextResponse('Internal server error', { status: 500 })
    }
}