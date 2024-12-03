import express from "express";
import { validate } from "../middlewares/validate";
import { eventSchema } from "../schemas/eventSchemas";
import { create } from "../controllers/eventController";
import { authenticate } from "../middlewares/authenticate";

const router = express.Router();

router.post("/", authenticate, validate(eventSchema), create);

export default router;
