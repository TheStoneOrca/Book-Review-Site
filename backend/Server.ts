import express from "express";
import dotenv from "dotenv";
import JWT from "jsonwebtoken";
import pg from "pg";
import axios from "axios";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const db = new pg.Client({
  host: "localhost",
  port: 5432,
  database: "booksite",
  user: "postgres",
  password: process.env.DB_PASSWORD,
});

db.connect().then(() => console.log("Connected to database!"));

app.get("/books", async (req, res) => {
  try {
    if (req.query.q) {
      const bookData = await axios.get(
        `https://openlibrary.org/search.json?q="${req.query.q}"`
      );
      console.log(bookData.data);
      return res.json({ books: bookData.data });
    } else {
      return res.json(JSON.stringify({ error: "No query" }));
    }
  } catch (error) {
    console.error(error);
    return res.status(500);
  }
});

app.listen(port);
