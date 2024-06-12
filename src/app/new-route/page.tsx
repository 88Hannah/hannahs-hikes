"use client"

import { useEffect, useState } from "react"

import SelectField from "@/components/FormFields/SelectField";
import InputField from "@/components/FormFields/InputField";
import FileField from "@/components/FormFields/FileField";
import TextAreaField from "@/components/FormFields/TextAreaField";

import fileUpload from "@/firebase/storage/uploadFiles";
import addData from "@/firebase/firestore/addData";

interface SelectData {
    value: string,
    disabled: boolean,
    selected: boolean
}

interface RouteData {
    routeName: string,
    meetingPoint: string,
    distance: number,
    duration: number,
    routeDescription: string,
    difficulty: string,
    coverPhotoUrl: string
}

export default function NewRoute() {

    const difficultyScale: Array<SelectData> = [
        // "Easy",
        // "Moderate",
        // "Challenging",
        // "Extreme",
        {
            value: "Please select...",
            disabled: true,
            selected: true
        },
        {
            value: "Easy",
            disabled: false,
            selected: false
        },
        {
            value: "Moderate",
            disabled: false,
            selected: false
        },
        {
            value: "Challenging",
            disabled: false,
            selected: false
        },
        {
            value: "Extreme",
            disabled: false,
            selected: false
        },
    ]

    const [ routeData, setRouteData ] = useState<RouteData>({
        routeName: "",
        meetingPoint: "",
        distance: 0,
        duration: 0,
        routeDescription: "",
        difficulty: difficultyScale[0].value,
        coverPhotoUrl: ""
    });

    const [ coverPhotoFile, setCoverPhotoFile ] = useState<File | null>(null)
    const [ formSubmitted, setFormSubmitted ] = useState<boolean>(false)
    const [ message, setMessage ] = useState<string>("")


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

    const handleSubmit = async() => {
        if(coverPhotoFile) {
            const folderName = routeData.routeName.toLowerCase().replace(/\s/g, '-')
            const fileUrl = await fileUpload(coverPhotoFile, `routes/${folderName}`)
            if(fileUrl) {
                updateRouteData("coverPhotoUrl", fileUrl)
                setFormSubmitted(true)
            } else {
                setMessage("Sorry, there was an issue uploading your photo. Please try again.")
            }
        }
    }
            
    useEffect(() => {
        if(formSubmitted) {
            const saveRoute = async(): Promise<void> => {
                const { docRef, error } = await addData("routes", routeData)
                if(error) {
                    console.error(error)
                } else if(docRef) {
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
                    coverPhotoUrl: ""
                })

                setCoverPhotoFile(null)
            }
        
            void saveRoute();
        }
        
    }, [formSubmitted, routeData])


    return (
        <>
            <h1>Upload a new route here</h1>
            <form action={handleSubmit}>
                <InputField name="routeName" label="Route name" type="text" value={routeData.routeName} onValueChange={updateRouteData} />
                <InputField name="meetingPoint" label="Meeting Point" type="text" value={routeData.meetingPoint} onValueChange={updateRouteData} />
                <InputField name="distance" label="Distance" type="number" value={routeData.distance} onValueChange={updateRouteData} />
                <InputField name="duration" label="Duration" type="number" value={routeData.duration} onValueChange={updateRouteData} />
                <TextAreaField name="routeDescription" label="Route description" value={routeData.routeDescription} onValueChange={updateRouteData} />
                <SelectField name="difficulty" label="Difficulty" value={routeData.difficulty} options={difficultyScale} onValueChange={updateRouteData}/>
                <FileField name="coverPhoto" label="Cover Photo" value={coverPhotoFile} onFileChange={updateCoverPhoto} /> 

                <button type="submit">Submit</button>
            </form>

            {message && <p>{message}</p>}
        </>
    )
}