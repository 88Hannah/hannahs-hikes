import { collection, addDoc } from "firebase/firestore"; 
import { db } from "../config"

export default async function addData(collectionName: string, newData: object) {
  let docRef = null,
      error = null;
  try {
    docRef = await addDoc(collection(db, collectionName), newData);
  } catch (e) {
    error = e;
  }

  return { docRef, error };
}