import getCurrentUser from "@/app/actions/getCurrentUser";
import useConversation from "@/app/hooks/useConversation";
import { NextResponse } from "next/server";
import prisma from "@/app/utils/db";
import { pusherServer } from "@/app/libs/pusher";

interface IParams {
    conversationId: string;
}

export async function DELETE(
    request : Request,
    {params} : {params : IParams}
){
    try {
        const { conversationId } = params
        const currentUser = await getCurrentUser()

        if(!currentUser?.email || !currentUser.id){
            return new NextResponse('Unauthorized', { status: 400})
        }

        const existingConversation = await prisma.conversation.findUnique({
            where : {
                id : conversationId
            },
            include : {
                users : true
            }
        })

        if(!existingConversation){
            return new NextResponse('Invalid Conversation Id', { status: 400})
        }

        const deletedConversation = await prisma.conversation.deleteMany({
            where : {
                id : conversationId,
                users : {
                    some : {
                        id : {
                            in : [currentUser.id]
                        }
                    }
                }
            }
        })

        existingConversation.users.forEach((user) => {
            if(user.email){
                pusherServer.trigger(user.email, 'conversation:remove', existingConversation)
            }
        })

        return NextResponse.json(deletedConversation)
        
    }catch (error : any) {
        console.log(error, 'ERROR_CONVERSATION_DELETE')
        return new NextResponse('Internal Server Error', {status : 500})
    }
}