"use client";

import getEntireCollection from "@/firebase/firestore/getEntireCollection";
import { useEffect, useState } from "react";
import RoutePreview from "../RoutePreview";

export default function Routes() {

    const [routes, setRoutes] = useState([])


    useEffect(() => {
        const getRoutes = async () => {
            const { querySnapshot, error } = await getEntireCollection("routes")

            console.log("Is something happening here?")

            if (!error) {
                console.log(querySnapshot)

                setRoutes(querySnapshot)

                setRoutes(querySnapshot?.docs.map(doc => ({ id: doc.id, ...doc.data()})))


            } else {
                console.log(error)
            }
        }

        void getRoutes()

    }, [])



        const routesHtml = routes.length ? 
            routes.map(doc => {
                return (
                    <RoutePreview key={doc.id} routeName={doc.routeName} routeImg={doc.coverPhotoUrl}/>
                )
            })
            : <p>No routes found</p>

    return (
        <>
            {routesHtml}
        </>
    )
}