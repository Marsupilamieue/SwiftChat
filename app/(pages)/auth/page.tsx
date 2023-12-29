import { Icons } from "@/components/ui/icons"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import GoogleButton from "@/app/components/GoogleButton"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/utils/auth"
import { redirect } from "next/navigation"
import SignInForm from "@/app/components/SignInForm"

export default async function Auth() {
  const session = await getServerSession(authOptions)
  if(session){
    return redirect("/")
  }
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Please Sign In</CardTitle>
          <CardDescription>
            To access swift chat, you have to be authenticated
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-1 gap-6">
              <GoogleButton/>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
        <SignInForm/>
        </CardContent>
      </Card>
    </div>
  )
}