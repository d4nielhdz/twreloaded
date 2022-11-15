import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CreateTweet from "../components/CreateTweet";
import Loader from "../components/Loader";
import Tweet from "../components/Tweet";
import { RenderedTweet } from "../models/tweet";
import { getTweetAndReplies } from "../services/tweets-service";

const TweetScreen = () => {
  const { id } = useParams();
  const [tweet, setTweet] = useState<RenderedTweet>();
  const [replies, setReplies] = useState<RenderedTweet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getTweets = async () => {
      setLoading(true);
      const data = await getTweetAndReplies(id!);
      console.log(data);
      setTweet(data.tweet);
      setReplies(data.replies);
      setLoading(false);
    };
    getTweets().catch(console.error);
  }, [id]);

  const onTweetCreated = (reply: RenderedTweet) => {
    let updatedReplies = [...replies];
    updatedReplies.push(reply);
    setReplies(updatedReplies);
  };

  return loading ? (
    <Loader />
  ) : (
    <div>
      <Tweet tweet={tweet!} />

      <CreateTweet onTweetCreated={onTweetCreated} replyTo={tweet!.id} />

      <div>
        {replies.map((reply) => (
          <Tweet key={reply.id} tweet={reply} />
        ))}
      </div>
    </div>
  );
};

export default TweetScreen;
