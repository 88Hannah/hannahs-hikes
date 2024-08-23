import { db } from "../config";
import { type FirestoreError, doc, onSnapshot } from "firebase/firestore";

export default function getLiveDocData(
  collectionName: string,
  docId: string,
  onData: (data: any) => void,
  onError: (error: FirestoreError) => void
): () => void {

  const unsubscribe = onSnapshot(
    doc(db, collectionName, docId),
    (docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = { id: docSnapshot.id, ...docSnapshot.data()};
        onData(data);
      }
    },
    (error: FirestoreError) => {
      onError(error);
    }
  );

  return unsubscribe;
}