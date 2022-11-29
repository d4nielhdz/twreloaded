import * as express from "express";
import { verifyToken } from "../middleware/auth";
import { ActionRepository } from "../repositories/action";
import { ReportRepository } from "../repositories/report";
import { TweetRepository } from "../repositories/tweet";
import { UserRepository } from "../repositories/user";
const router = express.Router();

const ONE_DAY = 86400000;

router.get("/:dateStart", verifyToken, async (req, res) => {
  console.log(req.params);
  const { dateStart } = req.params;
  const ds = parseInt(dateStart);
  const dateEnd = ds + ONE_DAY * 7;
  const reportRepo = new ReportRepository(
    UserRepository.getInstance(),
    TweetRepository.getInstance(),
    ActionRepository.getInstance()
  );
  const report = await reportRepo.createReport(ds, dateEnd);
  res.status(200).send(JSON.stringify(report));
});

module.exports = router;
