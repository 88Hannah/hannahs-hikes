"use client";

import { useEffect, useState } from "react";
import LeaderPreview from "../LeaderPreview";
import LeaderModal from "../LeaderModal";
import { type FetchedMember } from "../models";
import getDataWithQuery from "@/firebase/firestore/getDataWithQuery";

export default function Leaders() {

    const [ leaders, setLeaders ] = useState<FetchedMember[]>([])
    const [ showModal, setShowModal ] = useState<boolean>(false)
    const [ highlightedLeader, setHighlightedLeader ] = useState<string>("")


    const showLeaderModal = (id: string) => {
        setShowModal(true)
        setHighlightedLeader(id)
        console.log("Show model with ID: " + id)
    }



    useEffect(() => {
        const getLeaders = async () => {
            const { querySnapshot, error } = await getDataWithQuery("members", "role", "==", "leader")

            if (!error && querySnapshot) {
                setLeaders(querySnapshot?.docs.map(doc => ({ id: doc.id, ...doc.data()})))
            } else {
                console.error(error)
            }
        }

        void getLeaders()

    }, [])



        const leadersHtml = leaders.length ? 
            leaders.map(doc => {
                return (
                    <LeaderPreview key={doc.id} leaderId={doc.id} displayName={doc.displayName} profileUrl={doc.profileUrl} handleClick={showLeaderModal}/>
                )
            })
            : <p>No leaders found</p>

    return (
        <>
            {showModal && <LeaderModal leaderId={highlightedLeader} setShowModal={setShowModal}/>}
            {leadersHtml}
        </>
    )
}