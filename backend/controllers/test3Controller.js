import { spawn } from "child_process";

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

    python.on("close", () => {
      
         try {
    
    return res.json(output.trim());
  } catch (e) {
    console.log("RAW OUTPUT:", output);
    return res.json({ raw: output });
  }
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};