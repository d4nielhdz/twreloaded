import * as admin from 'firebase-admin';
import * as express from 'express';
import { Tweet } from '../models/tweet';
import { verifyToken } from '../middleware/auth';
import { User } from '../models/user';

const router = express.Router();
const db = admin.firestore();

// Create a new tweet
router.post('/', verifyToken, async (req, res) => {
    const tweet = req.body as Tweet;
    let newTweet = await db.collection("tweets").add({
        userId: tweet.user.id,
        content: tweet.content,
        replyTo: tweet.replyTo ?? null,
        date: Date.now()
    });
    res.status(201).send(newTweet.id);
});

// Get last 10 tweets from one user
router.get('/user/:user_id', async (req, res) => {
    const userId = req.params.user_id;
    // SE NECESITA UN INDEX PARA EL ORDER BY
    // let snapshot = await db.collection("tweets").where("userId", "==", userId).orderBy("date", "desc").limit(10).get();
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

    res.status(200).send(JSON.stringify(tweets));
});

// Get last 10 tweets from users that a user follows
router.get('/followers', verifyToken, async (req, res) => {
    const authUserId = req.authUserId;
    
    let userSnapshot = await db.collection("users").doc(authUserId).get();
    let userData = userSnapshot.data()!;
    let followedUsersIds = userData.followedUsers ?? [];

    let followedUsersSnapshot = await db.collection("users").where(admin.firestore.FieldPath.documentId(), "in", followedUsersIds).get();
    let followedUsers: User[] = [];

    followedUsers.push({ id: userSnapshot.id, email: userData.email, username: userData.username  });

    followedUsersSnapshot.forEach(user => {
        let data = user.data();
        followedUsers.push({ 
            id: user.id, 
            email: data.email, 
            username: data.username 
        });
    });

    // NECESITA UN INDEX
    // let snapshot = await db.collection("tweets").where("userId", "in", followedUsers).where("replyTo", "==", "null").orderBy("date", "desc").limit(10).get();
    let snapshot = await db.collection("tweets").where("userId", "in", followedUsersIds).limit(10).get();

    let tweets : any[] = [];

    snapshot.forEach(tweet => {
        let data = tweet.data();
        let user = followedUsers.find(u => u.id == data.userId);
        
        tweets.push({
            id: tweet.id,
            user: user!,
            content: data.content,
            replyTo: data.replyTo,
            date: data.date,
        });
    });

    res.status(200).send(JSON.stringify(tweets));
});

module.exports = router;