const express = require("express");
const app = express.Router();

const { Expense } = require("../Models/Expense.js");

app.post("/expense/v1/create", async (req, res) => {
  let expense = new Expense(req.body);
  await expense
    .save()
    .then(() => {
      res.status(201).send({ message: " Expense Created" });
    })
    .catch((e) => res.send(e));
});

app.get("/expense/:id", async (req, res) => {
  let expense = await Expense.find({ userId: req.params.id }).catch((e) =>
    res.send(e)
  );

  if (expense) {
    res.status(200).send(expense);
  } else {
    res.status(404).send({ message: "Not Found" });
  }
});


app.get("/expenses",async(req,res)=>{

  let expense=await Expense.find({userId:req.query.userId}).populate('category').sort({userSpentDate:-1}); 

  if(expense){
    res.status(200).send(expense)
  }else{
    res.status(404).send({message:"Not Found"})
  }
})


app.get("/recentTransactions",async(req,res)=>{

  let expense=await Expense.find({userId:req.query.userId}).populate('category').sort({userSpentDate:-1}).limit(5); 
  if(expense){
    res.status(200).send(expense)
  }else{
    res.status(404).send({message:"Not Found"})
  }
})

module.exports = app;
