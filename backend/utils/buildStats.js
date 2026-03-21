import tagCounts from "../tag_counts.json" with { type: "json" };
import { tagToCategory, categoryColors } from "./tagMapping.js";

export const buildCategoryStats = (submissions) => {
  const solvedSet = new Set();

  const categorySolved = {};
  const categoryTotal = {};

  // initialize
  Object.values(tagToCategory).forEach(cat => {
    categorySolved[cat] = 0;
    categoryTotal[cat] = 0;
  });

  // ✅ Step A: compute TOTAL per category
  Object.entries(tagCounts).forEach(([tag, count]) => {
    const category = tagToCategory[tag];
    if (category) {
      categoryTotal[category] += count;
    }
  });

  // ✅ Step B: compute SOLVED per category
  submissions.forEach((sub) => {
    if (
      sub.verdict === "OK" &&
      sub.problem &&
      sub.problem.index
    ) {
      const problemId = `${sub.problem.contestId || sub.problem.problemsetName}-${sub.problem.index}`;

      if (!solvedSet.has(problemId)) {
        solvedSet.add(problemId);

        const tags = sub.problem.tags || [];

        tags.forEach(tag => {
          const category = tagToCategory[tag];
          if (category) {
            categorySolved[category] += 1;
          }
        });
      }
    }
  });

  // ✅ Step C: format output
  const categories = Object.keys(categorySolved).map(cat => ({
    name: cat,
    solved: categorySolved[cat],
    total: categoryTotal[cat],
    color: categoryColors[cat],
  }));

  return categories;
};