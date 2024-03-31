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

app.use(function (req, res, next) {
  // res.header("Access-Control-Allow-Origin", "*");
  const allowedOrigins = [
    "http://localhost:3000",
    "https://wise-expensetracker.netlify.app",
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-credentials", true);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
  next();
});

app.use(cors());
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
app.listen(5000, () => {
  console.log("Listening to PORT 5000");
});
