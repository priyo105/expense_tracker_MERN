const express = require("express");
const app = express.Router();
const mongoose = require("mongoose");

const { Expense } = require("../Models/Expense.js");
const {
  startOfMonth,
  startOfWeek,
  endOfWeek,
  endOfMonth,
  subMonths,
} = require("date-fns");

app.get("/getCategoryWiseData", async (req, res) => {
  // weekly or Monthly
  const now = new Date();
  if (req.query.dateRange == "Last Week") {
    var firstDayOfMonth = startOfWeek(now);
    var lastDayOfMonth = endOfWeek(now);
  } else if (req.query.dateRange == "This Month") {
    firstDayOfMonth = startOfMonth(now);
    lastDayOfMonth = endOfMonth(now);
  } else if (req.query.dateRange == "Last Month") {
    const lastMonthStartDate = subMonths(now, 1);

    firstDayOfMonth = startOfMonth(lastMonthStartDate);
    lastDayOfMonth = endOfMonth(firstDayOfMonth);
  } else if (req.query.dateRange == "Last 2 Months") {
    const lastMonthStartDate = subMonths(now, 2);

    firstDayOfMonth = startOfMonth(lastMonthStartDate);
    lastDayOfMonth = endOfMonth(now);
  } else if (req.query.dateRange == "Last 3 Months") {
    const lastMonthStartDate = subMonths(now, 3);

    firstDayOfMonth = startOfMonth(lastMonthStartDate);
    lastDayOfMonth = endOfMonth(now);
  } else if (req.query.dateRange == "Last 6 Months") {
    const lastMonthStartDate = subMonths(now, 6);

    firstDayOfMonth = startOfMonth(lastMonthStartDate);
    lastDayOfMonth = endOfMonth(now);
  } else if (req.query.dateRange == "Last 12 Months") {
    const lastMonthStartDate = subMonths(now, 12);

    firstDayOfMonth = startOfMonth(lastMonthStartDate);
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
        // "category.name": req.query.category,
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
        _id: { $arrayElemAt: ["$category.name", 0] }, // get the first element of the array
        totalSpending: { $sum: "$Amount" }, //sum by Amount
      },
    },

    {
      $project: {
        category: "$_id", // rename _id to category
        totalSpending: 1, // keep totalSpending field
      },
    },
  ]);

  if (result) {
    res.status(200).send(result);
  } else {
    res.status(404).send({ message: "Not Found" });
  }
});

app.get("/getCategoryWiseDataBar", async (req, res) => {
  // weekly or Monthly
  const now = new Date();
  if (req.query.dateRange == "Last Week") {
    var firstDayOfMonth = startOfWeek(now);
    var lastDayOfMonth = endOfWeek(now);
  } else if (req.query.dateRange == "This Month") {
    firstDayOfMonth = startOfMonth(now);
    lastDayOfMonth = endOfMonth(now);
  } else if (req.query.dateRange == "Last Month") {
    const lastMonthStartDate = subMonths(now, 1);

    firstDayOfMonth = startOfMonth(lastMonthStartDate);
    lastDayOfMonth = endOfMonth(firstDayOfMonth);
  } else if (req.query.dateRange == "Last 2 Months") {
    const lastMonthStartDate = subMonths(now, 2);

    firstDayOfMonth = startOfMonth(lastMonthStartDate);
    lastDayOfMonth = endOfMonth(now);
  } else if (req.query.dateRange == "Last 3 Months") {
    const lastMonthStartDate = subMonths(now, 3);

    firstDayOfMonth = startOfMonth(lastMonthStartDate);
    lastDayOfMonth = endOfMonth(now);
  } else if (req.query.dateRange == "Last 6 Months") {
    const lastMonthStartDate = subMonths(now, 6);

    firstDayOfMonth = startOfMonth(lastMonthStartDate);
    lastDayOfMonth = endOfMonth(now);
  } else if (req.query.dateRange == "Last 12 Months") {
    const lastMonthStartDate = subMonths(now, 12);

    firstDayOfMonth = startOfMonth(lastMonthStartDate);
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
        // "category.name": req.query.category,
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
        _id: { $arrayElemAt: ["$category.name", 0] }, // get the first element of the array
        totalSpending: { $sum: "$Amount" }, //sum by Amount
      },
    },

    {
      $project: {
        category: "$_id", // rename _id to category
        totalSpending: 1, // keep totalSpending field
      },
    },
  ]);

  if (result) {
    res.status(200).send(result);
  } else {
    res.status(404).send({ message: "Not Found" });
  }
});

app.get("/getMonthWiseData", async (req, res) => {
  //last 6 months worth of data
  const now = new Date();
  const sixMonthsAgo = new Date(now);
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6); // Subtract 6 months

  console.log(req.query.userId);

  //query
  const result = await Expense.aggregate([
    {
      $match: {
        //where condition
        // "category.name": req.query.category,
        userId: new mongoose.Types.ObjectId(req.query.userId),
        isIncome: false,
        userSpentDate: {
          $gte: sixMonthsAgo,
        },
      },
    },

    {
      $group: {
        _id: {
          year: { $year: "$userSpentDate" },
          month: { $month: "$userSpentDate" },
        }, // get the first element of the array
        totalSpending: { $sum: "$Amount" }, //sum by Amount
      },
    },

    {
      $sort: {
        "_id.year": 1,
        "_id.month": 1,
      },
    },
  ]);

  if (result) {
    res.status(200).send(result);
  } else {
    res.status(404).send({ message: "Not Found" });
  }
});

app.get("/getMonthWiseIncome", async (req, res) => {
  //last 6 months worth of data
  const now = new Date();
  const sixMonthsAgo = new Date(now);
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6); // Subtract 6 months

  console.log(req.query.userId);

  //query
  const result = await Expense.aggregate([
    {
      $match: {
        //where condition
        // "category.name": req.query.category,
        userId: new mongoose.Types.ObjectId(req.query.userId),
        isIncome: true,
        userSpentDate: {
          $gte: sixMonthsAgo,
        },
      },
    },

    {
      $group: {
        _id: {
          year: { $year: "$userSpentDate" },
          month: { $month: "$userSpentDate" },
        }, // get the first element of the array
        totalIncome: { $sum: "$Amount" }, //sum by Amount
      },
    },

    {
      $sort: {
        "_id.year": 1,
        "_id.month": 1,
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
