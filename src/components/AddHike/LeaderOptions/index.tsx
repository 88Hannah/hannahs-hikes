import SelectField from "@/components/FormFields/SelectField";
import getDataWithQuery from "@/firebase/firestore/getDataWithQuery";
import { useEffect, useState } from "react";
import { type FetchedMember } from "@/components/models";

export default function LeaderOptions({ updateHikeData }) {

    const [ leaders, setLeaders ] = useState<FetchedMember[]>()
    const [ leadersSelectArray, setLeadersSelectArray ] = useState<{id: string, value: string, disabled: boolean, selected: boolean}[]>()

    useEffect(() => {
        const getLeaders = async () => {
            const { querySnapshot, error } = await getDataWithQuery("members", "roles", "array-contains", "leader")

            if (!error && querySnapshot) {
                setLeaders(querySnapshot?.docs.map(doc => ({ id: doc.id, ...doc.data()})))
            } else {
                console.error(error)
            }
        }

        void getLeaders()
        
    }, [])

    useEffect(() => {
        if(leaders) {
            const selectLeaders = leaders.flatMap(leader => {
                    if(leader.displayName) {
                        return [{
                            id: leader.id,
                            value: leader.displayName,
                            disabled: false,
                            selected: false
                        }];
                    } return [];
                
            })
            if(selectLeaders.length > 1) {
                selectLeaders.unshift({
                    id: "Please select...",
                    value: "Please select...",
                    disabled: true,
                    selected: true
                })
            }
            setLeadersSelectArray(selectLeaders)
        }
    }, [leaders])
    
    return (
        <>
            <p>These are the leader options ...</p>
            {leadersSelectArray && <SelectField name="leader" label="Leader" value={leadersSelectArray[0].id} options={leadersSelectArray} onValueChange={updateHikeData} />}
                        
        </>
    )
}