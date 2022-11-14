export enum ActionType {
  TWEET,
  REPLY,
  OPEN,
}
export type Action = {
  performedAt: number;
  actionType: ActionType;
  userId: string;
  tweetId?: string;
};
