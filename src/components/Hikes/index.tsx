
"use client";

import getEntireCollection from "@/firebase/firestore/getEntireCollection";
import { useEffect, useState } from "react";
import HikePreview from "../HikePreview";
import { type Hike } from "../models";

export default function Hikes() {

    const [hikes, setHikes] = useState<Hike[]>([])


    useEffect(() => {
        const getHikes = async () => {
            const { querySnapshot, error } = await getEntireCollection("hikes")

            if (!error && querySnapshot) {
                // The id can be used later on for users to sign up to a hike
                const allHikes = querySnapshot?.docs.map(doc => ({ id: doc.id, ...doc.data() as Hike}))
                const orderedHikes = allHikes.sort((a, b) => new Date(a.startTime) - new Date(b.startTime))
                setHikes(orderedHikes)
            } else {
                console.error(error)
            }
        }

        void getHikes()

    }, [])



        const hikesHtml = hikes.length ? 
            hikes.map(doc => {
                return (
                    <HikePreview key={doc.id} hikeInfo={doc}/>
                )
            })
            : <p>No routes found</p>

    return (
        <>
            {hikesHtml}
        </>
    )
}