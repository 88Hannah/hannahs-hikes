"use client"

import { useEffect, useState } from "react"

import SelectField from "@/components/FormFields/SelectField";
import InputField from "@/components/FormFields/InputField";
import FileField from "@/components/FormFields/FileField";
import TextAreaField from "@/components/FormFields/TextAreaField";
import { type Route } from "@/components/models";
import { useAuthContext } from "@/context/AuthContext";
import { getCurrentUtcTime } from "@/utils/dateUtils"; 

import fileUpload from "@/firebase/storage/uploadFiles";
import addData from "@/firebase/firestore/addData";

interface SelectData {
    id: string,
    value: string,
    disabled: boolean,
    selected: boolean
}

export default function NewRoute() {

    const { user } = useAuthContext()

    const difficultyScale: Array<SelectData> = [
        // "Easy",
        // "Moderate",
        // "Challenging",
        // "Extreme",
        {
            id: "Please select...",
            value: "Please select...",
            disabled: true,
            selected: true
        },
        {
            id: "Easy",
            value: "Easy",
            disabled: false,
            selected: false
        },
        {
            id: "Moderate",
            value: "Moderate",
            disabled: false,
            selected: false
        },
        {
            id: "Challenging",
            value: "Challenging",
            disabled: false,
            selected: false
        },
        {
            id: "Extreme",
            value: "Extreme",
            disabled: false,
            selected: false
        },
    ]

    const [routeData, setRouteData] = useState<Route>({
        routeName: "",
        meetingPoint: "",
        distance: 0,
        duration: 0,
        routeDescription: "",
        difficulty: difficultyScale[0].value,
        coverPhotoUrl: "",
        createdUtc: "",
        updatedUtc: "",
        createdBy: "",
        updatedBy: ""
    });

    const [coverPhotoFile, setCoverPhotoFile] = useState<File | null>(null)
    const [formSubmitted, setFormSubmitted] = useState<boolean>(false)
    const [message, setMessage] = useState<string>("")


    const updateRouteData = (name: string, value: string | number) => {
        setRouteData(prevRouteData => {
            return {
                ...prevRouteData,
                [name]: value
            }
        })
    }

    const updateCoverPhoto = (name: string, value: File | null) => {
        setCoverPhotoFile(value)
    }

    const handleSubmit = async () => {
        if (coverPhotoFile) {
            const folderName = routeData.routeName.toLowerCase().replace(/\s/g, '-')
            const fileUrl = await fileUpload(coverPhotoFile, `routes/${folderName}`)
            if (fileUrl) {
                updateRouteData("coverPhotoUrl", fileUrl)
                updateRouteData("createdUtc", getCurrentUtcTime())
                updateRouteData("updatedUtc", getCurrentUtcTime())
                updateRouteData("createdBy", user?.uid)
                updateRouteData("updatedBy", user?.uid)
                setFormSubmitted(true)
            } else {
                setMessage("Sorry, there was an issue uploading your photo. Please try again.")
            }
        }
    }

    useEffect(() => {
        if (formSubmitted) {
            const saveRoute = async (): Promise<void> => {
                const { docRef, error } = await addData("routes", routeData)
                if (error) {
                    console.error(error)
                } else if (docRef) {
                    console.log("All done :)")
                    console.log(docRef.id)
                }

                setFormSubmitted(false)

                setRouteData({
                    routeName: "",
                    meetingPoint: "",
                    distance: 0,
                    duration: 0,
                    routeDescription: "",
                    difficulty: difficultyScale[0].value,
                    coverPhotoUrl: "",
                    createdUtc: "",
                    updatedUtc: "",
                    createdBy: "",
                    updatedBy: ""
                })

                setCoverPhotoFile(null)
            }

            void saveRoute();
        }

    }, [formSubmitted, routeData])


    return (
        <>
            <h1>Upload a new route here</h1>

            {user ?
                <>
                    <form action={handleSubmit}>
                        <InputField name="routeName" label="Route name" type="text" value={routeData.routeName} onValueChange={updateRouteData} />
                        <InputField name="meetingPoint" label="Meeting Point" type="text" value={routeData.meetingPoint} onValueChange={updateRouteData} />
                        <InputField name="distance" label="Distance" type="number" value={routeData.distance} onValueChange={updateRouteData} />
                        <InputField name="duration" label="Duration" type="number" value={routeData.duration} onValueChange={updateRouteData} />
                        <TextAreaField name="routeDescription" label="Route description" value={routeData.routeDescription} onValueChange={updateRouteData} />
                        <SelectField name="difficulty" label="Difficulty" value={routeData.difficulty} options={difficultyScale} onValueChange={updateRouteData} />
                        <FileField name="coverPhoto" label="Cover Photo" value={coverPhotoFile} onFileChange={updateCoverPhoto} />

                        <button type="submit">Submit</button>
                    </form>

                    {message && <p>{message}</p>}
                </>
                : <p>You must be logged in as an admin member to upload new routes</p>
            }
        </>
    )
}