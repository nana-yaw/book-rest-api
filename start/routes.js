"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use("Route");
const Book = use("App/Models/Book");

// Route.get("/", ({ request }) => {
//   return { greeting: "Hello world in JSON" };
// });

Route.group(() => {
  //Implement handling of empty responses
  Route.post("books", async ({ request, response }) => {
    // https://gist.github.com/nanotaboada/6396437

    const bookInfo = request.only([
      "isbn",
      "title",
      "subtitle",
      "author",
      "published",
      "publisher",
      "pages",
      "description",
      "website"
    ]);

    const book = new Book();
    book.isbn = bookInfo.isbn;
    book.title = bookInfo.title;
    book.subtitle = bookInfo.subtitle;
    book.author = bookInfo.author;
    book.published = bookInfo.published;
    book.publisher = bookInfo.publisher;
    book.pages = bookInfo.pages;
    book.description = bookInfo.description;
    book.website = bookInfo.website;

    await book.save();

    return response.status(201).json(book);
  });

  //Show a list of all books.
  Route.get("books", "BookController.index");

  Route.get("books/:id", async ({ params, response }) => {
    const book = await Book.find(params.id);

    if (!book) {
      const error = { message: "Requested book not found at this time!" };
      return response.status(404).json(error);
    }

    return response.json(book);
  });

  Route.put("books/:id", async ({ params, request, response }) => {
    const bookInfo = request.only([
      "isbn",
      "title",
      "subtitle",
      "author",
      "published",
      "publisher",
      "pages",
      "description",
      "website"
    ]);
    const book = await Book.find(params.id);
    book.isbn = bookInfo.isbn;
    book.title = bookInfo.title;
    book.subtitle = bookInfo.subtitle;
    book.author = bookInfo.author;
    book.published = bookInfo.published;
    book.publisher = bookInfo.publisher;
    book.pages = bookInfo.pages;
    book.description = bookInfo.description;
    book.website = bookInfo.website;

    await book.save();

    return response.status(200).json(book);
  });

  Route.delete("books/:id", async ({ params, request, response }) => {
    const book = await Book.find(params.id);
    if (!book) {
      const error = { message: "Requested book not found at this time!" };
      return response.status(404).json(error);
    }
    await book.delete();
    return response.status(200).json([{ message: "Book removed!" }]);
  });
}).prefix("api/v1");
