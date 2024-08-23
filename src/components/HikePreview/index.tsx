import Link from "next/link"
import { useEffect, useState, useRef } from "react"
import { type Hike } from "../models"
import { getDate, getTime } from "@/utils/dateUtils"
import getDataWithId from "@/firebase/firestore/getDataWithId"
import updateData from "@/firebase/firestore/updateData"
import { useAuthContext } from "@/context/AuthContext";
import { getCurrentUtcTime } from "@/utils/dateUtils";

export default function HikePreview({ hikeInfo, hikeId }: { hikeInfo: Hike, hikeId: string }) {

    const [ hikeName, setHikeName ] = useState<string>("")
    const [ leaderName, setLeaderName ] = useState<string>("")
    const [ hikeImage, setHikeImage ] = useState<string>("")
    const [ isSignedUp, setIsSignedUp ] = useState<boolean>(false)
    const [ updatedParticipantDetails, setUpdatedParticipantDetails ] = useState({})
    const [ numParticipants, setNumParticipants ] = useState<number>(0)

    const hasPageBeenRendered = useRef({effectUpdateParticipantList: false})


// Hike name - use routeid to get route info

// Leader - got Id - need to find name

const { user } = useAuthContext()

const handleJoin = function () {
    console.log("Join is being handled")
    const newParticipantsList = [...hikeInfo.participants, user.uid]
    setUpdatedParticipantDetails(
        {
            participants: newParticipantsList,
            updatedBy: user.uid,
            updatedUtc: getCurrentUtcTime()
        }
    )
}

const handleCancel = function () {
    console.log("Cancel is being handled")
    const newParticipantsList = hikeInfo.participants.filter((userId) => userId != user.uid)
    setUpdatedParticipantDetails(
        {
            participants: newParticipantsList,
            updatedBy: user.uid,
            updatedUtc: getCurrentUtcTime()
        }
    )
}

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

const findUserInParticipants = (userId: string) => {
    const currentParticipants = hikeInfo.participants;
    return currentParticipants.indexOf(userId);

}


useEffect(() => {
    const userIndex = findUserInParticipants(user.uid)
    if(userIndex >= 0) {
        setIsSignedUp(true)
    }
    setNumParticipants(hikeInfo.participants.length)
}, [hikeInfo, user])


useEffect(() => {
    console.log("Running this use effect ...")
    if(hasPageBeenRendered.current.effectUpdateParticipantList) {
        console.log(updatedParticipantDetails)
        console.log(hikeId)
        const updateParticipantList = async function () {
            await updateData('hikes', hikeId, updatedParticipantDetails)
        };
    
        void updateParticipantList()
    }
    else {
        hasPageBeenRendered.current.effectUpdateParticipantList = true;
    }
}, [updatedParticipantDetails, hikeId])


const date = getDate(hikeInfo.startTime)
const time = getTime(hikeInfo.startTime)



    return (
        <div className="sm:flex w-full">

            <div>
                <h2>{hikeName}</h2>
                <img src={hikeImage ?? "/default-images/default-hike.jpg"} alt={hikeName} width="150"/>
            </div>
            <div>
                <div className="flex flex-wrap">
                    <p>{date}</p>
                    <p>{time}</p>
                </div>
                <p>Led by {leaderName}</p>
                <Link href={`/routes/${hikeInfo.routeId}`}>See route details</Link>

                <p>{numParticipants} signed up</p>
                { user && 
                    (isSignedUp
                        ? <button onClick={handleCancel}>Cancel</button>
                        : <button onClick={handleJoin}>Join</button>
                    )
                }
            </div>
        </div>
    )
}