const express = require("express");
const moment = require("moment/moment");
const Post = require("../models/Post");

const router = express.Router();

const getCurrDate = () => moment().format("DD/MM/YYYY");

router.get("/", async (req, res) => {
  try {
    const query = Post.find();
    const data = await query.exec();
    if (data) {
      data.forEach(post => {
        if (post.content.length > 100) {
          post.content = post.content.substring(0, 100) + "...More";
        }
      });
      res.json(data);
    } else {
      res.status(400).json({ status: "Bad request" });
    }
  } catch (error) {
    console.error(error);
  }
});

router.post("/", async (req, res) => {
  const { title, content, tags } = req.body;

  const newPost = new Post({
    title: title,
    date: getCurrDate(),
    likes: 0,
    content: content,
    comments: [],
    tags: tags,
  });

  try {
    const post = await newPost.save();
    if (post) {
      res.json({ status: "Post added", post: post });
    } else {
      res.status(400).json({ status: "bad request" });
    }
  } catch (error) {
    console.error(error);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const query = Post.findById(id);
  try {
    const data = await query.exec();
    if (data) {
      res.json(data);
    } else {
      res.status(400).json({ status: "Bad request" });
    }
  } catch (error) {
    console.error(error);
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content, comments, likes, tags } = req.body,
    data = { title, content, comments, likes, tags };
  const query = Post.findByIdAndUpdate(id, data);
  try {
    const returnData = await query.exec();
    if (returnData) {
      res.json({ status: "updated" });
    } else {
      res.status(400).json({ status: "Bad request" });
    }
  } catch (error) {
    console.error(error);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const query = Post.findByIdAndRemove(id);
  try {
    const data = await query.exec();
    if (data) {
      res.json({ status: "Post removed" });
    } else {
      res.status(400).json({ status: "bad request" });
    }
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
