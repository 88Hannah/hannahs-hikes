"use client"

import UserDetails from "@/components/UserDetails";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

export default function Profile() {
    const { user } = useAuthContext()
    const router = useRouter()

    const [ currentUser, setCurrentUser ] = useState()


    useEffect(() => {

        setCurrentUser(user)

    }, [])


    const handleClick = () => {
        router.push("/login")
      }

    return (
        <>
            <h1>This is the profile page</h1>

            { currentUser ? <UserDetails userId={currentUser.uid}/> : <button onClick={handleClick}>Log in</button>}
        </>
    )
}