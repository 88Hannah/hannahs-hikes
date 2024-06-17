"use client"


import { useState, useEffect } from "react"
import { type User } from "../models"
import getDataWithQuery from "@/firebase/firestore/getDataWithQuery"

export default function UserDetails({ userId}: {userId: string}) {

    const [ userDetails, setUserDetails ] = useState<User>({} as User)

    
    useEffect(() => {
        const getUserDetails = async() => {
            console.log("Is this running?")
            const { querySnapshot, error } = await getDataWithQuery("users", "userId", "==", userId)
            
            if (error) {
                console.error(error)
            } else if (!querySnapshot.empty) {
                console.log("The snapshot exits")
                setUserDetails(querySnapshot.docs[0].data())
            }
        }

        void getUserDetails()

    }, [userId])

    return (
        <>
            <h1>Here are your details ...</h1>
            {
                userDetails &&
                <div>
                    <h4>Display name</h4>
                    <p>{userDetails.displayName}</p>
                    <h4>Email</h4>
                    <p>{userDetails.email}</p>
                    <h4>Profile picture</h4>
                    <img src={userDetails.profilePicture ?? "/default-images/default-profile-picture.jpg"} alt="profile picture"/>
                    <h4>Role</h4>
                    <p>{userDetails.role}</p>
                    <h4>Display name</h4>
                    <p>{userDetails.displayName}</p>

                </div>
            }
        </>
    )
}