'use client'

import Link from "next/link";
import Logout from "@/components/Logout";
import { useAuthContext } from "@/context/AuthContext";
import useRoles from "@/hooks/useRoles"
import MenuButton from "../MenuButton";
import { useState } from "react";

export default function Menu() {

    const { user } = useAuthContext()
    const { hasRole, hasAnyRole } = useRoles()

    const [ isOpen, setIsOpen ] = useState<boolean>(false)

    const handleContentClick = (event: React.MouseEvent) => {
        event.stopPropagation();
    };

    return (
        <div>
            <MenuButton isOpen={isOpen} handleClick={setIsOpen}/>

            { isOpen && 
                <div onClick={() => setIsOpen(false)} className="fixed right-0 top-0 w-full h-dvh bg-gray-400/50">

                    <nav onClick={handleContentClick} className="w-full sm:w-60 h-full overflow-auto p-3 pt-16 ml-auto bg-[#63BAAB] flex flex-col">
                        <Link className="text-xl font-semibold my-1" href='/'><h2>Home</h2></Link>
                        <Link className="text-xl font-semibold my-1" href='/events'>Events</Link>
                        <Link className="text-xl font-semibold my-1" href='/leaders'>Leaders</Link>
                        <Link className="text-xl font-semibold my-1" href='/routes'>View all routes</Link>

                        <hr className="my-2"/>

                        { user ? 
                            <>
                                { hasRole("admin") && 
                                    <>
                                        <Link className="text-xl font-semibold" href='/admin'>Admin</Link>
                                        <Link className="text-xl font-semibold" href='/new-route'>Add new route</Link>
                                        <hr className="my-2"/>
                                    </>
                                }

                                { hasAnyRole(["admin", "leader"]) && 
                                    <>
                                        <Link className="text-xl font-semibold" href='/schedule-hike'>Schedule a hike</Link>
                                        <hr className="my-2"/>
                                    </>
                                }
                            
                                <Link className="text-xl font-semibold mb-2" href='/profile'>My profile</Link>
                                <Logout />
                            </>

                            : <Link className="text-xl font-semibold" href='/login'>Log in</Link>
                        }
                    </nav>
                </div>
            }
        </div>
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