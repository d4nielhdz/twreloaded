import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import cors = require('cors');

var serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
    projectId: 'twreloaded-cc2cf',
  credential: admin.credential.cert(serviceAccount)
});

const app = express();
app.use(cors({ origin: true }));

// ROUTES
const usersRoute = require('./routes/users');
const tweetsRoute = require('./routes/tweets');
app.use('/users', usersRoute);
app.use('/tweets', tweetsRoute);

app.get('/', (req, res) => {
    return res.status(200).send("Hola");
});


exports.api = functions.https.onRequest(app);