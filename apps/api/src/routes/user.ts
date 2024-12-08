import { getUserDetails } from "@/src/controllers/userController";
import { authenticate } from "@/src/middlewares/authenticate";
import express from "express";

const router = express.Router();

router.get("/", authenticate, getUserDetails);

export default router;
