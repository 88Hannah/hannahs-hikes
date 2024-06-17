import updateData from "@/firebase/firestore/updateData"
import SelectField from "../FormFields/SelectField"
import {type User as UserModel, type Role } from "../models"
import { useState, useEffect } from "react"

interface UserProps { 
    user: UserModel

}

export default function User({ user }: UserProps) {

    const [ role, setRole ] = useState<Role>(user.role)

    const roles = [
        {
            value: "user",
            disabled: false,
            selected: user.role == "user"
        },
        {
            value: "leader",
            disabled: false,
            selected: user.role == "leader"
        },
        {
            value: "admin",
            disabled: false,
            selected: user.role == "admin"
        }
    ]

    
    const updateUserRole = (name: string, value: string) => {
        setRole(value)
    }
    
    useEffect(() => {
        const updateUser = async () => {
            console.log("Update the role!")
            const newData = {
                role: role
            }
            await updateData("users", user.id, newData)
        }

        void updateUser()
    }, [role])

    return (
        <>
            <p>{user.displayName}</p>
            <p>{user.email}</p>
            <SelectField name="role" label="role" options={roles} value={role} onValueChange={(updateUserRole)}/>
        </>
    )
}