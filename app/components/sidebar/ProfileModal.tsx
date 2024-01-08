'use client'


import { User } from "@prisma/client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import axios from "axios"
import { toast } from "@/components/ui/use-toast"
import Image from 'next/image'
import { CldUploadButton } from "next-cloudinary"
import Input from "../inputs/Input"
import { Icons } from "@/components/ui/icons"
import  Modal  from "../Modals/Modal"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

interface ProfileModalProps {
    isOpen? : boolean
    onClose : () => void
    currentUser : User
}

const ProfileModal:React.FC<ProfileModalProps> = ({currentUser, isOpen, onClose}) => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState : {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues : {
            name : currentUser?.name,
            image : currentUser?.image
        }
    })

    const image = watch('image')

    const handleUpload = (result : any) => {
        setValue('image', result?.info?.secure_url, { shouldValidate : true })
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)
        axios.post('/api/settings', data)
        .then(() => {
            router.refresh()
            onClose()
        })
        .catch(() => {
            toast({
                title: "Well this did not work...",
                description: "Something went wrong, please try again",
                variant: "destructive",
            })
        })
        .finally(() => {
            setIsLoading(false)
            toast({
                title: "Success",
                description: "Profile has been successfully updated",
              })
        })
    }

  return (
    <Modal isOpen={isOpen} onClose={onClose} >
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                        Profile
                    </h2>
                    <p className="mt-1 mb-4 text-sm leading-6 text-gray-600">
                        Edit your profile
                    </p>
                    <div className="mt-10 flex flex-col gap-y-8">
                        <Input 
                            disabled={isLoading}
                            label="Name"
                            id="name"
                            errors={errors}
                            register={register}
                            required
                        />
                        <div>
                            <Label>
                                Photo
                            </Label>
                            <div className="mt-2 flex items-center gap-x-3">
                                <Image 
                                    width={48}
                                    height={48}
                                    className="rounded-full"
                                    src={image || currentUser.image || "/images/placeholder.jpg"}
                                    alt="Avatar"
                                />   
                                <CldUploadButton
                                    options={{maxFiles:1}}
                                    onUpload={handleUpload}
                                    uploadPreset="oqwjg1cw"
                                >
                                    <Button
                                        disabled={isLoading}
                                        variant={"secondary"}
                                    >
                                        Change
                                    </Button>
                                </CldUploadButton>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="
                    mt-6
                    flex
                    items-center
                    justify-end
                    gap-x-6
                ">
                    <Button type="button" disabled={isLoading} variant={"secondary"} onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? (
                            <Icons.spinner className="h-4 w-4 animate-spin" />
                        ) : (
                            <p>
                                Save Changes
                            </p>
                        )}
                    </Button>
                </div>
            </div>
        </form>
    </Modal>
  )
}

export default ProfileModal