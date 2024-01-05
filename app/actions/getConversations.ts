import getCurrentUser from "./getCurrentUser";
import prisma from "../utils/db";


const getConversations = async () => {
    const currentUser = await getCurrentUser();

    if(!currentUser?.email){
        return [];
    }

    try {
        const conversation = await prisma.conversation.findMany({
            orderBy :{
                lastMessageAt : 'desc'
            },
            where : {
                users : {
                    some : {
                        id : {
                            in : [currentUser.id]
                        }
                    }
                }
            },
            include : {
                users : true,
                messages : {
                    include : {
                        seen : true,
                        sender : true
                    }
                }
            }
        })
        return conversation
    }catch(error : any){
        return [];
    }
}

export default getConversations