"use client"

import { useState, useEffect } from "react"
import { type FetchedMember } from "../models"
import getDataWithId from "@/firebase/firestore/getDataWithId"

export default function MemberDetails({ userId }: { userId: string }) {

    const [ memberDetails, setMemberDetails ] = useState<FetchedMember>({} as FetchedMember)

    useEffect(() => {
        const getMemberDetails = async() => {
            const { docSnap, error } = await getDataWithId("members", userId)
            if (error) {
                console.error(error)
            } else if (docSnap?.exists()) {
                console.log("The snapshot exits")
                setMemberDetails(docSnap.data() as FetchedMember)
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
                    <h4>My bio</h4>
                    <p>{memberDetails.details?.bio ?? "Not complete"}</p>
                    <h4>My favourite hike</h4>
                    <p>{memberDetails.details?.favRoute ?? "Not complete"}</p>

                    {
                        memberDetails.role != "basic" &&
                        <p>You are registered as: {memberDetails.role}</p>
                    }


                </div>
            }
        </>
    )
}