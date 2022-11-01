import axios from 'axios';
import { TweetModel } from '../models/tweet';
import { User } from '../models/user';

const baseUrl = 'http://127.0.0.1:5001/twreloaded-cc2cf/us-central1/api';

export const getTweetsFromUser = async (user: User) => {
    try {
        let response = await axios.get(`${baseUrl}/tweets/user/${user.id}`);
        let tweetData = response.data;
        let tweets : TweetModel[] = [];
        tweetData.forEach((tweet: { id: any; content: any; replyTo: any; }) => {
            tweets.push({
                id: tweet.id,
                user: user,
                content: tweet.content,
                replyTo: tweet.replyTo,
            });
        });
        return tweets;
    } catch (e) {
        console.log(e);
        throw e;
    }
}