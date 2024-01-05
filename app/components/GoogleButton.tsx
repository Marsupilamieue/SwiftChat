"use client"

import { Button } from "../../components/ui/button";
import { Icons } from "../../components/ui/icons";
import { signIn} from "next-auth/react"

export default function GoogleButton() {
    return (
        <Button onClick={()=>signIn('google', {
            callbackUrl: `${window.location.origin}/home`
        })} variant="secondary">
            Login with Google
              <Icons.google className="ml-2 h-4 w-4" />
        </Button>
    )
}