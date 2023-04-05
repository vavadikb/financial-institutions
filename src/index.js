import express from "express";
import authRouter from "./routes/authRouter.js";
import offerRouter from "./routes/offersRouter.js";
import { pool } from "./dbConnection.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use("/auth", authRouter);
app.use("/", offerRouter);

const startServer = async () => {
  try {
    console.log("index.js started");
    await pool.connect().then(() => {
      console.log("DB connected");
      app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
      });
    });
  } catch (e) {
    console.log(e);
  }
};
startServer();
