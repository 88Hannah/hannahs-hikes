import { useState, useEffect } from "react"
import getDataWithId from "@/firebase/firestore/getDataWithId"
import { type Member } from "../models"

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
        <div className="fixed top-0 left-0 w-full h-full bg-black/70 flex justify-center items-center" onClick={closeModal}>
            <div className="w-dvw h-dvh sm:max-w-lg sm:h-auto bg-white p-3 pt-9 sm:rounded-lg relative" onClick={handleContentClick}>
                <div onClick={closeModal} className="h-6 w-6 absolute z-10 right-3 top-3">
                    <span className="h-1 w-full bg-black block rounded-full relative rotate-45 top-2"></span>
                    <span className="h-1 w-full bg-black block rounded-full relative -rotate-45 top-1"></span>
                </div>

                <img 
                    className="rounded-lg w-full aspect-video object-cover" 
                    src={leaderDetails.profileUrl ?? "/default-images/default-profile-picture.jpg"} 
                    alt="profile picture" />

                <h3 className="font-bold text-lg my-2 sm:my-3">{leaderDetails.displayName}</h3>
                
                { leaderDetails.details?.bio && 
                    <p>{leaderDetails.details?.bio}</p>
                }

                { leaderDetails.details?.favRoute && 
                    <p className="mt-2 sm:mt-3">
                        <span className="font-bold">Favourite hike: </span>
                        <span>{leaderDetails.details?.favRoute}</span>
                    </p>
                }
            </div>
        </div>
    )
}