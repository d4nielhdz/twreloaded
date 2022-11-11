
import { TweetModel } from '../models/tweet';
import { User } from '../models/user';
import { getAuthConfig } from './auth-service';
import axios from './axios';

export const postTweet = async (tweet: TweetModel) => {
    try {
        let config = await getAuthConfig();
        const response = await axios.post(`/tweets/`, tweet, config);
        tweet.id = response.data;
        return tweet;
    } catch (e) {
        console.log(e);
        throw e;
    }
}

export const getTweetsFromUser = async (user: User) => {
    try {
        let response = await axios.get(`/tweets/user/${user.id}`);
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

export const getTweetsFromFollowers = async () => {
    try {
        let config = await getAuthConfig();
        let response = await axios.get(`/tweets/followers`, config);
        let tweetData = response.data;
        let tweets : TweetModel[] = [];
        tweetData.forEach((tweet: TweetModel) => {
            tweets.push({
                id: tweet.id,
                user: tweet.user,
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

export const getTweetAndReplies = async (id: string) => {
    try {
        let response = await axios.get(`/tweets/${id}`);
        let tweetData = response.data;
        return tweetData;
    } catch (e) {
        console.log(e);
        throw e;
    }
}