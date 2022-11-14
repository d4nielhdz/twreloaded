import { firestore } from "firebase-admin";
import { User } from "../models/user";
import { flattenDoc } from "../utils/misc";

const ref = firestore().collection("users");

export class UserRepository {
  static getUserByUsername = async (username: string) => {
    const snapshot = await ref.where("username", "==", username).get();
    const userResponse = snapshot.docs[0];
    return flattenDoc(userResponse) as User;
  };
  static searchUsersByQuery = async (query: string) => {
    const snapshot = await ref
      .orderBy("username")
      .startAt(query)
      .endAt(query + "\uf8ff")
      .get();
    return snapshot.docs.map(flattenDoc) as User[];
  };
  static getUserById = async (id: string) => {
    const snapshot = await ref.doc(id).get();
    return flattenDoc(snapshot) as User;
  };
  static createUser = async (
    userId: string,
    email: string,
    username: string
  ) => {
    const snapshot = await ref.where("username", "==", username).get();

    if (snapshot.empty) {
      await ref.doc(userId).set({
        email,
        username,
      });
      return true;
    }
    return false;
  };
  static updateUser = async (userId: string, user: Partial<User>) => {
    const snapshot = await ref.where("username", "==", user.username).get();

    if (snapshot.empty) {
      await ref.doc(userId).update({ ...user });
      return true;
    }
    return false;
  };
  static deleteUser = async (userId: string) => ref.doc(userId).delete();
}
