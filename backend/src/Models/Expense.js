const mongoose = require("mongoose");
const { Category } = require("./Category");

const ExpenseSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
    required: true,
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  Amount: {
    type: Number,
    reqired: true,
  },

  isIncome:{
    type:Boolean,
    required:true
  },

  userSpentDate: {
    type: Date,
    default: Date.now,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
});

exports.Expense = mongoose.model("expense", ExpenseSchema);
