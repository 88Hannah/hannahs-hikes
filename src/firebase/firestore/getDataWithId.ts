import { db } from "../config"
import { doc, getDoc } from "firebase/firestore";

export default async function getDataWithId(collection: string, id: string) {
    const docRef = doc(db, collection, id);

    let docSnap = null;
    let error = null;

    try {
        docSnap = await getDoc(docRef);
    } catch (e) {
        error = e;
    }

    return { docSnap, error };
}