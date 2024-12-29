import express from "express";
const routes = express.Router();
import { collection } from "../database.js";

routes.get("/", async (req, res) => {
  const students = await collection.find().toArray();
  res.json(students);
});

routes.get("/:id", async (req, res) => {
  const id = req.params.id;
  const student = await collection.findOne({ _id: id });
  res.json(student);
});

routes.post("/", async (req, res) => {
  const student = req.body;
  const result = await collection.insertOne(student);
  res.status(201).json({ message: "Student created", result });
});

routes.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const result = await collection.deleteOne({ _id: id });
  res.json({ message: "Student deleted", result });
});

routes.put("/:id", async (req, res) => {
  const id = req.params.id;
  const student = req.body;
  const result = await collection.updateOne(
    { _id: id },
    {
      $set: {
        student,
      },
    }
  );
  res.json({ message: "Student Updated", result });
});

routes.p;

export default routes;
