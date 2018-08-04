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
   * Create/save a new book.
   * POST books
   */
  async store({ request, response }) {
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
  }

  /**
   * Display a single book.
   * GET books/:id
   */
  async show({ params, response }) {
    const book = await Book.find(params.id);

    if (!book) {
      const error = { message: "Requested book not found at this time!" };
      return response.status(404).json(error);
    }

    return response.json(book);
  }

  /**
   * Update book details.
   * PUT or PATCH books/:id
   */
  async update({ params, request, response }) {
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

    return response.status(202).json(book);
  }

  /**
   * Delete a book with id.
   * DELETE books/:id
   */
  async destroy({ params, response }) {
    const book = await Book.find(params.id);
    if (!book) {
      const error = { message: "Requested book not found at this time!" };
      return response.status(404).json(error);
    }
    await book.delete();
    return response.status(200).json([{ message: "Book removed!" }]);
  }
}

module.exports = BookController;
