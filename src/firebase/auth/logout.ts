import { auth } from "../config";
import { signOut } from "firebase/auth";

export default async function logOut(): Promise<void> {
    try {
        await signOut (auth);
    } catch (e) {
        console.error(e);
    }
}