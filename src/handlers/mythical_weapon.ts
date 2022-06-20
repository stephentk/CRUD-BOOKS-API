import express, { Request, Response } from "express";
import { Weapon, MythicalWeaponStore } from "../models/mythical_weapons";
import Jwt from "jsonwebtoken";
import { verifyAuthToken } from "./user";

const store = new MythicalWeaponStore();
const index = async (req: Request, res: Response) => {
  const weapons = await store.index();
  res.json(weapons);
};
const create = async (req: Request, res: Response) => {
  const weapon: Weapon = {
    name: req.body.name,
    type: req.body.type,
    weight: req.body.weight,
  };
  try {
    Jwt.verify(req.body.token, process.env.TOKEN_SECRET);
  } catch (err) {
    res.status(401);
    res.json(`invalid token ${err}`);
    return;
  }
  try {
    const weapons = await store.create(weapon);
    res.json(weapons);
  } catch (err) {
    res.status(401);
    res.json(`invalid token ${err}`);
  }
};

const mythical_weapon_routes = (app: express.Application) => {
  app.get("/mythical-weapons", index);
  app.post("/mythical-weapons",verifyAuthToken, create);
};
export default mythical_weapon_routes;
