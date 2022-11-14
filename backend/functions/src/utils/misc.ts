import { DocumentSnapshot } from "firebase-functions/v1/firestore";

export const flattenDoc = (doc: DocumentSnapshot) => ({
  ...doc.data(),
  id: doc.id,
});
