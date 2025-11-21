import express, { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import generateRoutes from "./routes/generate";

// mongoose.connect(process.env.MONGO_URI as string).then(() => console.log("DB connected successfully")).catch(err => console.log(err));

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

app.use("/api/generate", generateRoutes)

app.get("/", (req: Request, res: Response) => {
  res.send("Hello TypeScript with Express!");
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
