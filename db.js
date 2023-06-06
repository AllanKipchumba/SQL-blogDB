import mysql from "mysql2";
import { db_key } from "./configs/config.js";

export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: db_key,
  database: "blog",
});
