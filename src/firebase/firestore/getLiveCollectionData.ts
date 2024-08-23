import { db } from "../config";
import { type FirestoreError, collection, onSnapshot } from "firebase/firestore";
import { type GetLiveDataResult } from "../models/firestore";


// export default function getLiveData(collectionName: string): GetLiveDataResult {

//     let querySnapshotData = undefined;
//     let liveDataError = undefined;

//     const unsubscribe = onSnapshot(
//         collection(db, collectionName), 
//         (querySnapshot) => {
//             console.log("QuerySnapshot: ")
//             console.log(querySnapshot)
//             querySnapshotData = querySnapshot
//         },
//         (error: FirestoreError) => {
//             liveDataError = error
//         }
//     );

//     return { querySnapshotData, liveDataError, unsubscribe } as GetLiveDataResult

// }


export default function getLiveCollectionData(
  collectionName: string,
  onData: (data: any) => void,
  onError: (error: FirestoreError) => void
): () => void {

  const unsubscribe = onSnapshot(
    collection(db, collectionName),
    (querySnapshot) => {
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data()}));
      onData(data);
    },
    (error: FirestoreError) => {
      onError(error);
    }
  );

  return unsubscribe;
}