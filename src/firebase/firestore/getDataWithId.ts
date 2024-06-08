import { db } from "../config"
import { type DocumentReference, type FirestoreError, doc, getDoc } from "firebase/firestore";
import { type GetDataWithIdResult } from "../models/firestore";

export default async function getDataWithId(collection: string, id: string): Promise<GetDataWithIdResult> {
    const docRef: DocumentReference = doc(db, collection, id);

    let docSnap = undefined;
    let error = undefined;

    try {
        docSnap = await getDoc(docRef);
    } catch (e) {
        error = e as FirestoreError;
    }

    return { docSnap, error } as GetDataWithIdResult;
}