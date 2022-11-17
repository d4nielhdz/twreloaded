import { RenderedTweet } from "./tweet";
import { User } from "./user";

export type Report = {
  date: number;
  userWithMostEvents: User & { numEvents: number };
  tweetsCreated: number;
  tweetWithMostReplies: RenderedTweet;
  numUsers: number;
};
