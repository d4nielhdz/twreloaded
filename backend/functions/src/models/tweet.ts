import { User } from "./user"

export type Tweet = {
    id: string,
    user: User,
    content: string,
    replyTo: string | null,
    date: Date,
}