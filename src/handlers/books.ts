import express, { Request, Response } from "express";
import { Book, BookStore } from "../models/books";
import Jwt  from "jsonwebtoken";
import { verifyAuthToken } from "./user";

const store = new BookStore();
const index = async (req: Request, res: Response) => {
  const books = await store.index();
  res.json(books);
};
const create = async (req: Request, res: Response) => {
  const book: Book = {
    title: req.body.title,
    total_pages: req.body.total_pages,
    author: req.body.author,
    type: req.body.type,
    summary: req.body.summary,
  };
  try {
    Jwt.verify(req.body.token, process.env.TOKEN_SECRET);
  } catch (err) {
    res.status(401);
    res.json(`invalid token ${err}`);
    return;
  }
  try {
    const newBook = await store.create(book);
    res.json(newBook);
  } catch (err) {
    res.status(401);
    res.json(`invalid token ${err}`);
  }

};

const show = async (req: Request, res: Response) => {
  const book = await store.show(req.params.id);
  res.json(book);
};

const update = async (req: Request, res: Response) => {
  const book = await store.update(
    req.params.id,
    req.body.title,
    req.body.author
  );
  res.json(book);
};
const remove = async (req: Request, res: Response) => {
  const removedBook = await store.delete(req.params.id);
  res.json(removedBook);
};

const book_routes = (app: express.Application) => {
  app.get("/books", index);
  app.post("/books",verifyAuthToken,create);
  app.get("/books/:id", show);
  app.put("/books/:id",verifyAuthToken,update);
  app.delete("/books/:id",verifyAuthToken,remove);
};
export default book_routes;
