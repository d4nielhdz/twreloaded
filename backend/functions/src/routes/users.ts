import * as admin from 'firebase-admin';
import { User } from '../models/user';
import * as express from 'express';

const router = express.Router();
const db = admin.firestore();

// Get one user by username
router.get('/username/:username', async (req, res) => {
    const snapshot = await db.collection('users').where("username", "==", req.params.username).get();
    const userResponse = snapshot.docs[0];
    const userData = userResponse.data();
    res.status(200).send(JSON.stringify({
        id: userResponse.id,
        email: userData.email,
        username: userData.username,
    }));
});

// Find users by username (username starts with the query)
router.get('/search', async (req, res) => {
    let query = req.query.query;
    const snapshot = await db.collection('users').orderBy('username').startAt(query).endAt(query+'\uf8ff').get();
    let users: User[] = [];

    snapshot.forEach((user) => {
        let data = user.data();
        users.push({
            id: user.id,
            email: data.email,
            username: data.username
        });
    });
    return res.status(200).send(JSON.stringify(users));
});

// Get user by id
router.get('/:id', async (req, res) => {
    const snapshot = await db.collection('users').doc(req.params.id).get();
    const userId = snapshot.id;
    const userData = snapshot.data();
    res.status(200).send(JSON.stringify({ id: userId, ...userData }));
});


// Create a new user
router.post('/', async (req, res) => {
    const user = req.body;

    const snapshot = await db.collection('users').where("username", "==", user.username).get();
    
    if (snapshot.empty) {
        await db.collection("users").doc(user.id).set({
            email: user.email,
            username: user.username
        });
        res.status(201).send();
    } else {
        res.status(409).send(JSON.stringify({ message: 'Username already in use.' }))
    }
});

// Update a user
router.put('/:id', async (req, res) => {
    const user = req.body;

    const snapshot = await db.collection('users').where("username", "==", user.username).get();
    
    if (snapshot.empty) {
        await db.collection('users').doc(req.params.id).update({ ...user });
        res.status(200).send();
    } else {
        res.status(409).send(JSON.stringify({ message: 'Username already in use.' }))
    }
});

// Delete a user
router.delete('/:id', async (req, res) => {
    await db.collection('users').doc(req.params.id).delete();
    res.status(200).send();
});

module.exports = router;