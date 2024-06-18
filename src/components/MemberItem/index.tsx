import updateData from "@/firebase/firestore/updateData"
import SelectField from "../FormFields/SelectField"
import {type FetchedMember, type Role } from "../models"
import { useState, useEffect } from "react"

export default function MemberItem({ member }: { member: FetchedMember }) {

    const [ role, setRole ] = useState<Role>(member.role)

    const roles = [
        {
            value: "basic",
            disabled: false,
            selected: member.role == "basic"
        },
        {
            value: "leader",
            disabled: false,
            selected: member.role == "leader"
        },
        {
            value: "admin",
            disabled: false,
            selected: member.role == "admin"
        }
    ]

    
    const updateMemberRole = (name: string, value: string) => {
        setRole(value as Role)
    }
    
    useEffect(() => {
        const updateUser = async () => {
            console.log("Update the role!")
            const newData = {
                role: role
            }
            await updateData("members", member.id, newData)
        }

        void updateUser()
    }, [role])

    return (
        <>
            <p>{member.displayName}</p>
            <p>{member.email}</p>
            <SelectField name="role" label="role" options={roles} value={role} onValueChange={(updateMemberRole)}/>
        </>
    )
}