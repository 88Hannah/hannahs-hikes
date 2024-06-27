"use client";

import logOut from "@/firebase/auth/logout";

export default function Logout() {

    const handleLogout = async() => {
        await logOut()
    }
    return (
        <>
            <button onClick={handleLogout} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Sign out
            </button>
        </>
    )
}