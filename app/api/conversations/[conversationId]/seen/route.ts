import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/utils/db";

interface IParams {
    conversationId: string;
}

export async function POST(
    request : Request, 
    {params} : {params : IParams}
){
    try {
        const currentUser = await getCurrentUser()

        const { conversationId } = params

        if(!currentUser?.email || !currentUser.id){
            return new NextResponse('Unauthorized', {status: 401})
        }

        // find existing conversation
        const conversation = await prisma.conversation.findUnique({
            where : {
                id : conversationId
            },
            include : {
                messages : {
                    include : {
                        seen : true
                    }
                },
                users : true
            }
        })

        // check if there is a conversation with id
        if(!conversation) {
            return new NextResponse('invalid conversation Id', { status: 400})
        }
        
        // find the last message
        const lastMessage = conversation.messages[conversation.messages.length - 1]

        // check if last message exists
        if(!lastMessage){
            return NextResponse.json(conversation)
        }

        // update seen of last message
        const updatedMessage = prisma.message.update({
            where : {
                id : lastMessage.id
            },
            include : {
                sender : true,
                seen : true
            },
            data : {
                seen : {
                    connect : {
                        id : lastMessage.id
                    }
                }
            }
        })

        return NextResponse.json(updatedMessage)

    }catch (error : any){
        console.log(error, 'ERROR_MESSAGES_SEEN')
        return new NextResponse('Internal Server Error', {status : 500})
    }
}