"use client"

import AddHike from "@/components/AddHike"
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import useRoles from "@/hooks/useRoles"
import { useEffect } from "react";

export default function ScheduleHikePage() {

    const { user } = useAuthContext()
    const router = useRouter();
    const { hasAnyRole, userRoles } = useRoles()

    useEffect(() => {
        if(!user) {
            router.push("/")
        } else if (user && userRoles.length > 0) {
            if (!hasAnyRole(["admin", "leader"])) {
                router.push("/")
            }
        }
    }, [user, userRoles])

    return (
        <>
            <h1>You must be here to schedule a hike!</h1>

            {
                userRoles.length === 0 ?
                    <div>Loading ...</div>
                    : (user && hasAnyRole(["admin", "leader"])) &&
                    <AddHike />
            }
        </>
    )
}