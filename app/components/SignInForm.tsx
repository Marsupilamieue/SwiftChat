"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";

export default function SignInForm(){
    const [email, setEmail] = useState<null | string>(null)

    async function SignInWithEmail(){
        const response = await signIn('email', {
            email : email,
            callbackUrl : `${ window.location.origin}`,
            redirect : false
        })
        if (!response?.ok) {
            return toast({
              title: "Well this did not work...",
              description: "Something went wrong, please try again",
              variant: "destructive",
            });
        }
        return toast({
        title: "Check your email",
        description: "A magic link has been sent to you",
        });
    }
    return (
        <>
        <form action={SignInWithEmail}>
            <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="johnDoe@example.com" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <Button type="submit" className="w-full mt-5">Login with Email</Button>
        </form>
        </>
    )
}