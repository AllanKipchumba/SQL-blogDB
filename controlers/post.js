import { jwt_secret } from "../configs/config.js";
import { db } from "../db.js";
import jwt from "jsonwebtoken";

//fetch all posts
export const getPosts = (req, res) => {
  const q = req.query.cat
    ? "SELECT * FROM posts WHERE cat=?"
    : "SELECT * FROM posts";

  db.query(q, [req.query.cat], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });
};

//fetch a single post
export const getPost = (req, res) => {
  const { id } = req.params;

  //return post and the user that published the post
  const q =
    "SELECT  `username`, `title`, `desc`, `cat`, `date` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ?";

  db.query(q, [id], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });
};

//add a post
export const addPost = (req, res) => {
  const { title, desc, date, cat, uid } = req.body;

  const q =
    "INSERT INTO posts (`title`, `desc`, `date`, `uid`, `cat`) VALUES (?)";
  const values = [title, desc, date, uid, cat];

  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(201).json(data);
  });
};

//delete a single post
export const deletePost = (req, res) => {
  const { id: postID } = req.params;
  const token = req.cookies.access_token;

  //post owner can only delete the post
  jwt.verify(token, jwt_secret, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const q = "DELETE FROM posts WHERE id=? and uid = ?";

    db.query(q, [postID, userInfo.id], (err, data) => {
      if (err) return res.status(403).json(err);

      switch (data.affectedRows) {
        case 0:
          res.status(403).json("you can only delete your post");
          break;
        default:
          res.status(200).json("post deleted");
          break;
      }
    });
  });
};

export const updatePost = (req, res) => {};
