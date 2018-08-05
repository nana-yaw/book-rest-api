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

Route.get("/", ({ request }) => {
  return { greeting: "Hello world in JSON" };
});

Route.group(() => {
  Route.post("login", "AuthController.login");

  Route.post("register", "UserController.add");
}).prefix("api/v1");

Route.group(() => {
  //Logout a user
  Route.post("logout", "AuthController.logout");

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
})
  .prefix("api/v1")
  .middleware("auth");
