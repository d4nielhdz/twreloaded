import React, { useEffect, useState } from "react";
import CreateTweet from "../components/CreateTweet";
import Loader from "../components/Loader";
import Tweet from "../components/Tweet";
import { RenderedTweet } from "../models/tweet";
import { getTweetsFromFollowers } from "../services/tweets-service";

const HomeScreen = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [tweets, setTweets] = useState<RenderedTweet[]>([]);

  useEffect(() => {
    const getTweets = async () => {
      const data = (await getTweetsFromFollowers()) as RenderedTweet[];
      setTweets(data);
      setLoading(false);
    };
    getTweets().catch(console.error);
  }, []);

  const onTweetCreated = (tweet: RenderedTweet) => {
    let updatedTweets = tweets;
    updatedTweets.unshift(tweet);
    setTweets(updatedTweets);
  };

  return (
    <div>
      <div>
        <CreateTweet
          onTweetCreated={(tweet: RenderedTweet) => onTweetCreated(tweet)}
        />
      </div>
      <div>
        {loading ? (
          <Loader />
        ) : (
          tweets.map((tweet, i) => <Tweet tweet={tweet} key={i} />)
        )}
      </div>
    </div>
  );
};

export default HomeScreen;
