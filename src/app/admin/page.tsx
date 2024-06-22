"use client"

import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";
import useRoles from "@/hooks/useRoles"
import Members from "@/components/Members";
import { useEffect } from "react";

export default function AdminPage() {

    const { user } = useAuthContext()
    const router = useRouter();
    const { hasRole, userRoles } = useRoles()

    useEffect(() => {
        if(!user) {
            router.push("/")
        } else if (user && userRoles.length > 0) {
            if (!hasRole("admin")) {
                router.push("/")
            }
        }
    }, [user, userRoles])

    return (
        <>
            <h1>This is the admin page</h1>
            {
                userRoles.length === 0 ?
                    <div>Loading ...</div>
                    : (user && hasRole("admin")) &&
                    <Members />
            }
        </>
    )
}