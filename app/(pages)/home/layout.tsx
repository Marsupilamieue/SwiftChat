import getUsers from "@/app/actions/getUsers"
import  Sidebar  from "../../components/sidebar/Sidebar"
import UserList from "./components/UserList"

export default async function HomeLayout({children} : {children : React.ReactNode}) {
    const users = await getUsers()
    return (
        <Sidebar>
            <div className="h-screen">
                <UserList items = {users!} />
                {children}
            </div>
        </Sidebar>
    )
}