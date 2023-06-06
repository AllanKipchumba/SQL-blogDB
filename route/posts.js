import express from "express";
import { addPost } from "../controlers/post.js";

const router = express.Router();

router.get("/test", addPost);

export default router;
