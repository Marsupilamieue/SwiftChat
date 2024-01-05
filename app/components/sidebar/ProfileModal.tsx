'use client'

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"  
import { Button } from "@/components/ui/button"
import { User } from "@prisma/client"

interface ProfileModalProps {
    data : User
}

const ProfileModal:React.FC<ProfileModalProps> = ({data}) => {
  return (
    <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
        <DialogTitle>Profile</DialogTitle>
        <DialogDescription>
            Edit your public information
        </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
            Name
            </Label>
            <Input
            id="name"
            defaultValue={data?.name || ""}
            className="col-span-3"
            />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="photo" className="text-right">
            Photo
            </Label>
            <Input
            id="name"
            defaultValue={data?.name || ""}
            className="col-span-3"
            />
        </div>
        </div>
        <DialogFooter>
        <DialogClose asChild>
            <Button type="button" variant="secondary">
            Close
            </Button>
        </DialogClose>
        <Button type="submit">Save changes</Button>
        </DialogFooter>
    </DialogContent>
  )
}

export default ProfileModal