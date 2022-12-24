import * as crypto from "crypto";
import AppDataSource from "../index";

import { NextFunction, Request, Response } from "express";
import { ApiKeys } from "../entity/apikey.entity";

export const checkApiKey = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const key = req.headers.api_key;
  try {
    const db_key = await AppDataSource.getRepository(ApiKeys)
      .createQueryBuilder("ApiKeys")
      .where("ApiKeys.key = :key", { key: key })
      .getOne();
    if (db_key != null) {
      next();
    } else {
      res.status(401).json({ error: true, message: "unauthorized!!" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: true, message: `error while validating api key! ${err}` });
  }
};

export const generateAPIKey = async (next: NextFunction) => {
  const apiKey = crypto.randomBytes(32).toString("hex");
  try {
    AppDataSource.createQueryBuilder()
      .insert()
      .into(ApiKeys)
      .values({ key: apiKey })
      .execute();
  } catch (err) {
    console.log("couldn't create api key!!");
  }
  next();
};
