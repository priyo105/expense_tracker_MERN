const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const Auth = require("./middlewares/Auth.js");

const Category = require("./src/Routes/Category.js");
const Expense = require("./src/Routes/Expense.js");
const DashBoard = require("./src/Routes/Dashboard.js");
const Analytics = require("./src/Routes/Analytics.js");

require("dotenv/config");

const GoogleAuthinticate = require("./src/Routes/GoogleAuthinticate.js");
const GithubAuthinticate = require("./src/Routes/GithubAuthinticate.js");
const NormalAuthinticate = require("./src/Routes/NormalAuthinticate.js");

const corsOptions = {
  origin: "*",
};

app.use("/uploads", express.static("uploads"));

app.use(express.json());

// app.use(
//   cors({
//     origin: "https://wise-expensetracker.netlify.app",
//   })
// );
app.options("*", cors());

app.use(morgan("tiny"));
app.options("*", cors(corsOptions));

//Routes

app.use("/", NormalAuthinticate);
app.use("/", GoogleAuthinticate);
app.use("/", GithubAuthinticate);
app.use("/dashboard", DashBoard);

app.use(Auth);

app.use("", Category);
app.use("", Expense);
app.use("/analytics", Analytics);
app.get("/test", (req, res) => {
  res.send({
    data: "sdasdasd",
  });
});

//connecting to DB
const uri = process.env.CONNECTION_STRING;
mongoose
  .connect(uri)
  .then(() => console.log("connected to DB"))
  .catch((e) => console.log(e));

//listening to post
app.listen(8912, () => {
  console.log("Listening to PORT 5000");
});
