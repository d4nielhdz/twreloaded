import { firestore } from "firebase-admin";
import { Action } from "../models/action";
import { flattenDoc } from "../utils/misc";

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
  public getActionsByDateRange = async (dateStart: number, dateEnd: number) => {
    const snapshot = await this.ref
      .where("performedAt", ">=", dateStart)
      .where("performedAt", "<=", dateEnd)
      .get();
    return snapshot.docs.map(flattenDoc) as unknown as Action[];
  };
}
