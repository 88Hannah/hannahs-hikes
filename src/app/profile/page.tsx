"use client"

import MemberDetails from "@/components/MemberDetails";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import { type User } from "firebase/auth";

export default function Profile() {
    const { user } = useAuthContext()
    const router = useRouter()

    const [ currentUser, setCurrentUser ] = useState<User>()

    useEffect(() => {
        setCurrentUser(user as User)
    }, [])

    const handleClick = () => {
        router.push("/login")
      }

    return (
        <>
            <h1>This is the profile page</h1>
            { currentUser ? <MemberDetails userId={currentUser.uid}/> : <button onClick={handleClick}>Log in</button>}
        </>
    )
}