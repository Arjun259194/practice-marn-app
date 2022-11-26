const express = require("express");
const moment = require("moment/moment");
const Post = require("../models/Post");

const router = express.Router();

const getCurrDate = () => moment().format("MM ddd, YYYY hh:mm:ss a");

router.get("/", async (req, res) => {
  //* test this
  const data = await Post.find()
    .exec()
    .catch(error => {
      console.log(error);
      res.status(400).json({
        status: "Bad request",
      });
    });

  if (data)
    res.json({
      status: "OK",
      data: data,
    });
});

router.get("/:id", (req, res) => {
  //! recreate this
  // Post.findById(req.params.id)
  //   .exec()
  //   .then(data => {
  //     res.json({
  //       status: "OK",
  //       data: data,
  //     });
  //   })
  //   .catch(error => {
  //     console.log(error);
  //     res.status(400).json({
  //       status: "Bad request",
  //     });
  //   });
});

router.delete("/:id", async (req, res) => {});

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

module.exports = router;
