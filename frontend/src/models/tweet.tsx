import { User } from "./user";

export type TweetModel = {
    id: string,
    user: User,
    content: string,
    replyTo: string | null,
}