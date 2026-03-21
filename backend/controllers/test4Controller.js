// src/controllers/testController.js
import axios from "axios";
import fs from "fs";
import { buildCategoryStats } from "../utils/buildStats.js";
export const handleTest4 = async (req, res) => {
  try {
    console.log("Called test 4");

    



   const data = JSON.parse(fs.readFileSync("roadmap.json", "utf-8"));
 
    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};