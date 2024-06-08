import { auth } from "../config";
import { type AuthError, createUserWithEmailAndPassword } from "firebase/auth";
import { type SignUpResult } from "../models/auth";

export default async function signUp(email: string, password: string): Promise<SignUpResult> {
    let result = undefined,
        error = undefined;
    try {
        result = await createUserWithEmailAndPassword(auth, email, password);
    } catch (e) {
        error = e as AuthError;
    }

    return { user: result?.user, error } as SignUpResult;
}