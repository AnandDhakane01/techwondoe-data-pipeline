import express from "express";
import registerController from "../controllers/register";
import { checkApiKey, generateAPIKey } from "../middlewares/apiKey";
const router = express.Router();

router.post("/register", checkApiKey, registerController);

export default router;
