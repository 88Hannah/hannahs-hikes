"use client";

import { useParams } from "next/navigation";
import getDataWithId from "@/firebase/firestore/getDataWithId";
import { useEffect, useState } from "react";
import { type Route } from "../models";

export default function RouteDetails() {

    const [routeDetails, setRouteDetails] = useState<Route>({} as Route)

    const params = useParams<{ route: string }>()

    useEffect(() => {
        const getRoute = async () => {
            const { docSnap, error } = await getDataWithId("routes", params.route)
            console.log(error)
            if (error) {
                console.error(error)
            } else if (docSnap.exists()) {
                setRouteDetails(docSnap.data())
            }
        }

        void getRoute()
    }, [params.route])

    return (
        <>
            {
                routeDetails ?

                    <div>
                        <h1>{routeDetails.routeName}</h1>
                        <p>Meeting point: {routeDetails.meetingPoint}</p>
                        <p>Distance: {routeDetails.distance}km</p>
                        <p>Duration: {routeDetails.duration}{routeDetails.duration == 1 ? " hour" : " hours"}</p>
                        <p>Difficulty: {routeDetails.difficulty}</p>
                        <p>{routeDetails.routeDescription}</p>
                        <img src={routeDetails.coverPhotoUrl} alt={routeDetails.routeName} />
                    </div>

                    : <p>This is not a recognised route</p>
            }
        </>
    )
}