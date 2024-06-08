import { type DocumentSnapshot, type DocumentReference, type FirestoreError, type QuerySnapshot } from "firebase/firestore";

export interface AddDataResult {
    docRef?: DocumentReference,
    error?: FirestoreError
}

export interface GetDataWithIdResult {
    docSnap?: DocumentSnapshot,
    error?: FirestoreError
}

export interface GetDataWithQueryResult {
    querySnapshot?: QuerySnapshot,
    error?: FirestoreError
}