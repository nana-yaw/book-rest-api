"use strict";

const Book = use("App/Models/Book");

/**
 * Resourceful controller for interacting with books
 */
class BookController {
  /**
   * @swagger
   * /books:
   *   get:
   *     tags:
   *       - Book
   *     summary: List All Books API endpoint
   *     parameters:
   *       - name: token
   *         description: Refresh token generated when user logged in
   *         in: query
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: Shows an array book objects
   *         example:
   *           message: Array of book objects
   *       401:
   *         description: Unauthorized action
   *         example:
   *           message: Unauthorized
   *       404:
   *         description: No records found!
   *         example:
   *           message: Not Found
   */

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
   * @swagger
   * /books:
   *   post:
   *     tags:
   *       - Book
   *     summary: Add a book API endpoint
   *     parameters:
   *       - name: isbn
   *         description: Unique Book ISBN
   *         in: query
   *         required: true
   *         type: uint
   *       - name: title
   *         description: Book Title
   *         in: query
   *         required: true
   *         type: string
   *       - name: subtitle
   *         description: Book Subtitle
   *         in: query
   *         required: false
   *         type: string
   *       - name: author
   *         description: Book Author
   *         in: query
   *         required: true
   *         type: string
   *       - name: published
   *         description: Book published timestamp
   *         in: query
   *         required: false
   *         type: string
   *       - name: publisher
   *         description: Book publisher name
   *         in: query
   *         required: false
   *         type: string
   *       - name: pages
   *         description: Count of book pages
   *         in: query
   *         required: true
   *         type: string
   *       - name: description
   *         description: Book description
   *         in: query
   *         required: false
   *         type: string
   *     responses:
   *       200:
   *         description: Book successfully added
   *         example:
   *           message: Book object
   *       401:
   *         description: Unauthorized action
   *         example:
   *           message: Unauthorized
   *       404:
   *         description: No records found!
   *         example:
   *           message: Not Found
   */

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
   * @swagger
   * /books/{id}:
   *   get:
   *     tags:
   *       - Book
   *     summary: Get a book's info API endpoint
   *     parameters:
   *       - name: id
   *         description: Book ID
   *         in: query
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: Shows a book object
   *         example:
   *           message: book object
   *       401:
   *         description: Unauthorized action
   *         example:
   *           message: Unauthorized
   *       404:
   *         description: No records found!
   *         example:
   *           message: Not Found!
   */

  /**
   * Display a single book.
   * GET books/id
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
   * @swagger
   * /books/{id}:
   *   put:
   *     tags:
   *       - Book
   *     summary: Update book details API endpoint
   *     parameters:
   *       - name: isbn
   *         description: Unique Book ISBN
   *         in: query
   *         required: true
   *         type: uint
   *       - name: title
   *         description: Book Title
   *         in: query
   *         required: true
   *         type: string
   *       - name: subtitle
   *         description: Book Subtitle
   *         in: query
   *         required: false
   *         type: string
   *       - name: author
   *         description: Book Author
   *         in: query
   *         required: true
   *         type: string
   *       - name: published
   *         description: Book published timestamp
   *         in: query
   *         required: false
   *         type: string
   *       - name: publisher
   *         description: Book publisher name
   *         in: query
   *         required: false
   *         type: string
   *       - name: pages
   *         description: Count of book pages
   *         in: query
   *         required: true
   *         type: string
   *       - name: description
   *         description: Book description
   *         in: query
   *         required: false
   *         type: string
   *     responses:
   *       200:
   *         description: Book successfully updated
   *         example:
   *           message: Book object
   *       401:
   *         description: Unauthorized action
   *         example:
   *           message: Unauthorized
   *       404:
   *         description: No records found!
   *         example:
   *           message: Not Found!
   */

  /**
   * Update book details.
   * PUT or PATCH books/id
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
   * @swagger
   * /books/{id}:
   *   delete:
   *     tags:
   *       - Book
   *     summary: Delete a book API endpoint
   *     parameters:
   *       - name: id
   *         description: Book ID
   *         in: query
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: Shows book deleted message
   *         example:
   *           message: book removed!
   *       401:
   *         description: Unauthorized action
   *         example:
   *           message: Unauthorized!
   *       404:
   *         description: No records found!
   *         example:
   *           message: Not Found!
   */

  /**
   * Delete a book with id.
   * DELETE books/id
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
