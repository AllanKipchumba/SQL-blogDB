import express from "express";
import { addPost } from "../controlers/post.js";

const router = express.Router();

router.get("/");
router.get("/:id");
router.post("/");
router.delete("/:id");
router.update("/:id");

export default router;
