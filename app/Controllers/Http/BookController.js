"use strict";

const Book = use("App/Models/Book");

/**
 * Resourceful controller for interacting with books
 */
class BookController {
  /**
   * Show a list of all books.
   * GET books
   */
  async index({ response }) {
    let books = await Book.all();

    if (!books) {
      const error = { message: "No books found at this time!" };
      return response.status(404).json(error);
    }

    return response.status(200).json(books);
  }

  /**
   * Render a form to be used for creating a new book.
   * GET books/create
   */
  async create({ request, response }) {}

  /**
   * Create/save a new book.
   * POST books
   */
  async store({ request, response }) {}

  /**
   * Display a single book.
   * GET books/:id
   */
  async show({ params, request, response }) {}

  /**
   * Render a form to update an existing book.
   * GET books/:id/edit
   */
  async edit({ params, request, response }) {}

  /**
   * Update book details.
   * PUT or PATCH books/:id
   */
  async update({ params, request, response }) {}

  /**
   * Delete a book with id.
   * DELETE books/:id
   */
  async destroy({ params, request, response }) {}
}

module.exports = BookController;
