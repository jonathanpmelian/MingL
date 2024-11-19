import express from "express";
import { validate } from "../middlewares/validate";
import { loginSchema, registerSchema } from "../schemas/authSchemas";
import { login, register } from "../controllers/authController";

const router = express.Router();

router.post("/login", validate(loginSchema), login);
router.post("/register", validate(registerSchema), register);

export default router;
