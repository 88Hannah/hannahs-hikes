"use client"

import { useState, useId } from "react"

import SelectField from "@/components/FormFields/SelectField";
import InputField from "@/components/FormFields/InputField";
import FileField from "@/components/FormFields/FileField";
import TextAreaField from "@/components/FormFields/TextAreaField";

import fileUpload from "@/firebase/storage/uploadFiles";

interface RouteData {
    routeName: string,
    meetingPoint: string,
    distance: undefined | number,
    duration: undefined | number,
    routeDescription: string,
    difficulty: undefined | "Easy" | "Moderate" | "Challenging" | "Extreme",
    coverPhotoUrl: string
}

export default function NewRoute() {

    const [ routeData, setRouteData ] = useState<RouteData>({
        routeName: "",
        meetingPoint: "",
        distance: undefined,
        duration: undefined,
        routeDescription: "",
        difficulty: undefined,
        coverPhotoUrl: ""
    });

    const [ coverPhotoFile, setCoverPhotoFile ] = useState<File | null>(null)

    const routeId = useId();

    const difficultyScale = [
        "Easy",
        "Moderate",
        "Challenging",
        "Extreme"
    ]

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
            console.log("RouteId: " + routeId)
            const fileUrl = await fileUpload(coverPhotoFile, `routes/${routeId}`)
            console.log("Should be done ...")
            console.log(fileUrl)
        }
    }


    return (
        <>
            <h1>Upload a new route here</h1>
            <InputField name="routeName" label="Route name" type="text" onValueChange={updateRouteData} />
            <InputField name="meetingPoint" label="Meeting Point" type="text" onValueChange={updateRouteData} />
            <InputField name="distance" label="Distance" type="number" onValueChange={updateRouteData} />
            <InputField name="duration" label="Duration" type="number" onValueChange={updateRouteData} />
            <TextAreaField name="routeDescription" label="Route description" onValueChange={updateRouteData} />
            <SelectField name="difficulty" label="Difficulty" options={difficultyScale} onValueChange={updateRouteData}/>
            <FileField name="coverPhoto" label="Cover Photo" onFileChange={updateCoverPhoto} /> 

            <button onClick={handleSubmit}>Submit</button>
        </>
    )
}