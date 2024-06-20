"use client"

import { useAuthContext } from "@/context/AuthContext";
import InputField from "../FormFields/InputField";
import { useState, useEffect } from "react";
import { type Hike } from "../models";
import DateSelector from "../FormFields/DateSelector";
import { getCurrentUtcTime } from "@/utils/dateUtils";
import RouteOptions from "./RouteOptions";
import addData from "@/firebase/firestore/addData";
import LeaderOptions from "./LeaderOptions";

export default function AddHike() {

    const { user } = useAuthContext()

    const [formSubmitted, setFormSubmitted] = useState<boolean>(false)
    const [message, setMessage] = useState<string>("")
    const [hikeData, setHikeData] = useState<Hike>({
        routeId: "",
        startTime: "",
        leader: "",
        participants: [],
        createdUtc: "",
        updatedUtc: "",
        createdBy: "",
        updatedBy: "",
        status: "scheduled"
    
    })

    const updateHikeData = (name: string, value: string | number) => {
        setHikeData(prevHikeData => {
            return {
                ...prevHikeData,
                [name]: value
            }
        })
    }

    const handleSubmit = () => {      
        updateHikeData("createdUtc", getCurrentUtcTime())
        updateHikeData("updatedUtc", getCurrentUtcTime())
        updateHikeData("createdBy", user?.uid)
        updateHikeData("updatedBy", user?.uid)
        setFormSubmitted(true)
    }

    useEffect(() => {
        if (formSubmitted) {
            const saveHike = async (): Promise<void> => {
                const { docRef, error } = await addData("hikes", hikeData)
                if (error) {
                    console.error(error)
                    setMessage("Sorry, there has been an issue saving the hike.")
                } else if (docRef) {
                    console.log("All done :)")
                    console.log(docRef.id)
                }

                setFormSubmitted(false)

                setHikeData({
                    routeId: "Please select...",
                    startTime: "",
                    leader: "Please select...",
                    participants: [],
                    createdUtc: "",
                    updatedUtc: "",
                    createdBy: "",
                    updatedBy: "",
                    status: "scheduled"
                
                })

            }

            void saveHike();
        }

    }, [formSubmitted, hikeData])
    return (

        user ?
            <>
                < form action={handleSubmit} >
                    <RouteOptions updateHikeData={updateHikeData}/>
                    <LeaderOptions updateHikeData={updateHikeData}/>
                    <DateSelector label="When is the hike?" id="startTime" onValueChange={updateHikeData}/>

                    <button type="submit">Submit</button>
                </form >

                {message && <p>{message}</p>}
            </>
            : <p>You must be logged in as an admin member to upload new hikes</p>

    )
}