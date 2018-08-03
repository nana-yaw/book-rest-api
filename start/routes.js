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

// Route.get('/', ({ request }) => {
//   return { greeting: 'Hello world in JSON' }
// })

Route.group(() => {
  Route.post("books", async ({ request, response }) => {
    const bookInfo = request.only([
      "title",
      "isbn",
      "publisher_name",
      "author_name",
      "color"
    ]);

    const book = new Book();
    book.title = bookInfo.title;
    book.isbn = bookInfo.isbn;
    book.publisher_name = bookInfo.publisher_name;
    book.author_name = bookInfo.author_name;
    book.color = bookInfo.color;

    await book.save();

    return response.status(201).json(book);
  });

  Route.get("books", async ({ response }) => {
    let books = await Book.all();
    return response.json(books);
  });
}).prefix("api/v1");
