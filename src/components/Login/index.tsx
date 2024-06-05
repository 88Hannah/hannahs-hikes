"use client";

import { useState } from "react"
import signIn from "@/firebase/auth/signin";
import signUp from "@/firebase/auth/signup";
import { useRouter } from "next/navigation";

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleRegister = async() => {
        try {
            await signUp(email, password);
        } catch (error) {
            console.error(error);
        }
        return router.push("/")
    }

    const handleLogin = async() => {
        try {
            await signIn(email, password);
        } catch (error) {
            console.error(error);
        }
        return router.push("/")
    }

    return (
        <>
            <p>I can log you in!</p>

            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
            <button onClick={handleRegister}>Register</button>
            <button onClick={handleLogin}>Log in</button>

           
        </>
    )
}