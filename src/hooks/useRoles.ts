import { type Role } from "@/components/models";
import { useAuthContext } from "@/context/AuthContext";
import getDataWithId from "@/firebase/firestore/getDataWithId";
import { useEffect, useState } from "react";

export default function useRoles() {
    
    const [ userRoles, setUserRoles ] = useState<Role[]>([])
    const { user } = useAuthContext()

    useEffect(() => {
        if(user) {
            const getRoles = async() => {
                const { docSnap, error } = await getDataWithId("members", user.uid);
                if (error) {
                    console.error(error);
                } else if (docSnap?.exists()) {
                    setUserRoles(docSnap.data().roles)
                }
            } 
            void getRoles()
        }
    }, [user])

    const hasRole = (requiredRole: Role) => {
        return userRoles.includes(requiredRole)
    }

    const hasAnyRole = (requiredRolesArray: Role[]) => {
        return requiredRolesArray.some(role => userRoles.includes(role))
    }

    const hasAllRoles = (requiredRolesArray: Role[]) => {
        return requiredRolesArray.every(role => userRoles.includes(role))
    }
    
    return {
        hasRole,
        hasAnyRole,
        hasAllRoles
    }
}