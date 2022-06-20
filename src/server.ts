import express from "express";
import bodyParser from "body-parser";
import book_routes from "./handlers/books";
import user_routes from "./handlers/user";
import cors from "cors";
import mythical_weapon_routes from "./handlers/mythical_weapon";

const app: express.Application = express();

const address: string = "0.0.0.0:3000";
app.use(cors());
app.use(bodyParser.json());
book_routes(app);
user_routes(app);
app.listen(3000, function () {
  console.log("starting app");
});
