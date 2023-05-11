import express from "express";
import authRouter from "./routes/authRouter.js";
import offerRouter from "./routes/offersRouter.js";
import assetsRouter from "./routes/assetsRouter.js";
import dealsRouter from "./routes/dealsRouter.js";
import balanceRouter from "./routes/balanceRouter.js";
import assetsOffersRouter from "./routes/assetsOffersRouter.js";
import usersRouter from "./routes/usersRouter.js";
import { pool } from "./dbConnection.js";
import { update } from "./cron/cron.js";
import { migration } from "./models/migration.js";
import ErrorHandler from "./middlewares/ErrorHandler.js";

import swaggerUi from "swagger-ui-express";

import swaggerDocument from "./swagger.json" assert { type: "json" };

const app = express();
const port = 3000;

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());
app.use(ErrorHandler);

app.use(
  "/",
  assetsRouter,
  offerRouter,
  dealsRouter,
  balanceRouter,
  assetsOffersRouter,
  usersRouter,
  authRouter
);

const startServer = async () => {
  try {
    console.log("index.js started");
    await pool
      .connect()
      .then(() => {
        console.log("DB connected");
        app.listen(port, () => {
          console.log(`Example app listening on port ${port}`);
        });
      })
      .then(() => {
        migration();
        
      });
  } catch (e) {
    console.log(e);
  }
};
startServer();
