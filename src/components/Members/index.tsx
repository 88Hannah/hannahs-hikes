"use client"

import getLiveCollectionData from "@/firebase/firestore/getLiveCollectionData"
import { useEffect, useState } from "react"
import MemberItem from "../MemberItem"
import { type FetchedMember } from "../models"
import { type FirestoreError } from "firebase/firestore"

export default function Users() {

    const [ members, setMembers ] = useState<FetchedMember[]>([])

    const onData = (data: FetchedMember[]) => {
        console.log("Received data: ", data);
        setMembers(data)
      };
      
      const onError = (error: FirestoreError) => {
        console.error("Error fetching live data: ", error);
      };

    useEffect(() => {
        const unsubscribe = getLiveCollectionData("members", onData, onError);

        return unsubscribe
    }, [])

    const membersHtml = members.map(member => {
        return (
            <MemberItem key={member.id} member={member}/>
        )
    })

    
    return (
        <>
            <h2>Here are all the users</h2>
            {membersHtml}
        </>
    )
}