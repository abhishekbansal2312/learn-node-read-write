import express from "express";
import fs from "fs";
import getData from "../middleware/getData.js";

const routes = express.Router();

routes.get("/", getData, (req, res) => {
  res.json(req.data);
});

routes.get("/:id", getData, (req, res) => {
  const id = req.params.id;
  const item = req.data.find((item) => item.id === parseInt(id));

  if (!item) {
    res.status(404).send("Item not found");
  } else {
    res.json(item);
  }
});

routes.post("/", getData, (req, res) => {
  const newItem = req.body;
  req.data.push(newItem);

  fs.writeFile("./data.json", JSON.stringify(req.data), "utf8", (err) => {
    if (err) {
      res.status(500).send("Error saving data");
    } else {
      res.json("Data saved");
    }
  });
});

routes.delete("/:id", getData, (req, res) => {
  const id = parseInt(req.params.id);

  const newData = req.data.filter((item) => item.id !== id);

  fs.writeFile("./data.json", JSON.stringify(newData), "utf8", (err) => {
    if (err) {
      res.status(500).send("Error saving data");
    } else {
      res.json({ message: "Data successfully deleted" });
    }
  });
});

routes.put("/:id", getData, (req, res) => {
  const id = parseInt(req.params.id);

  const updatedData = req.data.map((item) => {
    if (item.id === id) {
      return { ...item, ...req.body };
    }
    return item;
  });

  fs.writeFile("./data.json", JSON.stringify(updatedData), "utf8", (err) => {
    if (err) {
      res.status(500).send("Error saving data");
    } else {
      res.json({ message: "Data successfully updated" });
    }
  });
});

export default routes;
