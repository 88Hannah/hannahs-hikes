import { db } from "../config"
import { collection, query, where, getDocs, type FirestoreError, type WhereFilterOp } from "firebase/firestore";
import { type GetDataWithQueryResult } from "../models/firestore";

export default async function getDataWithQuery(collectionName: string, key: string, queryType: WhereFilterOp, value: string): Promise<GetDataWithQueryResult> {

    const q = query(collection(db, collectionName), where(key, queryType, value));

    let querySnapshot = undefined;
    let error = undefined;

    try {
        querySnapshot = await getDocs(q);
    } catch (e) {
        error = e as FirestoreError;
    }

    return { querySnapshot, error } as GetDataWithQueryResult;
}