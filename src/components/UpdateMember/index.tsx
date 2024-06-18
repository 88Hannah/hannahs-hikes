"use client"

import { useState, useEffect } from "react"
import { type FetchedMember } from "../models"
import getDataWithId from "@/firebase/firestore/getDataWithId"
import InputField from "../FormFields/InputField"
import TextAreaField from "../FormFields/TextAreaField"
import FileField from "../FormFields/FileField"
import fileUpload from "@/firebase/storage/uploadFiles"
import updateData from "@/firebase/firestore/updateData"

export default function UpdateMember({ userId, finishedEditing }: { userId: string, finishedEditing: () => void }) {

    const [ memberDetails, setMemberDetails ] = useState<FetchedMember>({} as FetchedMember)

    const [ updatedDetails, setUpdatedDetails ] = useState({})
    const [ profilePicFile, setProfilePicFile ] = useState<File | null>(null)
    const [ formSubmitted, setFormSubmitted ] = useState<boolean>(false)


    const updateMemberData = (name: string, value: string | number) => {
        setUpdatedDetails(prevUpdatedDetails => {
            if(name == "bio") {
                return {
                    ...prevUpdatedDetails,
                    "details.bio": value
                }
            } else if(name == "favRoute") {
                return {
                    ...prevUpdatedDetails,
                    "details.favRoute": value
                }
            } else return {
                ...prevUpdatedDetails,
                [name]: value
            }
        })
    }

    const updateProfilePicFile = (name: string, value: File | null) => {
        setProfilePicFile(value)
    }

    const handleSubmit = async() => {
        if(profilePicFile) {
            const fileUrl = await fileUpload(profilePicFile, "profiles")
            if(fileUrl) {
                updateMemberData("profileUrl", fileUrl)
            } 
        }
        setFormSubmitted(true)
    }

    useEffect(() => {
        if(formSubmitted) {
            const saveData = async() => {
                await updateData("members", userId, updatedDetails)
            }
            void saveData()
            finishedEditing()
        }

    }, [formSubmitted, updatedDetails])
            
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
            <h1>Update your details ...</h1>
            {
                memberDetails &&
                <form action={handleSubmit}>
                    <InputField name="displayName" label="Display name" type="text" value={memberDetails.displayName ?? ""} onValueChange={updateMemberData}/>
                    <TextAreaField name="bio" label="Bio" value={memberDetails.details?.bio ?? ""} onValueChange={updateMemberData}/>
                    <TextAreaField name="favRoute" label="Favourite hike" value={memberDetails.details?.favRoute ?? ""} onValueChange={updateMemberData}/>
                    <FileField name="profilePic" label="Profile picture" value={null} onFileChange={updateProfilePicFile}/>
                    <button type="submit">Save changes</button>
                </form>
            }
        </>
    )
}