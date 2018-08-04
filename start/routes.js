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

Route.get("/", ({ request }) => {
  return { greeting: "Hello world in JSON" };
});

Route.group(() => {
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

  Route.get("books", async ({ response }) => {
    let books = await Book.all();
    return response.json(books);
  });
}).prefix("api/v1");
