import getUsers from "@/app/actions/getUsers"
import  Sidebar  from "../../components/sidebar/Sidebar"
import ConversationList from "./components/ConvesationList"
import getConversations from "@/app/actions/getConversations"

export default async function ConversationsLayout({children} : {children : React.ReactNode}) {
    const users = await getUsers()
    const conversations = await getConversations()
    return (
        <Sidebar>
            <div className="h-screen">
                <ConversationList 
                    users = {users!}
                    initialItems={conversations}
                />
                {children}
            </div>
        </Sidebar>
    )
}