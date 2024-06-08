"use client";

import { useState } from "react"
import signIn from "@/firebase/auth/signin";
import signUp from "@/firebase/auth/signup";
import googleSignIn from "@/firebase/auth/google";
import { useRouter } from "next/navigation";
import addData from "@/firebase/firestore/addData";
import getDataWithQuery from "@/firebase/firestore/getDataWithQuery";
import { type User } from "../models";

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

    const handleRegister = async(): Promise<void> => {
        setErrorMessage("")
        const { user, error } = await signUp(email, password);
        if(error) {
            console.log(error)
            setErrorMessage(() => {
                return errorCodes[error.code] ?? "Sorry, something has gone wrong. Please try again."
            })
        } else if (user){
            console.log(user)
            const newUser: User = {
                userId: user.uid,
                dispayName: "",
                profilePicture: "",
                role: "user",
                stats: {},
                hikes: []
            }
            const { docRef, error: dataError } = await addData("users", newUser)
            if(dataError) {
                console.error(dataError)
            } else if(docRef) {
                console.log(docRef.id)
            }
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
        } else {
            console.log(user)
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
            console.log(user)
            const { querySnapshot, error } = await getDataWithQuery("users", "userId", "==", user.uid)
            if (error) {
                console.error(error)
            } else if (querySnapshot?.empty) {
                const newUser: User = {
                    userId: user.uid,
                    dispayName: user.displayName,
                    profilePicture: user.photoURL,
                    role: "user",
                    stats: {},
                    hikes: []
                }
                const { docRef, error: dataError } = await addData("users", newUser)
                if(dataError) {
                    console.error(dataError)
                } else if(docRef) {
                    console.log(docRef.id)
                }
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