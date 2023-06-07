import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { jwt_secret } from "../configs/config.js";

//register new user
export const register = (req, res) => {
  const { username, email, password } = req.body;

  //check existing user
  const q = `SELECT * FROM users WHERE email = ? OR username = ?`;

  db.query(q, [email, username], (err, data) => {
    if (err) return res.json(err);
    if (data.length) return res.status(409).json(`user already exists`);

    //hash the password and creare a user
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const q = "INSERT INTO users (`username`, `email`, `password`) VALUES (?)";
    const values = [username, email, hash];

    db.query(q, [values], (err, data) => {
      if (err) return res.json(err);
      return res.status(200).json("user has been created");
    });
  });
};

//login user
export const login = (req, res) => {
  const { username } = req.body;

  //check user
  const q = "SELECT * FROM users WHERE username = ?";

  db.query(q, [username], (err, data) => {
    if (err) return res.json(err);
    if (data.length === 0) return res.json(`User not found`);

    //check password
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!isPasswordCorrect) return res.json("wrong username or password");

    const token = jwt.sign({ id: data[0].id }, jwt_secret);
    const { password, ...other } = data[0]; //filter out the password

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(other);
  });
};

//logout user
export const logout = (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("user has logged out");
};
