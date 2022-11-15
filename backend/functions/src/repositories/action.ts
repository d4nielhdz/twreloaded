import { firestore } from "firebase-admin";
import { Action } from "../models/action";

const ref = firestore().collection("actions");

export class ActionRepository {
  static saveAction = async (action: Partial<Action>) => {
    await ref.add(action);
  };
}
