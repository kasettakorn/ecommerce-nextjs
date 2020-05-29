import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";

const { DB_USERNAME, DB_PASSWORD, DB_NAME, PORT } = process.env;

// คำสั่งเชื่อม MongoDB Atlas
var mongo_uri = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@clusterdb-ttkwc.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
mongoose.Promise = global.Promise;

mongoose
  .connect(mongo_uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(
    () => {
      console.log("[success] task 2 : connected to the database ");
    },
    (error) => {
      console.log("[failed] task 2 " + error);
      process.exit();
    }
  );

var app = express();

app.use(cors());

// คำสั่งสำหรับแปลงค่า JSON ให้สามารถดึงและส่งค่าไปยัง MongoDB Atlas ได้
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.status(200).send("หน้าแรกของ api express");
});

//Product Router
var Product = require("./route/productRouter");
app.use("/api/product", Product);

app.use((req, res, next) => {
  var err = new Error("ไม่พบ path ที่คุณต้องการ");
  err.status = 404;
  next(err);
});
