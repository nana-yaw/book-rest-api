"use strict";

const Model = use("Model");

/**
 *  @swagger
 *  definitions:
 *    User:
 *      type: object
 *      properties:
 *        id:
 *          type: uint
 *        username:
 *          type: string
 *        email:
 *          type: string
 *        password:
 *          type: string
 *      required:
 *        - username
 *        - email
 *        - password
 */

class User extends Model {
  static boot() {
    super.boot();

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook("beforeCreate", "UserHook.hashPassword");
  }

  static get hidden() {
    return ["password"];
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens() {
    return this.hasMany("App/Models/Token");
  }
}

module.exports = User;
