import { collection, addDoc, type FirestoreError } from "firebase/firestore"; 
import { db } from "../config"
import { type AddDataResult } from "../models/firestore";

export default async function addData(collectionName: string, newData: object): Promise<AddDataResult> {
  let docRef = undefined,
      error = undefined;
  try {
    docRef = await addDoc(collection(db, collectionName), newData);
  } catch (e) {
    error = e as FirestoreError;
  }

  return { docRef, error } as AddDataResult;
}