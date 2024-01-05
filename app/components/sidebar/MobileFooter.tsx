"use client"

import useRoutes from "@/app/hooks/useRoute"
import DesktopItem from "./DesktopItem"
import useConversation from "@/app/hooks/useConversation"
import MobileItem from "./MobileItem"

export default function MobileFooter(){
    const routes = useRoutes()
    const { isOpen } = useConversation()
    if(isOpen){
        return null
    }
    return (
       <div className="fixed justify-between w-full bottom-0 z-40 flex items-center bg-white border-t-[1px] lg:hidden">
            {routes.map((route) => (
                <MobileItem
                    key = {route.label}
                    href = {route.href}
                    label= {route.label}
                    active = {route.active}
                    icon = {route.icon}
                    onClick = {route.onClick}
                />
            ))}
       </div>
    )
}