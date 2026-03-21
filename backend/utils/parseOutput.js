import fs from "fs";

export const parseCFOutput = (str) => {
  const lines = str.trim().split("\n");
  lines.shift(); // remove header

  return lines.map(line => {
    const [contestId, index, score] = line.trim().split(/\s+/);

    return {
      contestId,
      index,
    //   score: Number(score),
      link: `https://codeforces.com/problemset/problem/${contestId}/${index}`
    };
  });
};