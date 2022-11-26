const express = require("express");
const moment = require("moment/moment");
const Post = require("../models/Post");

const router = express.Router();

const getCurrDate = () => moment().format("MM ddd, YYYY hh:mm:ss a");

router.get("/", async (req, res) => {
  const data = await Post.find()
    .exec()
    .catch(error => {
      console.log(error);
    });

  if (data) {
    res.json({
      status: "OK",
      data: data,
    });
  } else {
    res.status(400).json({
      status: "Bad request",
    });
  }
});

router.post("/", (req, res) => {
  const { title, content, tags } = req.body;

  const newPost = new Post({
    title: title,
    date: getCurrDate(),
    likes: 0,
    content: content,
    comments: [],
    tags: tags,
  });

  newPost
    .save()
    .then(post => {
      res.json({
        message: "Post saved",
        data: post,
      });
    })
    .catch(error => {
      res.status(400).json({
        message: "Bad request",
      });
    });
});

router.get("/:id", async (req, res) => {
  const data = await Post.findById(req.params.id)
    .exec()
    .catch(error => {
      console.log(error);
    });
  if (data) {
    res.json({
      status: "OK",
      data: data,
    });
  } else {
    res.status(400).json({
      status: "Bad request",
    });
  }
});

router.put("/:id", (req, res) => {
  const data = req.body;
  Post.findByIdAndUpdate(req.params.id, data)
    .then(resData => {
      if (resData) {
        res.json({
          status: "OK",
          message: "Post updated",
        });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(400).json({
        status: "Bad request",
      });
    });
});

router.delete("/:id", (req, res) => {
  Post.findByIdAndRemove(req.params.id)
    .then(data => {
      if (data) {
        res.json({
          status: "OK",
          message: "Post deleted",
          data: data,
        });
      } else {
        res.status(502).json({
          status: "got an invalid response",
        });
      }
    })
    .catch(error => {
      res.status(400).json({
        status: "Bad request",
      });
    });
});

module.exports = router;
