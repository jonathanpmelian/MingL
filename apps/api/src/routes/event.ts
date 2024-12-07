import express from "express";
import { validate } from "@/src/middlewares/validate";
import { eventSchema } from "@/src/schemas/eventSchemas";
import { create, getAll, getById } from "@/src/controllers/eventController";
import { authenticate } from "@/src/middlewares/authenticate";

const router = express.Router();

router.post("/", authenticate, validate(eventSchema), create);
router.get("/", authenticate, getAll);
router.get("/:id", authenticate, getById);

export default router;
