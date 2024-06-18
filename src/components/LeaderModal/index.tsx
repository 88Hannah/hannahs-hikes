import { useState, useEffect } from "react"
import getDataWithId from "@/firebase/firestore/getDataWithId"
import { type Member } from "../models"
import styles from "./styles.module.css"

export default function LeaderModal({ leaderId, setShowModal }: { leaderId: string, setShowModal: any }) {

    const [leaderDetails, setLeaderDetails] = useState<Member>({} as Member)

    const handleContentClick = (event: React.MouseEvent) => {
        event.stopPropagation();
    };

    const closeModal = () => {
        setShowModal(false)
    }

    useEffect(() => {
        const getLeaderDetails = async () => {
            const { docSnap, error } = await getDataWithId("members", leaderId)
            if (error) {
                console.error(error)
            } else if (docSnap?.exists()) {
                console.log("The snapshot exits")
                setLeaderDetails(docSnap.data() as Member)
            }
        }

        void getLeaderDetails()

    }, [leaderId])

    return (
        <div className={styles.modal} onClick={closeModal}>
            <div className={styles.modalContent} onClick={handleContentClick}>
                <span onClick={closeModal}>Close</span>
                <p>{leaderDetails.displayName}</p>
                <img src={leaderDetails.profileUrl ?? "/default-images/default-profile-picture.jpg"} alt="profile picture" />
                <h4>Bio</h4>
                <p>{leaderDetails.details?.bio ?? "This information is missing!"}</p>
                <h4>Favourite hike</h4>
                <p>{leaderDetails.details?.favRoute ?? "This information is missing!"}</p>
            </div>
        </div>
    )
}