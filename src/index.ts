import express, { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import generateRoutes from "./routes/generate";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";

mongoose.connect("mongodb+srv://blackwinstech:uXtCZ9Bd6ZJtGKoX@blackwins-cluster.u9rwchf.mongodb.net/tamiltrends").then(() => console.log("DB connected successfully")).catch(err => console.log(err));

const PORT = 5000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use("/api/generate", generateRoutes)

app.get("/", (req: Request, res: Response) => {
  res.send("Hello TypeScript with Express!");
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
