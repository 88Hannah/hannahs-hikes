"use client";

import getEntireCollection from "@/firebase/firestore/getEntireCollection";
import { useEffect, useState } from "react";
import RoutePreview from "../RoutePreview";
import { type Route } from "../models";

export default function Routes() {

    const [routes, setRoutes] = useState<Route[]>([])


    useEffect(() => {
        const getRoutes = async () => {
            const { querySnapshot, error } = await getEntireCollection("routes")

            if (!error && querySnapshot) {
                setRoutes(querySnapshot?.docs.map(doc => ({ id: doc.id, ...doc.data()})))
            } else {
                console.error(error)
            }
        }

        void getRoutes()

    }, [])



        const routesHtml = routes.length ? 
            routes.map(doc => {
                return (
                    <RoutePreview key={doc.id} routeId={doc.id} routeName={doc.routeName} routeImg={doc.coverPhotoUrl}/>
                )
            })
            : <p>No routes found</p>

    return (
        <div className="flex flex-wrap w-full justify-start gap-3">
            {routesHtml}
        </div>
    )
}