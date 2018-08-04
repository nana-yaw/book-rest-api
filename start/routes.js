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
  //Create/save a new book.
  Route.post("books", "BookController.store");

  //Show list of all books.
  Route.get("books", "BookController.index");

  // Display a single book.
  Route.get("books/:id", "BookController.show");

  // Update book details.
  Route.put("books/:id", "BookController.update");

  // Delete a book with id.
  Route.delete("books/:id", "BookController.destroy");
}).prefix("api/v1");
