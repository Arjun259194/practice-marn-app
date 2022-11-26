const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type:String
  },
  date: {
    type: String,
  },
  likes: {
    type: Number,
  },
  content: {
    type: String,
  },
  comments: [String],
  tags: [String],
});

module.exports = mongoose.model("Post", postSchema);
