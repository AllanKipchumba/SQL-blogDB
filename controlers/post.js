import { db } from "../db.js";

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

  const q = "SELECT * FROM posts WHERE id=?";

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

    return res.status(200).json(data);
  });
};
export const deletePost = (req, res) => {};

export const updatePost = (req, res) => {};
