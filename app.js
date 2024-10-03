const express = require("express");
const dotenv = require("dotenv");
const dbConnect = require("./server/models/dbConnect");
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();
app.use(bodyParser.json());
const port = process.env.PORT;
const packageRoutes = require("./server/routes/packagesRoutes");
app.get("/", (req, res) => {
  return res.send("<h1>Hello World</h1>");
});

app.use("/api/v1/packages", packageRoutes);

/**
 * Db connection
 */
dbConnect();
app.listen(port, (req, res) => {
  console.log(`Server is runnning at ${port}`);
});
