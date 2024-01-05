import { usePathname } from "next/navigation"
import useConversation from "./useConversation"
import { HiChat} from "react-icons/hi"
import { HiArrowLeftOnRectangle, HiUsers } from "react-icons/hi2"
import { useMemo } from "react"
import { signOut } from "next-auth/react"

export default function useRoutes(){
    const pathname = usePathname()
    const { conversationId } = useConversation()

    const routes = useMemo(() => [
        {
        label : "Chat",
        href : "/conversations",
        icon : HiChat,
        active : pathname === "/conversations" || !!conversationId
        },
        {
        label : "Home",
        href : "/home",
        icon : HiUsers,
        active : pathname === "/home" 
        },
        {
        label : "Logout",
        href : "#", // use # instead because of the onclick event
        onClick : () => signOut({callbackUrl : "/auth"}),
        icon : HiArrowLeftOnRectangle,
        }

    ], [conversationId, pathname])
    return routes
}