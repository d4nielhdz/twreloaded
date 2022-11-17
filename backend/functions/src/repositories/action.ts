import { firestore } from "firebase-admin";
import { Action } from "../models/action";

export class ActionRepository {
  private ref: firestore.CollectionReference;
  private static instance: ActionRepository;
  private constructor() {
    this.ref = firestore().collection("tweets");
  }
  public static getInstance(): ActionRepository {
    if (!ActionRepository.instance) {
      ActionRepository.instance = new ActionRepository();
    }
    return ActionRepository.instance;
  }
  public saveAction = async (action: Omit<Action, "id">) => {
    await this.ref.add(action);
  };
}
