import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import CreateTweet from '../components/CreateTweet';
import Loader from '../components/Loader';
import Tweet from '../components/Tweet'
import { TweetModel } from '../models/tweet';
import { getTweetAndReplies } from '../services/tweets-service';

const TweetScreen = () => {
  const { id } = useParams();
  const [tweet, setTweet] = useState<TweetModel>();
  const [replies, setReplies] = useState<TweetModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getTweets = async () => {
      const data = await getTweetAndReplies(id!);
      setTweet(data.tweet);
      setReplies(data.replies);
      setLoading(false);
    }
    getTweets().catch(console.error);
  }, [id]);

  const onTweetCreated = (reply: TweetModel) => {
    let updatedReplies = [...replies];
    updatedReplies.push(reply);
    setReplies(updatedReplies);
  }
  
  return (
    loading ? <Loader />:
    <div>
      <Tweet tweet={tweet!} />

      <CreateTweet onTweetCreated={onTweetCreated} replyTo={tweet!.id} />

      <div>
        { replies.map(reply => <Tweet tweet={reply} />) }
      </div>
    </div>
  )
}

export default TweetScreen