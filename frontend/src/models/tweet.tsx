import { User } from "./user";

export type Tweet = {
  id: string;
  userId: string;
  content: string;
  replyTo: string | null;
  date: number;
  nextTweetId?: string;
};
export type RenderedTweet = Omit<Tweet, "userId"> & { user: User };
