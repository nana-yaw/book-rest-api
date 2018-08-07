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

Route.get("/", ({ response }) => {
  return response.redirect("/docs");
});

//Public routes
Route.group(() => {
  Route.post("auth/login", "AuthController.login");

  Route.post("auth/register", "UserController.add");
}).prefix("api/v1");

//Protected routes
Route.group(() => {
  //Refresh a user token
  Route.post("auth/token/refresh", "AuthController.refreshToken");

  //Logout a user
  Route.post("auth/logout", "AuthController.logout");

  // Get authenticated user
  Route.get("user/me", "UserController.getUser");

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
