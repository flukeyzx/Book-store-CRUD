import express from "express";
import { Book } from "../models/book.model.js";

const router = express.Router();

// Route to create new book
router.post("/", async (req, res) => {
  try {
    const { title, author, publishYear } = req.body;
    if (!title || !author || !publishYear) {
      return res.status(400).send("Please fill all the fields");
    }
    const book = new Book({ title, author, publishYear });

    const savedBook = await book.save();

    return res.status(201).json({ success: true, savedBook });
  } catch (error) {
    console.log("Error", error.message);
    return res.status(500).send("something went wrong");
  }
});

// Route to get all books
router.get("/", async (_, res) => {
  try {
    const books = await Book.find();

    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log("Error: ", error.message);
    return res.status(500).send("something went wrong");
  }
});

// Route to get a specific book
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).send("Book not found");
    }

    return res.status(200).json(book);
  } catch (error) {
    console.log("Error", error.message);
    return res.status(500).send("something went wrong");
  }
});

// Route to update a book
router.put("/:id", async (req, res) => {
  try {
    let book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).send("Book not found");
    }

    book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });

    return res.status(200).json({ message: "success", book });
  } catch (error) {
    console.log("Error: ", error.message);
    return res.status(500).send("something went wrong");
  }
});

// Route to delete a book
router.delete("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).send("Book not found");
    }

    await book.deleteOne();

    return res.status(200).send("Book deleted successfully");
  } catch (error) {
    console.log("Error: ", error.message);
    return res.status(500).send("something went wrong");
  }
});

export default router;
