import * as admin from 'firebase-admin';
import * as express from 'express';
import { verifyToken } from '../middleware/auth';

const router = express.Router();
const db = admin.firestore();

// Toggle follow on a user
router.post('/follow/:user_id', verifyToken, async (req, res) => {
    const authUserId = req.authUserId;
    const userId = req.params.user_id;
    let snapshot = await db.collection("users").doc(authUserId).get();
    let data = snapshot.data();
    if (!data) res.status(404);

    let followedUsers = data?.followedUsers ?? [];
    let index = followedUsers.indexOf(userId)
    if (index > -1) {
        followedUsers.splice(index, 1);
    } else {
        followedUsers.push(userId);
    }

    await db.collection("users").doc(authUserId).update({ followedUsers: followedUsers });

    res.status(201).send();
});

// // Reply to a tweet
// router.post('/reply/:tweet_id', async (req, res) => {
//     const authUserId = req.authUserId;
//     let tweet = req.body as Tweet;
    
// });

// Like a tweet

module.exports = router;