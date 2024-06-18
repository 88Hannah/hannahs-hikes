"use client";

import { useState } from "react"
import signIn from "@/firebase/auth/signin";
import signUp from "@/firebase/auth/signup";
import googleSignIn from "@/firebase/auth/google";
import { useRouter } from "next/navigation";
import { type MemberDetails, type MemberStats } from "../models";
import { type Member } from "../models";
import { type User } from "firebase/auth";
import addDataWithDocId from "@/firebase/firestore/addDataWithDocId";
import getDataWithId from "@/firebase/firestore/getDataWithId";

export default function Login() {

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ errorMessage, setErrorMessage ] = useState("");
    const router = useRouter();

    const errorCodes: Record<string, string> = {
        "auth/email-already-exists": "A user already exists with this email address.",
        "auth/email-already-in-use": "A user already exists with this email address.",
        "auth/invalid-credential": "Sorry, these login details are not recognised.",
        "auth/invalid-login-credential": "Sorry, these login details are not recognised.",
        "auth/invalid-email": "Please provide a valid email address.",
        "auth/invalid-password": "Sorry, this password is invalid. It must contain at least six characters.",
        "auth/user-not-found": "Sorry, this user is not recognised.",
        "auth/weak-password": "Your password must be at least six characters."
    }               
    
    const createNewMember = async(user: User):Promise<void> => {
        const newMember = {
                displayName: user.displayName,
                profileUrl: user.photoURL,
                email: user.email!,
                role: "basic",
                details: {} as MemberDetails,
                stats: {} as MemberStats,
                hikes: [],
        } as Member

        const { docRef, error: dataError } = await addDataWithDocId("members", user.uid, newMember)
            if(dataError) {
                console.error(dataError)
            } else if(docRef) {
                console.log(docRef.id)
            }
    }

    const handleRegister = async(): Promise<void> => {
        setErrorMessage("")
        const { user, error } = await signUp(email, password);
        if(error) {
            console.log(error)
            setErrorMessage(() => {
                return errorCodes[error.code] ?? "Sorry, something has gone wrong. Please try again."
            })
        } else if (user){
            await createNewMember(user)
            router.push("/")
        }
    }

    const handleLogin = async(): Promise<void> => {
        setErrorMessage("")
        const {user, error} = await signIn(email, password);

        if(error) {
            console.log(error)
            setErrorMessage(() => {
                return errorCodes[error.code] ?? "Sorry, something has gone wrong. Please try again."
            })
        } else if (user){
            console.log(user.uid)
            router.push("/")
        }
    }

    const handleGoogle = async(): Promise<void> => {
        setErrorMessage("")
        const { user, error } = await googleSignIn();
        if(error) {
            console.log(error)
            setErrorMessage(() => {
                return errorCodes[error.code] ?? "Sorry, something has gone wrong. Please try again."
            })
        } else if (user){
            const { docSnap, error } = await getDataWithId("members", user.uid)
            if (error) {
                console.error(error)
            } else if (!docSnap?.exists()) {
                await createNewMember(user)
            }
            router.push("/")
        }
    }

    return (
        <>
            <p>I can log you in!</p>

            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
            <button onClick={handleRegister}>Register</button>
            <button onClick={handleLogin}>Log in</button>

            <button onClick={handleGoogle}>
                <img src="/providers/google.png" alt="Google's logo" />
                Sign in with Google
            </button>

            { errorMessage && <p>{errorMessage}</p>}
        </>
    )
}