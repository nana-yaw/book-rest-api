"use strict";

const Schema = use("Schema");

// https://gist.github.com/nanotaboada/6396437

class BookSchema extends Schema {
  up() {
    this.create("books", table => {
      table.increments();
      table
        .bigInteger("isbn")
        .notNullable()
        .unique();
      table.string("title").nullable();
      table.string("subtitle").nullable();
      table.string("author").nullable();
      table.string("published").nullable();
      table.string("publisher").nullable();
      table.integer("pages").nullable();
      table.text("description").nullable();
      table.string("website").nullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("books");
  }
}

module.exports = BookSchema;
