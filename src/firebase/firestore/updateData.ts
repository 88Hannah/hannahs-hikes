import { doc, updateDoc } from "firebase/firestore"; 
import { db } from "../config"

export default async function updateData(collectionName: string, docId: string, updatedData: object): Promise<void> {
  
  const currentDoc = doc(db, collectionName, docId)
  
  if(currentDoc) {
    await updateDoc(currentDoc, updatedData);
  }

}