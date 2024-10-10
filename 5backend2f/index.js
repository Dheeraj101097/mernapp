const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cors = require("cors");
const authrouter = require("./routes/AuthRouter.js");
const path = require("path");
require("dotenv").config();
require("./models/db.js");

const PORT = process.env.PORT || 8000;
app.get("/home", (req, res) => {
  res.send("Hello World");
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(cors());
app.use(bodyparser.json());

app.use("/auth", authrouter);

app.get("/employee", (req, res) => {
  res.render("form.ejs");
});

app.listen(PORT, () => {
  console.log(`listening ${PORT}`);
});
