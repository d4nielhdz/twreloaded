import { firestore } from "firebase-admin";
import { Tweet } from "../models/tweet";
import { flattenDoc } from "../utils/misc";

const ref = firestore().collection("tweets");
export class TweetRepository {
  static saveTweet = async (tweet: Partial<Tweet>) => {
    return await ref.add(tweet);
  };
  static getTweetsByUserId = async (userId: string) => {
    const snapshot = await ref.where("userId", "==", userId).limit(10).get();
    return snapshot.docs.map(flattenDoc) as Tweet[];
  };
}
