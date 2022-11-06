import * as admin from 'firebase-admin';
import { Request, Response, NextFunction } from 'express';

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization;
        if (!token) return res.status(401).send("Missing token");
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.authUserId = decodedToken.uid; 
        next()
    } catch (error) {
        console.log(error);
        res.status(401).send(error);
    }
  }