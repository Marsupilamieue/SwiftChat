'use client'

import useConversation from "@/app/hooks/useConversation"
import { Button } from "@/components/ui/button"
import { DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Icons } from "@/components/ui/icons"
import { toast } from "@/components/ui/use-toast"
import { DialogDescription } from "@radix-ui/react-dialog"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"
import { FiAlertTriangle } from "react-icons/fi"

const ConfirmationModal = () => {
    const router = useRouter()
    const { conversationId } = useConversation()
    const [ isLoading, setIsLoading ] = useState(false)

    const onDelete = useCallback(() => {
        setIsLoading(true)
        axios.delete(
            `/api/conversations/${conversationId}`
        ).then(() => {
            router.push('/conversations')
            router.refresh
        })
        .catch(()=> 
        toast({
            title: "Well this did not work...",
            description: "Something went wrong, please try again",
            variant: "destructive",
        }))
        .finally(() => {
            setIsLoading(false)
            toast({
                title: "Success",
                description: "Chat has been successfully deleted",
              })
        })
    }, [conversationId, router])
  return (
    <DialogContent>
                    <div className="sm:flex sm:items-start">
                        <div className="
                            mx-auto
                            flex
                            h-12
                            w-12
                            flex-shrink-0
                            items-center
                            justify-center
                            rounded-full
                            bg-red-100
                            sm:mx-0
                            sm:h-10
                            sm:w-10
                        ">
                            <FiAlertTriangle className="h-6 w-6 text-red-600"/>
                        </div>
                        <div className="
                            mt-3
                            text-center
                            sm:ml-4
                            sm:mt-0
                            sm:text-left                        
                        ">
                            <DialogHeader>
                            <DialogTitle>Delete chat</DialogTitle>
                            <DialogDescription>
                                Are you sure you want to delete this chat? This action cannot be undone
                            </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button type="button" variant="secondary" disabled={isLoading}>
                                        Close
                                    </Button>
                                </DialogClose>
                                <Button type="submit" variant="destructive" disabled={isLoading} onClick={onDelete}>
                                    {isLoading ? (
                                        <Icons.spinner className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <p>
                                            Delete
                                        </p>
                                    )}
                                </Button>
                            </DialogFooter>
                        </div>
                    </div>
    </DialogContent>
  )
}

export default ConfirmationModal