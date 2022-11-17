import { firestore } from "firebase-admin";
import { User } from "../models/user";
import { flattenDoc } from "../utils/misc";

export class UserRepository {
  private ref: firestore.CollectionReference;
  private static instance: UserRepository;
  private constructor() {
    this.ref = firestore().collection("users");
  }
  public static getInstance(): UserRepository {
    if (!UserRepository.instance) {
      UserRepository.instance = new UserRepository();
    }
    return UserRepository.instance;
  }
  public getUserByUsername = async (username: string) => {
    const snapshot = await this.ref.where("username", "==", username).get();
    const userResponse = snapshot.docs[0];
    return flattenDoc(userResponse) as User;
  };
  public getUsersByIds = async (userIds: string[]) => {
    const followedUsersSnapshot = await this.ref
      .where(firestore.FieldPath.documentId(), "in", userIds)
      .get();
    return followedUsersSnapshot.docs.map(flattenDoc) as User[];
  };
  public searchUsersByQuery = async (query: string) => {
    const snapshot = await this.ref
      .orderBy("username")
      .startAt(query)
      .endAt(query + "\uf8ff")
      .get();
    return snapshot.docs.map(flattenDoc) as User[];
  };
  public getUserById = async (id: string) => {
    const snapshot = await this.ref.doc(id).get();
    return flattenDoc(snapshot) as User;
  };
  public createUser = async (
    userId: string,
    email: string,
    username: string
  ) => {
    const snapshot = await this.ref.where("username", "==", username).get();

    if (snapshot.empty) {
      await this.ref.doc(userId).set({
        email,
        username,
      });
      return true;
    }
    return false;
  };
  public updateUser = async (userId: string, user: Partial<User>) => {
    const snapshot = await this.ref
      .where("username", "==", user.username)
      .get();

    if (snapshot.empty) {
      await this.ref.doc(userId).update({ ...user });
      return true;
    }
    return false;
  };
  public deleteUser = async (userId: string) => this.ref.doc(userId).delete();
}
