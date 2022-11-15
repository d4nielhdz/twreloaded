import * as express from "express";
import { verifyToken } from "../middleware/auth";
import { TweetRepository } from "../repositories/tweet";

const router = express.Router();

// Create a new tweet
router.post("/", verifyToken, async (req, res) => {
  const tweet = req.body;
  let newTweet = await TweetRepository.saveTweet({
    userId: tweet.user.id,
    content: tweet.content,
    replyTo: tweet.replyTo ?? null,
    date: Date.now(),
  });
  res.status(201).send(newTweet.id);
});

// Get last 10 tweets from one user
router.get("/user/:user_id", async (req, res) => {
  const userId = req.params.user_id;
  const tweets = await TweetRepository.getTweetsByUserId(userId);

  res.status(200).send(JSON.stringify(tweets));
});

// Get last 10 tweets from users that a user follows
router.get("/followers", verifyToken, async (req, res) => {
  const authUserId = req.authUserId;
  const tweets = await TweetRepository.getFollowedUsersTweets(authUserId);

  res.status(200).send(JSON.stringify(tweets));
});

// Get a tweets and its replies
router.get("/:id", async (req, res) => {
  const tweetWithReplies = await TweetRepository.getTweetWithRepliesById(
    req.params.id
  );
  res.status(200).send(JSON.stringify(tweetWithReplies));
});

module.exports = router;
