import React, { useEffect, useState } from 'react'
import CreateTweet from '../components/CreateTweet'
import Tweet from '../components/Tweet'
import { TweetModel } from '../models/tweet';
import { getTweetsFromFollowers, getTweetsFromUser } from '../services/tweets-service';

const HomeScreen = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [tweets, setTweets] = useState<TweetModel[]>([]);

  useEffect(() => {
    const getTweets = async () => {
      const data = await getTweetsFromFollowers() as TweetModel[];
      setTweets(data);
    }
    getTweets().catch(console.error);
    setLoading(false);
  }, []);

  const onTweetCreated = (tweet: TweetModel) => {
    let updatedTweets = tweets;
    updatedTweets.push(tweet);
    setTweets(updatedTweets);
  }

  return (
    <div>
      <div>
        <CreateTweet onTweetCreated={(tweet:TweetModel) => onTweetCreated(tweet)} />
      </div>
      <div>
        {
          loading
            ? <div className="lds-ring blue"><div></div><div></div><div></div><div></div></div>
            : tweets.map((tweet, i) => <Tweet tweet={tweet} key={i} />)
        }
      </div>
    </div>
  )
}

export default HomeScreen