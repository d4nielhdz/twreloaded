import React, { useState } from "react";
import useUser from "../hooks/useUser";
import { RenderedTweet, Tweet } from "../models/tweet";
import { postTweet } from "../services/tweets-service";
import "../styles/tweet.scss";

const CreateTweet = ({
  onTweetCreated,
  replyTo,
}: {
  onTweetCreated: (tweet: RenderedTweet) => void;
  replyTo?: string;
}) => {
  const { user } = useUser();
  const [tweetContent, setTweetContent] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTweet: Tweet = await postTweet({
      id: "",
      userId: user!.id,
      content: tweetContent,
      replyTo: replyTo ?? null,
      date: Date.now(),
    });
    onTweetCreated({ ...newTweet, user: user! });
    setTweetContent("");
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <textarea
        value={tweetContent}
        onChange={(e) => setTweetContent(e.target.value)}
        placeholder={replyTo ? "Twittea tu respuesta" : "¿Qué está pasando?"}
        className="input-field w-100"
      />
      <div className="action">
        <input
          type="submit"
          value={replyTo ? "Responder" : "Tweetear"}
          className="btn main"
          disabled={tweetContent.length === 0}
        />
      </div>
    </form>
  );
};

export default CreateTweet;
