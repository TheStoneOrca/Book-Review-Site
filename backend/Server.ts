import express from "express";
import dotenv from "dotenv";
import JWT from "jsonwebtoken";
import pg from "pg";
import axios, { isAxiosError } from "axios";
import bcrypt from "bcrypt";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const db = new pg.Client({
  connectionString: process.env.DB_URL,
});

db.connect()
  .then(() => console.log("Connected to database!"))
  .catch((err) => {
    console.log(err);
  });

app.get("/signup", async (req, res) => {
  try {
    const user: { username: string; password: string } = req.body;

    const checkUser = await db.query(
      "SELECT * FROM users WHERE username = $1",
      [user.username]
    );

    if (checkUser.rows.length > 0) {
      return res.json("Username already registered!").status(401);
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);

    const createdUser = await db.query(
      "INSERT INTO users(username, password) VALUES($1, $2) RETURNING *",
      [user.username, hashedPassword]
    );

    return res.json({
      jwt: JWT.sign(createdUser.rows[0], process.env.JWT_SECRET as string),
    });
  } catch (error) {
    console.error(error);
    return res.status(500);
  }
});

app.get("/signin", async (req, res) => {
  try {
    const user: { username: string; password: string } = req.body;

    const checkUser = await db.query(
      "SELECT * FROM users WHERE username = $1",
      [user.username]
    );

    if (checkUser.rows.length === 0) {
      return res.json("User not found!").status(404);
    }

    const isPassword = await bcrypt.compare(
      user.password,
      checkUser.rows[0].password
    );

    if (isPassword) {
      return res.json({
        jwt: JWT.sign(checkUser.rows[0], process.env.JWT_SECRET as string),
      });
    } else {
      return res.json("User not found!").status(404);
    }
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
