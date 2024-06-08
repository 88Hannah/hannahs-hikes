import { auth } from "../config";
import { type AuthError, signInWithEmailAndPassword } from "firebase/auth";
import { type SignInResult } from "../models/auth";

export default async function signIn(email: string, password: string): Promise<SignInResult> {
    let result = undefined,
        error = undefined;
    try {
        result = await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
        error = e as AuthError;
    }

    return {user: result?.user, error } as SignInResult;
}