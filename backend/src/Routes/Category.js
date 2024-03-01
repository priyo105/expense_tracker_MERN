const express = require("express");
const app = express.Router();
const multer = require("multer")


const { Category } = require("../Models/Category.js");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/")
  },
  filename: (req, file, cb) => {
    cb(null,file.originalname)
  },
})


app.post("/category/v1/create", async (req, res) => {
  let category = new Category(req.body);
  await category
    .save()
    .then(() => {
      res.status(201).send({ message: " Category Created" });
    })
    .catch((e) => res.send(e));
});

app.get("/category/all", async (req, res) => {
  let category = await Category.find({isIncomeSource:false}).catch((e) =>
    res.status(500).send(e)
  );

  if (category) {
    res.status(200).send(category);
  } else {
    res.status(404).send({ message: "No categories exists !" });
  }
});


app.get("/category/salary", async (req, res) => {
  let category = await Category.find({isIncomeSource:true}).catch((e) =>
    res.status(500).send(e)
  );

  if (category) {
    res.status(200).send(category);
  } else {
    res.status(404).send({ message: "No categories exists !" });
  }
});


const uploadStorage = multer({ storage: storage })
// Single file
app.post("/upload/single", uploadStorage.single("file"), (req, res) => {
  console.log(req.file)
  return res.send("Single file")
})

module.exports = app;
