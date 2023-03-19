import express from "express";
import router from "./routes/authRouter.js";
import { pool } from "./dbConnection.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use("/auth", router);

const startServer = async () => {
  try {
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
