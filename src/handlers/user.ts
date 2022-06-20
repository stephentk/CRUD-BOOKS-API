import express, { Request, Response } from "express";
import { User, userstore } from "../models/users";
import jwt from "jsonwebtoken";
const store = new userstore();

const index = async (req: Request, res: Response) => {
  const users = await store.index();
  res.json(users);
};
const show = async (req: Request, res: Response) => {
  const users = await store.show(req.params.id);
  res.json(users);
};

const create = async (req: Request, res: Response) => {
  const user: User = {
    username: req.body.username,
    password: req.body.password,
  };
  const newUser = await store.create(user);
  const token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET);
  res.json(token);
};

 const authenticate = async (req: Request, res: Response) => {
  const user: User = {
    username: req.body.username,
    password: req.body.password,
  };
  const authenticatedUser = await store.authenticate(
    req.body.username,
    req.body.password
  );
  const token = jwt.sign({ user: authenticatedUser }, process.env.TOKEN_SECRET);
  res.json(token);
};
 export const verifyAuthToken = (req: Request, res: Response, next) => {
  try {
      const authorizationHeader = req.headers.authorization
      const token = authorizationHeader?.split(' ')[1]
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
      next()
  } catch (error) {
      res.status(401)
  }
}


const user_routes = (app: express.Application) => {
  app.get('/users',index)
  app.get('/users/:id',show)
  app.post("/user", verifyAuthToken ,create)
  app.post("/login", authenticate)
};

export default user_routes;
