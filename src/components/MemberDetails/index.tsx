"use client"

import { useState, useEffect } from "react"
import { type Member } from "../models"
import getDataWithId from "@/firebase/firestore/getDataWithId"

export default function MemberDetails({ userId }: { userId: string }) {

    const [ memberDetails, setMemberDetails ] = useState<Member>({} as Member)

    useEffect(() => {
        const getMemberDetails = async() => {
            const { docSnap, error } = await getDataWithId("members", userId)
            if (error) {
                console.error(error)
            } else if (docSnap?.exists()) {
                console.log("The snapshot exits")
                setMemberDetails(docSnap.data() as Member)
            }
        }

        void getMemberDetails()

    }, [userId])

    return (
        <>
            <h1>Here are your details ...</h1>
            {
                memberDetails &&
                <div>
                    <h4>Display name</h4>
                    <p>{memberDetails.displayName}</p>
                    <h4>Email</h4>
                    <p>{memberDetails.email}</p>
                    <h4>Profile picture</h4>
                    <img src={memberDetails.profileUrl ?? "/default-images/default-profile-picture.jpg"} alt="profile picture"/>
                    <h4>Role</h4>
                    <p>{memberDetails.role}</p>
                    <h4>Display name</h4>
                    <p>{memberDetails.displayName}</p>

                </div>
            }
        </>
    )
}