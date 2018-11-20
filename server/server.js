const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const connect = require("./connect");
const { json, urlencoded } = require("body-parser");

const dotenv = require("dotenv");
dotenv.config();
console.log(process.env.MONGODO_URI);

const app = express();

const Book = require("./models/bookModel");

app.use(morgan("dev"));
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cors());

app.get("/book/:id", async (req, res) => {
  const bookId = res.params.id;
  try {
    const book = await Book.findById(bookId).exec();
    res.status(200).json(book);
  } catch (error) {
    res.status(500).send();
  }
});

app.get("/books", async (req, res) => {
  try {
    res.status(200).json(
      await Book.find({})
        .lean()
        .exec()
    );
  } catch (error) {
    res.status(500).send();
  }
});

app.post("/book", async (req, res) => {
  // when sending the post request the object should contain a property with the name book
  const createBook = req.body.book;
  try {
    const book = await Book.create(createBook);
    res.status(201).json(book.toJSON());
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

connect("mongodb://waeadmin:lol1234@ds113785.mlab.com:13785/database-dev")
  .then(() =>
    app.listen(5000, () => {
      console.log("server on localhost:5000", process.env.NODE_ENV);
    })
  )
  .catch(error => console.error(error));
