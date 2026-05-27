const express = require("express");
const cors = require("cors");
const path = require("path");

const tapalRoutes = require("./routes/tapalRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  "/uploads",
  express.static(path.join(__dirname, "../src/uploads"))
);

app.use("/api/tapals", tapalRoutes);

module.exports = app;