import { auth } from "../config";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();

export default async function googleSignIn() {
    let result = null,
        error = null;
    try {
        result = await signInWithPopup(auth, provider)
    } catch (e) {
        error = e;
    }

    return { result, error };
}