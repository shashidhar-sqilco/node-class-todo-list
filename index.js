const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const routes = require("./routes/UserRoutes");
const bodyParser = require("body-parser");
dotenv.config();

const app = express();

app.use(bodyParser.json());
const port = process.env.PORT;

app.use("/api", routes);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.log("Error connecting to the Database", error);
  });

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
