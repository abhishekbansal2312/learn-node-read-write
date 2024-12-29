import express from "express";
const routes = express.Router();
import { libraryCollection } from "../database.js";

routes.get("/", async (req, res) => {
  try {
    const books = await libraryCollection.find().toArray();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch books", error });
  }
});

routes.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const book = await libraryCollection.findOne({ _id: id });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch the book", error });
  }
});

routes.post("/", async (req, res) => {
  const book = req.body;
  try {
    const result = await libraryCollection.insertOne(book);
    res.status(201).json({ message: "Book added", result });
  } catch (error) {
    res.status(500).json({ message: "Failed to add book", error });
  }
});

routes.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await libraryCollection.deleteOne({ _id: id });
    res.json({ message: "Book deleted", result });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete book", error });
  }
});

routes.put("/:id", async (req, res) => {
  const id = req.params.id;
  const book = req.body;
  try {
    const result = await libraryCollection.updateOne(
      { _id: id },
      {
        $set: book,
      }
    );
    res.json({ message: "Book updated", result });
  } catch (error) {
    res.status(500).json({ message: "Failed to update book", error });
  }
});

export default routes;
