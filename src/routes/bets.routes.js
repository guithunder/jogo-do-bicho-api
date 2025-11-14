import { Router } from "express";
import * as controller from "../controllers/bets.controller.js";
import { auth } from "../middlewares/auth.js";

const router = Router();

router.get("/", auth, controller.list);
router.get("/:id", auth, controller.show);
router.post("/", auth, controller.create);
router.put("/:id", auth, controller.update);
router.delete("/:id", auth, controller.remove);

export default router;
