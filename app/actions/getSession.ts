import { getServerSession } from "next-auth";
import { authOptions } from "../utils/auth";

export default function getSession(){
    return getServerSession(authOptions)
}