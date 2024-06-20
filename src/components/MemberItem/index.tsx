import updateData from "@/firebase/firestore/updateData"
import {type FetchedMember, type Role } from "../models"
import { useState, useEffect } from "react"
import Checkbox from "../FormFields/Checkbox"

export default function MemberItem({ member }: { member: FetchedMember }) {

    const [ roles, setRoles ] = useState<Role[]>(member.roles)

    
    const updateMemberRole = (name: Role, value: boolean) => {
        setRoles((prevRoles) => {
            if(value) {
                if(prevRoles.includes(name)) return prevRoles
                else return [name, ...prevRoles]
            } else {
                return prevRoles.filter(role => role != name)
            }
        })
    }
    
    useEffect(() => {
        const updateUser = async () => {
            console.log("Update the role!")
            const newData = {
                roles: roles
            }
            await updateData("members", member.id, newData)
        }

        void updateUser()
    }, [roles])

    return (
        <>
            <p>{member.displayName}</p>
            <p>{member.email}</p>
            {   roles &&
                <div>
                    <Checkbox
                        name="admin"
                        label="Admin"
                        isSelected={roles.includes("admin")}
                        onCheckboxChange={updateMemberRole}
                    />
                    <Checkbox
                        name="leader"
                        label="Leader"
                        isSelected={roles.includes("leader")}
                        onCheckboxChange={updateMemberRole}
                    />
                    <Checkbox
                        name="basic"
                        label="Basic"
                        isSelected={roles.includes("basic")}
                        onCheckboxChange={updateMemberRole}
                    />
                </div>

            }
        </>
    )
}