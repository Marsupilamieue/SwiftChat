'use client'

import useConversation from "@/app/hooks/useConversation"
import { FullConversationType } from "@/app/types"
import { MdOutlineGroupAdd } from 'react-icons/md'
import clsx from "clsx"
import { useRouter } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import ConversationBox from "./ConversationBox"
import { User } from "@prisma/client"
import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog"
import GroupChatModal from "@/app/components/Modals/GroupChatModal"
import { useSession } from "next-auth/react"
import { pusherClient } from "@/app/libs/pusher"
import { find } from "lodash"


interface ConversationListProps {
    initialItems : FullConversationType[]
    users : User[]
}

const ConversationList : React.FC<ConversationListProps> = ({initialItems, users}) => {
    const [items, setItems] = useState(initialItems)
    const router = useRouter()
    const session = useSession()
    const pusherKey = useMemo(()=>{
        return session.data?.user?.email
    }, [session.data?.user?.email])

    useEffect(()=>{
        if(!pusherKey){
            return
        }
        pusherClient.subscribe(pusherKey)

        const newHandler = (conversation : FullConversationType) => {
            setItems((current) => {
                if(find(current, { id : conversation.id})){
                    return current
                }

                return [conversation, ...current]
            })
        }

        const updateHandler = (conversation : FullConversationType) => {
            setItems((current) => current.map((currentConversation) => {
                if(currentConversation.id === conversation.id){
                    return {
                        ...currentConversation,
                        messages : conversation.messages
                    }
                }
                return currentConversation
            }))
        }

        const removeHandler = (conversation : FullConversationType) => {
            setItems((current) => {
                return [...current.filter((conver) => conver.id !== conversation.id)]
            })

            if(conversationId === conversation.id){
                router.push('/conversations')
            }
        }

        pusherClient.bind('conversation:new', newHandler)
        pusherClient.bind('conversation:update', updateHandler)
        pusherClient.bind('conversation:remove', removeHandler)

        return () => {
            pusherClient.unsubscribe(pusherKey)
            pusherClient.unbind('conversation:new', newHandler)
            pusherClient.unbind('conversation:update', updateHandler)
            pusherClient.unbind('conversation:remove', removeHandler)
        }
    },[pusherKey])

    const { conversationId, isOpen } = useConversation()
    return (
       <>
       <Dialog>
            <GroupChatModal users = {users}/>
            <aside className={clsx(`
                    fixed
                    inset-y-0
                    pb-20
                    lg:pb-0
                    lg:left-20
                    lg:w-80
                    lg:block
                    overflow-y-auto
                    border-r
                    border-gray-200`,
                    isOpen  ? 'hidden' : 'block w-full left-0'
                )}>
                <div className="px-5">
                    <div className="flex justify-between mb-4 pt-4">
                        <div className="text-2xl font-bold text-neutral-800">
                            Messages
                        </div>
                        <DialogTrigger asChild>
                            <div className="rounded-full p-2 bg-gray-100 text-gray-600 cursor-pointer hover:opacity-75 transition">
                                <MdOutlineGroupAdd size={20}/>
                            </div>
                        </DialogTrigger>
                    </div>
                    {items.map((item) => (
                        <ConversationBox 
                            key={item.id} 
                            data={item}
                            selected={conversationId === item.id}
                        />
                    ))}
                </div>

            </aside>
       </Dialog>
       </>
    )
}

export default ConversationList