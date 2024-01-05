import prisma from "../utils/db";


const getMessages = async (conversationId : string) => {
    try {
        const messages = await prisma.message.findMany({
            where: {
                conversationId: conversationId
            },
            include : {
                seen : true,
                sender : true
            },
            orderBy : {
                createdAt : 'asc'
            }
        })
        return messages
    }catch (error:any){
        return []
    }
}

export default getMessages