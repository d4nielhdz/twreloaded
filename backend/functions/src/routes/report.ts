import * as express from "express";
import { verifyToken } from "../middleware/auth";
import { ActionRepository } from "../repositories/action";
import { ReportRepository } from "../repositories/report";
import { TweetRepository } from "../repositories/tweet";
import { UserRepository } from "../repositories/user";
const router = express.Router();

const ONE_DAY = 86400000;

router.get("/", verifyToken, async (req, res) => {
  const { dateStart } = req.body;
  const dateEnd = dateStart + ONE_DAY;
  const reportRepo = new ReportRepository(
    UserRepository.getInstance(),
    TweetRepository.getInstance(),
    ActionRepository.getInstance()
  );
  const report = await reportRepo.createReport(dateStart, dateEnd);
  res.status(200).send(JSON.stringify(report));
});

module.exports = router;
