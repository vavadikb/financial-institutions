const express = require("express");
const app = express();
const port = 3000;
const router = express.Router()

app.get("/", (req, res) => {
  res.send("You opend this by Docker");
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
