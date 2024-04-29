import express from "express";
import dotenv from "dotenv";
import JWT from "jsonwebtoken";
import pg from "pg";
import axios, { isAxiosError } from "axios";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const db = new pg.Client({
  connectionString: process.env.DB_URL,
});

db.connect().then(() => console.log("Connected to database!"));

app.get("/signup", async (req, res) => {
  try {
  } catch (error) {
    console.error(error);
    return res.status(500);
  }
});

app.get("/signin", async (req, res) => {
  try {
  } catch (error) {
    console.error(error);
    return res.status(500);
  }
});

app.get("/books", async (req, res) => {
  try {
    if (req.query.q) {
      const bookData = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${req.query.q}`
      );
      return res.json({ books: bookData.data });
    } else {
      return res.json(JSON.stringify({ error: "No query found!" })).status(400);
    }
  } catch (error) {
    console.error(error);
    return res.status(500);
  }
});

app.get("/book/:id", async (req, res) => {
  try {
    const bookData = await axios.get(
      `https://www.googleapis.com/books/v1/volumes/${req.params.id}`
    );
    return res.json({ books: bookData.data });
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error.response?.status);
      if (error.response?.status == 503) {
        return res.json("Book is not found!").status(404);
      }
    }
    console.error(error);
    return res.status(500);
  }
});

app.listen(port);
