"use client"

import { useState } from "react"

import SelectField from "@/components/FormFields/SelectField";
import InputField from "@/components/FormFields/InputField";
import TextAreaField from "@/components/FormFields/TextAreaField";

interface RouteData {
    routeName: string,
    meetingPoint: string,
    distance: undefined | number,
    duration: undefined | number,
    routeDescription: string,
    difficulty: undefined | "Easy" | "Moderate" | "Challenging" | "Extreme",
    coverPhoto: string
}

export default function NewRoute() {

    const [ routeData, setRouteData ] = useState<RouteData>({
        routeName: "",
        meetingPoint: "",
        distance: undefined,
        duration: undefined,
        routeDescription: "",
        difficulty: undefined,
        coverPhoto: ""
    });

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


    return (
        <>
            <h1>Upload a new route here</h1>
            <InputField name="routeName" label="Route name" type="text" onValueChange={updateRouteData} />
            <InputField name="meetingPoint" label="Meeting Point" type="text" onValueChange={updateRouteData} />
            <InputField name="distance" label="Distance" type="number" onValueChange={updateRouteData} />
            <InputField name="duration" label="Duration" type="number" onValueChange={updateRouteData} />
            <TextAreaField name="routeDescription" label="Route description" onValueChange={updateRouteData} />
            <SelectField name="difficulty" label="Difficulty" options={difficultyScale} onValueChange={updateRouteData}/>
            <InputField name="coverPhoto" label="Cover Photo" type="file" onValueChange={updateRouteData} /> 
        </>
    )
}