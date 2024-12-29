import { MongoClient } from "mongodb";

import dotenv from "dotenv";
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const client = new MongoClient(MONGO_URI);

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to database");
  } catch (err) {
    console.error("Error connecting to database:", err);
    process.exit(1);
  }
}
export default connectToDatabase;

export const db = client.db("test");
export const studentCollection = db.collection("students");
export const libraryCollection = db.collection("library");
