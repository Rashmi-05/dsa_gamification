import express from "express";
// import dotenv from "dotenv";
import cors from "cors";
// import { MongoClient, ObjectId } from "mongodb";
import testRoutes from "./routes/testRoutes.js";
//dotenv.config();

const app = express();
app.use(express.json());
 app.use(cors());
// const uri = process.env.MONGO_URI;
// const client = new MongoClient(uri);

// let db;



// Route to get todo items
app.get('/test', async (req, res) => {
  try {
   console.log("Called")

    return res.status(200).json("Hi");
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});
app.use("/", testRoutes);








const PORT = 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});