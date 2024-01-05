"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/use-toast";
import { authSchema } from "../zodSchema/auth";
import { Icons } from "@/components/ui/icons";

type FormData = z.infer<typeof authSchema>;

export default function SignInForm(){
    const {
        handleSubmit,
        register,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(authSchema),
    });
    const [isLoading, setIsLoading] = useState(false);

    async function onSubmit(data : FormData) {
        setIsLoading(true);
        const response = await signIn('email', {
            email : data.email,
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
        setIsLoading(false);
        reset();
        return toast({
        title: "Check your email",
        description: "A magic link has been sent to you",
        });
    }
    return (
        <>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                id="email" 
                type="email" 
                placeholder="johnDoe@example.com"
                {...register("email", { required: true })}
                name="email"
                />
                {errors?.email && (
                  <p className="text-red-600 text-sm ml-2">
                    {errors?.email?.message}
                  </p>
                )}
            </div>
            <Button type="submit" className="w-full mt-5" disabled={isLoading}>
                {isLoading ? (
                    <Icons.spinner className="h-4 w-4 animate-spin" />
                ) : (
                    <p>
                        Login with Email
                    </p>
                )}
            </Button>
        </form>
        </>
    )
}