import { Tweet, RenderedTweet } from "../models/tweet";
import { User } from "../models/user";
import { getAuthConfig } from "./auth-service";
import axios from "./axios";

export const postTweet = async (tweet: Tweet) => {
  try {
    let config = await getAuthConfig();
    const response = await axios.post(`/tweets/`, tweet, config);
    tweet.id = response.data;
    return tweet;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const getTweetsFromUser = async (userId: string) => {
  try {
    let response = await axios.get(`/tweets/user/${userId}`);
    let tweetData = response.data;
    return tweetData as RenderedTweet[];
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const getTweetsFromFollowers = async () => {
  try {
    let config = await getAuthConfig();
    let response = await axios.get(`/tweets/followers`, config);
    let tweetData = response.data;
    return tweetData as RenderedTweet[];
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const getTweetAndReplies = async (id: string) => {
  try {
    let response = await axios.get(`/tweets/${id}`);
    let tweetData = response.data;
    return tweetData;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
