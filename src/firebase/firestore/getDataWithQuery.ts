import { db } from "../config"
import { collection, query, where, getDocs } from "firebase/firestore";

export default async function getDataWithQuery(collectionName: string, key: string, queryType: string, value: string) {

    const q = query(collection(db, collectionName), where(key, queryType, value));

    let querySnapshot = null;
    let error = null;

    try {
        querySnapshot = await getDocs(q);
    } catch (e) {
        error = e;
    }

    return { querySnapshot, error };
}