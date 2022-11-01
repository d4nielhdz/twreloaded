import * as admin from 'firebase-admin';
import * as express from 'express';
import { Tweet } from '../models/tweet';

const router = express.Router();
const db = admin.firestore();

// Create a new tweet
router.post('/', async (req, res) => {
    const tweet = req.body as Tweet;
    await db.collection("tweets").add({
        userId: tweet.user.id,
        content: tweet.content,
        replyTo: tweet.replyTo ?? null,
        date: Date.now()
    });
    res.status(201).send();
});

// Get last 10 tweets from one user
router.get('/user/:user_id', async (req, res) => {
    const userId = req.params.user_id;
    let snapshot = await db.collection("tweets").where("userId", "==", userId).limit(10).get();
    let tweets : any[] = [];

    snapshot.forEach(tweet => {
        let data = tweet.data();
        tweets.push({
            id: tweet.id,
            content: data.content,
            replyTo: data.replyTo,
            date: data.date,
        });
    });

    res.status(201).send(JSON.stringify(tweets));
});

// Get last 10 tweets from users that a user follows


module.exports = router;