import { spawn } from "child_process";
import fs from "fs";
import { parseCFOutput } from "../utils/parseOutput.js";
import generateRoadmap from "../utils/generateRoadMap.js";

export const handleTest3 = async (req, res) => {
  try {
    console.log("Called test 3");
    console.log(req.body);

    const python = spawn("python", ["./scripts/script1.py"]);

    let output = "";

    python.stdin.write(JSON.stringify(req.body));
    python.stdin.end();

    python.stdout.on("data", (data) => {
      output += data.toString();
    });

    python.stderr.on("data", (data) => {
      console.error("Python error:", data.toString());
    });

    python.on("close", async () => {
      
         try {
    console.log(output.trim())
    const op = parseCFOutput(output.trim())
    console.log(process.cwd());
    fs.writeFileSync(
    "problems.json",
    JSON.stringify(op, null, 2),
    "utf-8"
    );
    await generateRoadmap(req.body.numDays,req.body.numProblems);
    return res.json(output.trim());
  } catch (e) {
    console.log(e);
    return res.json({ raw: output });
  }
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};