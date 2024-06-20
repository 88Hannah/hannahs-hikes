import Link from "next/link"
import { useEffect, useState } from "react"
import { type Hike } from "../models"
import { getDate, getTime } from "@/utils/dateUtils"
import getDataWithId from "@/firebase/firestore/getDataWithId"

export default function HikePreview({ hikeInfo }: { hikeInfo: Hike }) {

    const [ hikeName, setHikeName ] = useState<string>("")
    const [ leaderName, setLeaderName ] = useState<string>("")
    const [ hikeImage, setHikeImage ] = useState<string>("")


// Hike name - use routeid to get route info

// Leader - got Id - need to find name

useEffect(() => {
    const getLeader = async() => {
        const {docSnap, error} = await getDataWithId("members", hikeInfo.leader)
        if (error) {
            console.error(error)
        } else if (docSnap?.exists()) {
            console.log("The snapshot exits")
            setLeaderName(docSnap.data().displayName)
        }
    }

    const getHikeDetails = async() => {
        const {docSnap, error} = await getDataWithId("routes", hikeInfo.routeId)
        if (error) {
            console.error(error)
        } else if (docSnap?.exists()) {
            console.log("The snapshot exits")
            setHikeName(docSnap.data().routeName)
            setHikeImage(docSnap.data().coverPhotoUrl ?? "")
        }
    }
    
    void getLeader()

    void getHikeDetails()
    
}, [])




const date = getDate(hikeInfo.startTime)
const time = getTime(hikeInfo.startTime)


    return (
        <Link href={`/routes/${hikeInfo.routeId}`}>
            <div>
                <h4>Hike: {hikeName}</h4>
                <p>Date: {date}</p>
                <p>Start time: {time}</p>
                <p>Leader: {leaderName}</p>
                <img src={hikeImage ?? "/default-images/default-hike.jpg"} alt={hikeName} width="150"/>
            </div>
        </Link>
    )
}