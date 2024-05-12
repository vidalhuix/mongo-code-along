import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";

//This will connect us to the Data Base
const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/books";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

//Here we create an Author modell
const Author = mongoose.model("Author", {
  name: String,
});

//Here we create a Book modell
const Book = mongoose.model("Book", {
  title: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
  },
});

// if (process.env.RESET_DATABASE) {
//   console.log("Resetting database!");

//   const seedDatabase = async () => {
//     await Author.deleteMany();
//     await Book.deleteMany();

//     const tolkien = new Author({ name: "J.R.R Tolkien" });
//     await tolkien.save();

//     const rowling = new Author({ name: "J.K. Rowling" });
//     await rowling.save();

//     await new Book ({ title: "Harry Potter and the puppy", author : rowling }).save()
//     await new Book ({ title: "Harry Potter and the ancient bitch", author : rowling }).save()
//     await new Book ({ title: "Harry Potter and the strawberry", author : rowling }).save()
//     await new Book ({ title: "Harry Potter and the little pony", author : rowling }).save()
//     await new Book ({ title: "Harry Potter and the rainbow all tha way", author : rowling }).save()
//     await new Book ({ title: "Harry Potter and the snail", author : rowling }).save()
//     await new Book ({ title: "Harry Potter and the spider", author : rowling }).save()
//     await new Book ({ title: "The lord of the rings", author : tolkien }).save()
//     await new Book ({ title: "The Hobbit", author : tolkien }).save()
//   };

//   seedDatabase();
// }

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=8080 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send(
    "<b>This is my first API Database using MongoDB!</b> <br> Add '/books' to the url to see all books. <br/> Add '/authors' to the url to see all authors."
  );
});

app.get("/books", async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

app.get("/authors", async (req, res) => {
  const authors = await Author.find();
  res.json(authors);
});

app.get("/author/:id/books", async (req, res) => {
  const author = await Author.findById(req.params.id);
  if (author) {
    res.json(author);
  } else {
    res.status(404).json({ error: "Author not found" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
//mongodb+srv://arnauvidal:<password>@cluster0.uirwjkw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
