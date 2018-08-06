"use strict";

const Model = use("Model");

/**
 *  @swagger
 *  definitions:
 *    Book:
 *      type: object
 *      properties:
 *        id:
 *          type: uint
 *        isbn:
 *          type: uint
 *        title:
 *          type: string
 *        subtitle:
 *          type: string
 *        author:
 *          type: string
 *        published:
 *          type: string
 *        publisher:
 *          type: string
 *        pages:
 *          type: string
 *        description:
 *          type: string
 *      required:
 *        - isbn
 */

class Book extends Model {
  static get table() {
    return "books";
  }

  static get primaryKey() {
    return "id";
  }
}

module.exports = Book;
