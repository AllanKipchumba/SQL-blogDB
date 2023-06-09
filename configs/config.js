import dotenv from "dotenv";

dotenv.config();

export const jwt_secret = process.env.JWT_SECRET;
export const db_key = process.env.DB_KEY;
