import { auth } from "../config";
import { signInWithPopup, GoogleAuthProvider, type AuthError } from "firebase/auth";
import { type GoogleSignInResult } from "../models/auth";

const provider = new GoogleAuthProvider();

export default async function googleSignIn(): Promise<GoogleSignInResult> {
    let result = undefined,
        error = undefined;
    try {
        result = await signInWithPopup(auth, provider)
    } catch (e) {
        error = e as AuthError;
    }

    return { user: result?.user, error } as GoogleSignInResult;
}