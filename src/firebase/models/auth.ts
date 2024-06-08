import { type User, type AuthError } from "firebase/auth";

export interface SignInResult {
    user?: User,
    error?: AuthError
}

export interface SignUpResult {
    user?: User,
    error?: AuthError
}

export interface GoogleSignInResult {
    user?: User,
    error?: AuthError
}