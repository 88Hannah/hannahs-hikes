"use client"

import getLiveData from "@/firebase/firestore/getLiveData"
import { useEffect, useState } from "react"
import User from "../User"
import { type User as UserModel } from "../models"
import { type FirestoreError } from "firebase/firestore"

export default function Users() {

    const [ users, setUsers ] = useState<UserModel[]>([])

    const onData = (data: UserModel[]) => {
        console.log("Received data: ", data);
        setUsers(data)
      };
      
      const onError = (error: FirestoreError) => {
        console.error("Error fetching live data: ", error);
      };

    useEffect(() => {
        const unsubscribe = getLiveData("users", onData, onError);

        return unsubscribe
    }, [])

    const usersHtml = users.map(user => {
        return (
            <User key={user.id} user={user}/>
        )
    })

    
    return (
        <>
            <h2>Here are all the users</h2>
            {usersHtml}
        </>
    )
}