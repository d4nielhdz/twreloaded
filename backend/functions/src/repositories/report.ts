import { ActionType } from "../models/action";
import { Report } from "../models/report";
import { ActionRepository } from "./action";
import { TweetRepository } from "./tweet";
import { UserRepository } from "./user";

export class ReportRepository {
  constructor(
    private userRepository: UserRepository,
    private tweetRepository: TweetRepository,
    private actionRepository: ActionRepository
  ) {}

  public createReport = async (
    dateStart: number,
    dateEnd: number
  ): Promise<Report> => {
    const actionCountByUserId: Map<string, number> = new Map();
    const replyCountByTweetId: Map<string, number> = new Map();
    let tweetsCreated = 0;
    let maxReplies = 0;
    let maxActions = 0;
    let userIdWithMaxActions = "";
    let tweetIdWithMaxReplies = "";
    const actions = await this.actionRepository.getActionsByDateRange(
      dateStart,
      dateEnd
    );

    for (const action of actions) {
      const { userId, actionType } = action;
      const count = (actionCountByUserId.get(userId) ?? 0) + 1;
      actionCountByUserId.set(userId, count);
      if (actionType === ActionType.REPLY) {
        const { tweetId } = action;
        const replyCount = (replyCountByTweetId.get(tweetId!) ?? 0) + 1;
        replyCountByTweetId.set(tweetId!, replyCount);
      } else if (actionType === ActionType.TWEET) {
        tweetsCreated++;
      }
    }
    for (const [userId, actionCount] of actionCountByUserId) {
      if (actionCount > maxActions) {
        maxActions = actionCount;
        userIdWithMaxActions = userId;
      }
    }
    for (const [tweetId, replyCount] of replyCountByTweetId) {
      if (replyCount > maxReplies) {
        tweetIdWithMaxReplies = tweetId;
      }
    }
    const userWithMostEvents = await this.userRepository.getUserById(
      userIdWithMaxActions
    );
    const tweetWithMostReplies = await this.tweetRepository.getTweetById(
      tweetIdWithMaxReplies
    );
    const numUsers = actionCountByUserId.size;

    return {
      date: dateStart,
      numUsers,
      tweetsCreated,
      tweetWithMostReplies,
      userWithMostEvents: {
        ...userWithMostEvents,
        numEvents: maxActions,
      },
    };
  };
}
