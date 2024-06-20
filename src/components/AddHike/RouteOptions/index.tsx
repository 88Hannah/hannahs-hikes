import SelectField from "@/components/FormFields/SelectField";
import { useEffect, useState } from "react";
import { type Route } from "@/components/models";
import getEntireCollection from "@/firebase/firestore/getEntireCollection";

export default function RouteOptions({ updateHikeData }) {

    const [ routes, setRoutes ] = useState<Route[]>()
    const [ routesSelectArray, setRoutesSelectArray ] = useState<{id: string, value: string, disabled: boolean, selected: boolean}[]>()

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

    useEffect(() => {
        if(routes) {
            const selectRoutes = routes.map(route => {
                return {
                    id: route.id,
                    value: route.routeName,
                    disabled: false,
                    selected: false
                };
            });
            if(selectRoutes.length > 1) {
                selectRoutes.unshift({
                    id: "Please select...",
                    value: "Please select...",
                    disabled: true,
                    selected: true
                })
            }
            setRoutesSelectArray(selectRoutes)
        }
    }, [routes])
    
    return (
        <>
            <p>These are the route options ...</p>
            {routesSelectArray && <SelectField name="routeId" label="Route" value={routesSelectArray[0].id} options={routesSelectArray} onValueChange={updateHikeData} />}
                        
        </>
    )
}