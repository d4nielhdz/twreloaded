import { firestore } from "firebase-admin";
import { Action } from "../models/action";

const ref = firestore().collection("actions");

export class ActionRepository {
  static saveAction = async (action: Omit<Action, "id">) => {
    await ref.add(action);
  };
}
