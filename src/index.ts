import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "./routes/index";
import { DataSource } from "typeorm";
import config from "./database/config";

const port = 3000;
const app: Application = express();

// Middlewares
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// routes
app.get("/", (req: Request, res: Response) => {
  res.send("Techwondoe | Home route");
});

app.use("/", routes);

// db connection
const AppDataSource = new DataSource(config);
AppDataSource.initialize()
  .then(() => {
    console.log("connected to db!");
  })
  .catch((err) => {
    console.log("Error in db connection: ", err);
  });

app.listen(port, () => {
  console.log("Server listening on port 3000");
});

export default AppDataSource;
