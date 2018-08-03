"use strict";

const Schema = use("Schema");

class BookSchema extends Schema {
  up() {
    this.create("books", table => {
      table.increments();
      table.string("title").nullable();
      table.string("isbn").nullable();
      table.string("publisher_name").nullable();
      table.string("author_name").nullable();
      table.string("color").nullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("books");
  }
}

module.exports = BookSchema;
