"use client";

import { useState } from "react"
import signIn from "@/firebase/auth/signin";
import signUp from "@/firebase/auth/signup";
import { useRouter } from "next/navigation";

export default function Login() {

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ errorMessage, setErrorMessage ] = useState("");
    const router = useRouter();

    const errorCodes = {
        "auth/email-already-exists": "A user already exists with this email address.",
        "auth/email-already-in-use": "A user already exists with this email address.",
        "auth/invalid-credential": "Sorry, these login details are not recognised.",
        "auth/invalid-login-credential": "Sorry, these login details are not recognised.",
        "auth/invalid-email": "Please provide a valid email address.",
        "auth/invalid-password": "Sorry, this password is invalid. It must contain at least six characters.",
        "auth/user-not-found": "Sorry, this user is not recognised.",
        "auth/weak-password": "Your password must be at least six characters."
    }

    const processResponse = (error: null | object, result: null | object) => {
        if(error) {
            console.log(error)
            setErrorMessage(() => {
                const message: string = errorCodes[error.code] ? errorCodes[error.code] : "Sorry, something has gone wrong. Please try again."
                return message
            })
        } else {
            console.log(result)
            return router.push("/")
        }
    }

    const handleRegister = async() => {
        setErrorMessage("")
        const { result, error } = await signUp(email, password);
        processResponse(error, result)
    }

    const handleLogin = async() => {
        setErrorMessage("")
        const { result, error } = await signIn(email, password);
        processResponse(error, result)
    }

    return (
        <>
            <p>I can log you in!</p>

            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
            <button onClick={handleRegister}>Register</button>
            <button onClick={handleLogin}>Log in</button>

            { errorMessage && <p>{errorMessage}</p>}
        </>
    )
}