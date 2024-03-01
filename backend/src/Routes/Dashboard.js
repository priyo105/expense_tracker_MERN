const express = require("express");
const app = express.Router();
const mongoose = require("mongoose");

const { Expense } = require("../Models/Expense.js");
const {
  startOfMonth,
  startOfWeek,
  endOfWeek,
  endOfMonth,
} = require("date-fns");

app.get("/getMontlyData", async (req, res) => {
  // weekly or Monthly
  const now = new Date();
  if (req.query.dateRange == "Weekly") {
    var firstDayOfMonth = startOfWeek(now);
    var lastDayOfMonth = endOfWeek(now);
  } else {
    firstDayOfMonth = startOfMonth(now);
    lastDayOfMonth = endOfMonth(now);
  }

  console.log(req.query.userId);

  //query
  const result = await Expense.aggregate([
    {
      $lookup: {
        from: "categories", //joining with categories
        localField: "category",
        foreignField: "_id",
        as: "category",
      },
    },
    {
      $match: {
        //where condition
        "category.name": req.query.category,
        userId: new mongoose.Types.ObjectId(req.query.userId),
        userSpentDate: {
          $gte: firstDayOfMonth,
          $lt: lastDayOfMonth,
        },
      },
    },

    {
      $group: {
        _id: null,
        totalSpending: { $sum: "$Amount" }, //sum by Amount
      },
    },
  ]);

  if (result) {
    res.status(200).send(result);
  } else {
    res.status(404).send({ message: "Not Found" });
  }
});

app.get("/getMonthlyIncome", async (req, res) => {
  // weekly or Monthly
  const now = new Date();
  if (req.query.dateRange == "Weekly") {
    var firstDayOfMonth = startOfWeek(now);
    var lastDayOfMonth = endOfWeek(now);
  } else {
    firstDayOfMonth = startOfMonth(now);
    lastDayOfMonth = endOfMonth(now);
  }

  console.log(req.query.userId);

  //query
  const result = await Expense.aggregate([
    {
      $match: {
        //where condition
        userId: new mongoose.Types.ObjectId(req.query.userId),
        isIncome: true,
        userSpentDate: {
          $gte: firstDayOfMonth,
          $lt: lastDayOfMonth,
        },
      },
    },

    {
      $group: {
        _id: null,
        totalIncome: { $sum: "$Amount" }, //sum by Amount
      },
    },
  ]);

  if (result) {
    res.status(200).send(result);
  } else {
    res.status(404).send({ message: "Not Found" });
  }
});

app.get("/getMonthlyExpenses", async (req, res) => {
  // weekly or Monthly
  const now = new Date();
  if (req.query.dateRange == "Weekly") {
    var firstDayOfMonth = startOfWeek(now);
    var lastDayOfMonth = endOfWeek(now);
  } else {
    firstDayOfMonth = startOfMonth(now);
    lastDayOfMonth = endOfMonth(now);
  }

  console.log(req.query.userId);
  //query
  const result = await Expense.aggregate([
    {
      $match: {
        //where condition
        userId: new mongoose.Types.ObjectId(req.query.userId),
        isIncome: false,
        userSpentDate: {
          $gte: firstDayOfMonth,
          $lt: lastDayOfMonth,
        },
      },
    },

    {
      $group: {
        _id: null,
        totalExpenses: { $sum: "$Amount" }, //sum by Amount
      },
    },
  ]);

  if (result) {
    res.status(200).send(result);
  } else {
    res.status(404).send({ message: "Not Found" });
  }
});

module.exports = app;
