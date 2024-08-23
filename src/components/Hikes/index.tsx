
"use client";

import { useEffect, useState } from "react";
import HikePreview from "../HikePreview";
import { type FetchedHike } from "../models";
import getLiveCollectionData from "@/firebase/firestore/getLiveCollectionData"
import { type FirestoreError } from "firebase/firestore"

export default function Hikes() {

    const [hikes, setHikes] = useState<FetchedHike[]>([])


    const onData = (data: FetchedHike[]) => {
        console.log("Received data: ", data);
        const orderedHikes = data.sort((a, b) => new Date(a.startTime) - new Date(b.startTime))
        setHikes(orderedHikes)
      };
      
      const onError = (error: FirestoreError) => {
        console.error("Error fetching live data: ", error);
      };
    
    useEffect(() => {
        const unsubscribe = getLiveCollectionData("hikes", onData, onError);
    
        return unsubscribe
    }, [])


    const hikesHtml = hikes.length ? 
        hikes.map(doc => {
            return (
                <HikePreview key={doc.id} hikeInfo={doc} hikeId={doc.id}/>
            )
        })
        : <p>No routes found</p>

    return (
        <>
            {hikesHtml}
        </>
    )
}