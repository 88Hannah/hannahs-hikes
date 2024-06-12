import { db } from "../config";
import { type FirestoreError, collection, getDocs } from "firebase/firestore";
import { type GetEntireCollectionResult } from "../models/firestore";


export default async function getEntireCollection(collectionName: string): Promise<GetEntireCollectionResult> {
    
    let querySnapshot = undefined;
    let error = undefined;

    try {
        querySnapshot = await getDocs(collection(db, collectionName));
    } catch (e) {
        error = e as FirestoreError
    }

    return { querySnapshot, error } as GetEntireCollectionResult
    
}