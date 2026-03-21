// src/controllers/testController.js
import axios from "axios";
import { buildCategoryStats } from "../utils/buildStats.js";
export const handleTest2 = async (req, res) => {
  try {
    console.log("Called test 2");

    const platform = req.body.platform;
    const userId = req.body.userId;
    let data = {}
    data.username = userId;
    //console.log(data)
   const response = await axios.get(
      `https://codeforces.com/api/user.info?handles=${userId}`
    );
    const temp = response.data.result[0]
    data.rank = temp.rank
    data.rating = temp.rating
   const subRes = await axios.get(
  `https://codeforces.com/api/user.status?handle=${userId}&count=100000`
);

const submissions = subRes.data.result;

const categories = buildCategoryStats(submissions);
const solvedSet = new Set();

submissions.forEach((sub) => {
  if (
    sub.verdict === "OK" &&
    sub.problem &&
    sub.problem.index
  ) {
    const problemId = `${sub.problem.contestId || sub.problem.problemsetName}-${sub.problem.index}`;
    solvedSet.add(problemId);
  }
});

const count = solvedSet.size;

    data.totalSolved =count
    data.categories = categories
    data.handle = userId
    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};