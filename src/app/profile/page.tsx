"use client"

import MemberDetails from "@/components/MemberDetails";
import UpdateMember from "@/components/UpdateMember";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import { type User } from "firebase/auth";

export default function Profile() {
    const { user } = useAuthContext()
    const router = useRouter()

    const [currentUser, setCurrentUser] = useState<User>()
    const [isUpdating, setIsUpdating] = useState<boolean>(false)

    useEffect(() => {
        setCurrentUser(user as User)
    }, [user])

    const handleLoginClick = () => {
        router.push("/login")
    }

    return (
        <>
            <h1>This is the profile page</h1>
            {currentUser ?
                isUpdating ?
                    <>
                        <p>I want to update my profile</p>
                        <UpdateMember userId={currentUser.uid} finishedEditing={() => setIsUpdating(false)}/>
                    </>
                    : <>
                        <MemberDetails userId={currentUser.uid} />
                        <button onClick={() => setIsUpdating(true)}>Update details</button>
                    </>
                : <button onClick={handleLoginClick}>Log in</button>}
        </>
    )
}