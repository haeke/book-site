// contains the model definition for a book
const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  ISBN: {
    type: String,
    required: true
  }
});

// export the bookSchema
module.exports = mongoose.model("book", bookSchema);
