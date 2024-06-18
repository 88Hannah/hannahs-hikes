import { doc, setDoc, type FirestoreError } from "firebase/firestore"; 
import { db } from "../config"
import { type AddDataResult } from "../models/firestore";

export default async function addDataWithDocId(collectionName: string, docId: string, newData: object): Promise<AddDataResult> {
  let docRef = undefined,
      error = undefined;
  try {
    docRef = doc(db, collectionName, docId);
    await setDoc(docRef, newData);

  } catch (e) {
    error = e as FirestoreError;
  }

  return { docRef, error } as AddDataResult;
}