import { firestore } from "firebase-admin";
import { ActionType } from "../models/action";
import { RenderedTweet, Tweet } from "../models/tweet";
import { User } from "../models/user";
import { flattenDoc } from "../utils/misc";
import { ActionRepository } from "./action";
import { UserRepository } from "./user";

const ref = firestore().collection("tweets");
export class TweetRepository {
  static saveTweet = async (tweet: Partial<Tweet>) => {
    const res = await ref.add(tweet);
    await ActionRepository.saveAction({
      performedAt: Date.now(),
      userId: tweet!.userId!,
      tweetId: res.id,
      actionType: ActionType.TWEET,
    });
    if (tweet.replyTo != null) {
      await ActionRepository.saveAction({
        performedAt: Date.now(),
        userId: tweet!.userId!,
        tweetId: tweet.replyTo,
        actionType: ActionType.REPLY,
      });
    }
  };
  static getTweetsByUserId = async (userId: string) => {
    const snapshot = await ref
      .where("userId", "==", userId)
      .orderBy("date", "desc")
      .limit(10)
      .get();

    return Promise.all(
      (snapshot.docs.map(flattenDoc) as Tweet[]).map(async (tweet) => {
        const user = await UserRepository.getUserById(tweet.userId);
        return { ...tweet, user } as RenderedTweet;
      })
    );
  };

  static getFollowedUsersTweets = async (userId: string) => {
    const user = await UserRepository.getUserById(userId);
    const followedUsersIds = user.followedUsers ?? [];

    if (followedUsersIds.length === 0) return [];

    const followedUsers: User[] = await UserRepository.getUsersByIds(
      followedUsersIds
    );

    followedUsers.unshift(user);

    const snapshot = await ref
      .where("userId", "in", followedUsersIds)
      .orderBy("date", "desc")
      .limit(10)
      .get();

    const tweets = (snapshot.docs.map(flattenDoc) as Tweet[]).map((tweet) => {
      const user = followedUsers.find((u) => u.id == tweet.userId);
      return { ...tweet, user };
    });

    return tweets;
  };
  static getTweetById = async (tweetId: string) => {
    const snapshot = await ref.doc(tweetId).get();
    const tweet = flattenDoc(snapshot) as Tweet;
    const user = await UserRepository.getUserById(tweet.userId);
    return { ...tweet, user };
  };
  static getTweetWithRepliesById = async (tweetId: string) => {
    const tweet = await TweetRepository.getTweetById(tweetId);

    const repliesSnapshot = await ref.where("replyTo", "==", tweetId).get();
    const replies = await Promise.all(
      (repliesSnapshot.docs.map(flattenDoc) as Tweet[]).map(async (t) => {
        const user = await UserRepository.getUserById(t.userId);
        return { ...t, user };
      })
    );
    return { tweet, replies };
  };
}
