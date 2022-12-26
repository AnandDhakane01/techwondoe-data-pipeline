import { Request, Response } from "express";
import AppDataSource from "../index";
import { Users } from "../entity/user.entity";

const registerController = async (req: Request, res: Response) => {
  const data = req.body;

  try {
    await AppDataSource.createQueryBuilder()
      .insert()
      .into(Users)
      .values(data)
      .execute();
  } catch (err) {
    console.error("Error in inserting data!!", err);
    res
      .status(500)
      .json({ error: true, message: `Error in inserting data!! ${err} ` });
  }
  res.status(200).json({ message: "Data inserted successfully!" });
};

export default registerController;
