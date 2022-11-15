export enum ActionType {
  TWEET,
  REPLY,
  OPEN_APP,
}
export type Action = {
  performedAt: number;
  actionType: ActionType;
  userId: string;
  tweetId?: string;
};
