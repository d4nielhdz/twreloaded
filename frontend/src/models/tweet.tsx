import { User } from "./user";

export type TweetModel = {
    id: string | undefined,
    user: User,
    content: string,
    replyTo: string | null,
}