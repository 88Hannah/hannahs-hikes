'use client'

import Link from "next/link";
import Logout from "@/components/Logout";
import { useAuthContext } from "@/context/AuthContext";
import useRoles from "@/hooks/useRoles"

export default function Menu() {

    const { user } = useAuthContext()
    const { hasRole, hasAnyRole } = useRoles()

    return (
        <>
            <p>The menu</p>
            <Link href='/'>Home</Link>
            <Link href='/events'>Events</Link>
            <Link href='/leaders'>Leaders</Link>
            <Link href='/routes'>View all routes</Link>

            { user ? 
                <>
                    { hasRole("admin") && 
                        <>
                            <Link href='/admin'>Admin</Link>
                            <Link href='/new-route'>Add new route</Link>
                        </>
                    }

                    { hasAnyRole(["admin", "leader"]) && 
                        <Link href='/schedule-hike'>Schedule a hike</Link>
                    }
                
                    <Link href='/profile'>My profile</Link>
                    <Logout />
                </>

                : <Link href='/login'>Log in</Link>
            }
        </>
    )
}






// 'use client'

// import Link from "next/link";
// import Logout from "@/components/Logout";
// import { useAuthContext } from "@/context/AuthContext";
// import { useEffect, useState } from "react";
// import getDataWithId from "@/firebase/firestore/getDataWithId";

// export default function Menu() {

//     const [ isLeader, setIsLeader ] = useState<boolean>(false)
//     const [ isAdmin, setIsAdmin ] = useState<boolean>(false)
//     const { user } = useAuthContext()

//     useEffect(() => {
//         if(user) {
//             const getUserRoles = async() => {
//                 const { docSnap, error } = await getDataWithId("members", user.uid);
//                 if(error) {
//                     console.log(error)
//                 } else if(docSnap?.exists()) {
//                     const userRoles = docSnap.data().roles
//                     setIsAdmin(userRoles.includes("admin"));
//                     setIsLeader(userRoles.includes("leader"));
//                 }
//             }
//             void getUserRoles()
//         }
//     }, [user])

//     return (
//         <>
//             <p>The menu</p>
//             <Link href='/'>Home</Link>
//             <Link href='/events'>Events</Link>
//             <Link href='/leaders'>Leaders</Link>
//             <Link href='/routes'>View all routes</Link>

//             { user ? 
//                 <>
//                     {isAdmin && 
//                         <>
//                             <Link href='/admin'>Admin</Link>
//                             <Link href='/new-route'>Add new route</Link>
//                         </>
//                     }

//                     {(isAdmin || isLeader) && <Link href='/schedule-hike'>Schedule a hike</Link>}

                
//                     <Link href='/profile'>My profile</Link>
//                     <Logout />
//                 </>

//                 : <Link href='/login'>Log in</Link>
//             }
//         </>
//     )
// }