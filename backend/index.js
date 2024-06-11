import express from "express";
import mongoose from "mongoose";
import { PORT, connectionString } from "./config.js";
import booksRouter from "./routes/book.route.js";

const cors = require("cors");

const app = express();

app.use(express.json());

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

mongoose
  .connect(connectionString)
  .then(() => {
    console.log("Connection successfully");
    app.listen(PORT, () => {
      console.log(`App is listening on the port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Connection failed", err);
  });

app.use("/books", booksRouter);
