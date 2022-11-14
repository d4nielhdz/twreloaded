export type Tweet = {
  id: string;
  userId: string;
  content: string;
  replyTo: string | null;
  date: number;
  nextTweetId?: string;
};
