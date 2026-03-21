import fs from "fs";

const generateRoadmap = async (numDays,numProblems) => {
//   const numDays = 3;
const problemsPerDay = numProblems/numDays;

  // read input problems
  const problems = JSON.parse(fs.readFileSync("problems.json", "utf-8"));

  let cfProblems;

  // ✅ check cache first
  if (fs.existsSync("cf_cache.json")) {
    console.log("Using cached Codeforces data...");
    cfProblems = JSON.parse(fs.readFileSync("cf_cache.json", "utf-8"));
  } else {
    console.log("Fetching Codeforces data...");
    const res = await fetch("https://codeforces.com/api/problemset.problems");
    const data = await res.json();
    cfProblems = data.result.problems;

    // save cache
    fs.writeFileSync("cf_cache.json", JSON.stringify(cfProblems), "utf-8");
  }

  // create lookup map
  const problemMap = new Map();
  cfProblems.forEach(p => {
    const key = `${p.contestId}-${p.index}`;
    problemMap.set(key, p.name);
  });

  // helper: chunk array
  const chunkArray = (arr, size) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  };

  const chunks = chunkArray(problems, problemsPerDay);

  const roadmap = chunks.slice(0, numDays).map((chunk, i) => ({
    day: i + 1,
    theme: `Day ${i + 1}`,
    problems: chunk.map(p => {
      const key = `${p.contestId}-${p.index}`;
      return {
        title: problemMap.get(key) || key,
        link: p.link,
        platform: "CF",
        solved: false
      };
    })
  }));

  // write output
  fs.writeFileSync(
    "roadmap.json",
    JSON.stringify(roadmap, null, 2),
    "utf-8"
  );

  console.log("Roadmap generated!");
};

export default generateRoadmap;