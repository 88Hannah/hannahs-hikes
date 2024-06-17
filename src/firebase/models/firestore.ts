import { type DocumentSnapshot, type DocumentReference, type FirestoreError, type QuerySnapshot, type Unsubscribe } from "firebase/firestore";

export interface AddDataResult {
    docRef?: DocumentReference,
    error?: FirestoreError
}

export interface GetEntireCollectionResult {
    querySnapshot?: QuerySnapshot,
    error?: FirestoreError
}

export interface GetLiveDataResult {
    unsubscribe: Unsubscribe
}

export interface GetDataWithIdResult {
    docSnap?: DocumentSnapshot,
    error?: FirestoreError
}

export interface GetDataWithQueryResult {
    querySnapshot?: QuerySnapshot,
    error?: FirestoreError
}