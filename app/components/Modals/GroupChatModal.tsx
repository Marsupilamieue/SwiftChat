'use client'

import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { User } from "@prisma/client"
import Input from "../inputs/Input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FieldValue, FieldValues, SubmitHandler, useForm } from "react-hook-form"
import axios from "axios"
import { toast } from "@/components/ui/use-toast"
import Select from "../inputs/Select"
import { Icons } from "@/components/ui/icons"

interface GroupChatModalProps { 
    users : User[]
}

const GroupChatModal:React.FC<GroupChatModalProps> = ({users = []}) => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState :{
            errors
        }
    } = useForm<FieldValues>({
        defaultValues : {
            name : '',
            members : []
        }
    })

    const members = watch('members')

    const onSubmit : SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)
        axios.post('/api/conversations', {
            ...data,
            isGroup : true,
        })
        .then(() => {
            router.refresh()
        })
        .catch(() => {
            toast({
                title: "Well this did not work...",
                description: "Something went wrong, please try again",
                variant: "destructive",
            })
        })
        .finally(() => {
            setIsLoading(false);
            toast({
                title: "Success",
                description: "Group has been successfully created",
              })
        })
    }

  return (
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Create a group chat</DialogTitle>
                <DialogDescription>
                    Create a chat with more than two people
                </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-4 py-4">
                    <div className="items-center gap-4">
                        <Input 
                            register={register}
                            label="Name"
                            id="name"
                            disabled={isLoading}
                            errors={errors}
                            required
                        />
                        <Select 
                            disabled={isLoading}
                            label="Members"
                            options = { users.map((user) => ({
                                value : user.id,
                                label : user.name
                            }))}
                            onChange={(value) => {
                                setValue('members', value, { shouldValidate : true })
                            }}
                            value = { members }
                        />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button  type="button" variant="secondary" disabled={isLoading}>
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button type="submit" disabled={isLoading}>
                            {isLoading ? (
                                <Icons.spinner className="h-4 w-4 animate-spin" />
                            ) : (
                                <p>
                                    Create
                                </p>
                            )}
                        </Button>
                </DialogFooter>
            </form>
        </DialogContent>
  )
}

export default GroupChatModal