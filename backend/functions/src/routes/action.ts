import * as express from "express";
import { verifyToken } from "../middleware/auth";
import { ActionType } from "../models/action";
import { ActionRepository } from "../repositories/action";
const router = express.Router();

router.post("/logOpen", verifyToken, async (req, res) => {
  const userId = req.body.userId;
  await ActionRepository.saveAction({
    performedAt: Date.now(),
    userId,
    actionType: ActionType.OPEN_APP,
  });
  res.status(201).send(true);
});

module.exports = router;
