import axios from "axios";

export const refreshSolved = async (req, res) => {
  try {

    const { handle, roadmap } = req.body;

    const response = await axios.get(
      `https://codeforces.com/api/user.status?handle=${handle}&count=200`
    );

    const submissions = response.data.result;

    const solvedSet = new Set();

    submissions.forEach(sub => {
      if (sub.verdict === "OK") {
        const key = `${sub.problem.contestId}-${sub.problem.index}`;
        solvedSet.add(key);
      }
    });

    const updatedRoadmap = roadmap.map(day => ({
      ...day,
      problems: day.problems.map(p => {

        //const match = p.link.match(/contest\/(\d+)\/problem\/([A-Z0-9]+)/);

        const match = p.link.match(/problem\/(\d+)\/([A-Z0-9]+)/);
        
        if (!match) return p;

        const key = `${match[1]}-${match[2]}`;

        return {
          ...p,
          solved: solvedSet.has(key)
        };

      })
    }));

    res.json(updatedRoadmap);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to refresh solved problems" });
  }
};