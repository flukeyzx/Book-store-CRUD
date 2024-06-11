import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { PORT, connectionString } from "./config.js";
import booksRouter from "./routes/book.route.js";

const app = express();

app.use(express.json());

app.use(cors({
  origin: "https://book-store-crud.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
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
