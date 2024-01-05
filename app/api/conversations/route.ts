import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/utils/db";
import { equal } from "assert";

export async function POST(request : Request) {
    try {
        const currentUser = await getCurrentUser()
        const body = await request.json();
        const { userId, isGroup, members, name} = body;

        if(!currentUser?.email || !currentUser.id){
            return new NextResponse('Unauthorized', { status: 401})
        }

        if(isGroup && (!members || members.length < 2 || !name)){
            return new NextResponse('invalid data', { status: 400})
        }

        if(isGroup){
            const newConversation = await prisma.conversation.create({
                data : {
                    name,
                    isGroup,
                    users : {
                        connect : [
                            ...members.map((member : {value: string}) => ({
                                id : member.value
                            })),
                            {
                                id: currentUser.id
                            }
                        ]
                    }
                },
                include : {
                    users : true
                }
            })

            return NextResponse.json(newConversation)
        }

        const existingConversation = await prisma.conversation.findMany({
            where : {
                OR : [
                    {
                        users : {
                            every :{
                                id : {
                                    in : [userId, currentUser.id]
                                }
                            }
                        }
                    },
                    {
                        users : {
                            every :{
                                id : {
                                    in : [currentUser.id, userId]
                                }
                            }
                        }
                    },
                ]
            }
        })

        const conversation = existingConversation[0]

        if(conversation){
            return NextResponse.json(conversation)
        }

        const newConversation = await prisma.conversation.create({
            data : {
                users : {
                    connect : [
                        {
                            id : userId
                        },
                        {
                            id : currentUser.id
                        }
                    ]
                }
            },
            include : {
                users : true
            }
        })

        return NextResponse.json(newConversation)
    } catch (error:any){
        return new NextResponse('internal server error', {
            status : 500
        })
    }

}