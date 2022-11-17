import { firestore } from "firebase-admin";
import { ActionType } from "../models/action";
import { RenderedTweet, Tweet } from "../models/tweet";
import { User } from "../models/user";
import { flattenDoc } from "../utils/misc";
import { ActionRepository } from "./action";
import { UserRepository } from "./user";

export class TweetRepository {
  private ref: firestore.CollectionReference;
  private static instance: TweetRepository;
  private constructor() {
    this.ref = firestore().collection("tweets");
  }
  public static getInstance(): TweetRepository {
    if (!TweetRepository.instance) {
      TweetRepository.instance = new TweetRepository();
    }
    return TweetRepository.instance;
  }
  public saveTweet = async (tweet: Partial<Tweet>) => {
    const res = await this.ref.add(tweet);
    await ActionRepository.getInstance().saveAction({
      performedAt: Date.now(),
      userId: tweet!.userId!,
      tweetId: res.id,
      actionType: ActionType.TWEET,
    });
    if (tweet.replyTo != null) {
      await ActionRepository.getInstance().saveAction({
        performedAt: Date.now(),
        userId: tweet!.userId!,
        tweetId: tweet.replyTo,
        actionType: ActionType.REPLY,
      });
    }
    return res;
  };
  public getTweetsByUserId = async (userId: string) => {
    const snapshot = await this.ref
      .where("userId", "==", userId)
      .orderBy("date", "desc")
      .limit(10)
      .get();

    return Promise.all(
      (snapshot.docs.map(flattenDoc) as Tweet[]).map(async (tweet) => {
        const user = await UserRepository.getInstance().getUserById(
          tweet.userId
        );
        const replyCount = await this.getTweetReplyCount(tweet.id);
        return { ...tweet, user, replyCount } as RenderedTweet;
      })
    );
  };

  public getFollowedUsersTweets = async (userId: string) => {
    const user = await UserRepository.getInstance().getUserById(userId);
    const followedUsersIds = user.followedUsers ?? [];

    const followedUsers: User[] =
      followedUsersIds.length > 0
        ? await UserRepository.getInstance().getUsersByIds(followedUsersIds)
        : [];

    followedUsers.push(user);

    const snapshot = await this.ref
      .where("userId", "in", [...followedUsersIds, userId])
      .orderBy("date", "desc")
      .limit(10)
      .get();

    const tweets = await Promise.all(
      (snapshot.docs.map(flattenDoc) as Tweet[]).map(async (tweet) => {
        const user = followedUsers.find((u) => u.id == tweet.userId);
        const replyCount = await this.getTweetReplyCount(tweet.id);
        return { ...tweet, user, replyCount } as RenderedTweet;
      })
    );

    return tweets;
  };
  private getTweetReplyCount = async (tweetId: string) => {
    const snapshot = await this.ref.where("replyTo", "==", tweetId).get();
    return snapshot.docs.length;
  };
  public getTweetById = async (tweetId: string) => {
    const snapshot = await this.ref.doc(tweetId).get();
    const tweet = flattenDoc(snapshot) as Tweet;
    const user = await UserRepository.getInstance().getUserById(tweet.userId);
    const replyCount = await this.getTweetReplyCount(tweetId);
    return { ...tweet, user, replyCount } as RenderedTweet;
  };
  public getTweetWithRepliesById = async (tweetId: string) => {
    const tweet = await this.getTweetById(tweetId);

    const repliesSnapshot = await this.ref
      .where("replyTo", "==", tweetId)
      .get();
    const replies = (await Promise.all(
      (repliesSnapshot.docs.map(flattenDoc) as Tweet[]).map(async (t) => {
        const user = await UserRepository.getInstance().getUserById(t.userId);
        const replyCount = await this.getTweetReplyCount(t.id);
        return { ...t, user, replyCount };
      })
    )) as RenderedTweet[];
    return { tweet, replies };
  };
}
