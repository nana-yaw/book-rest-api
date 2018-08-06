"use strict";

const User = use("App/Models/User");
const { validateAll } = use("Validator");

class UserController {
  /**
   * @swagger
   * /auth/register:
   *   post:
   *     tags:
   *       - Auth
   *     summary: Register User API endpoint
   *     parameters:
   *       - name: username
   *         description: Username
   *         in: query
   *         required: true
   *         type: string
   *       - name: email
   *         description: User Email
   *         in: query
   *         required: true
   *         type: string
   *       - name: password
   *         description: Password
   *         in: query
   *         required: true
   *         type: string
   *       - name: password_confirmation
   *         description: Confirm password
   *         in: query
   *         required: true
   *         type: string
   *     responses:
   *       201:
   *         description: User registered message
   *         example:
   *           message: User object
   *       401:
   *         description: Unauthorized action
   *         example:
   *           message: Unauthorized
   */
  async add({ request, response }) {
    const data = request.only([
      "username",
      "email",
      "password",
      "password_confirmation"
    ]);

    const validation = await validateAll(data, {
      username: "required|unique:users",
      email: "required|email|unique:users",
      password: "required",
      password_confirmation: "required_if:password|same:password"
    });
    if (validation.fails()) {
      const error = validation.messages();
      return response.status(401).json(error);
    }

    delete data.password_confirmation;

    const user = await User.create(data);
    return response.status(201).json(user);
  }

  /**
   * @swagger
   * /user/me:
   *   get:
   *     tags:
   *       - User
   *     summary: Authenticated User details API endpoint
   *     parameters:
   *       - name: refresh_token
   *         description: Refresh token generated when user logged in
   *         in: query
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: Authenticated User Object
   *         example:
   *           message: User object
   *       401:
   *         description: Unauthorized action
   *         example:
   *           message: Unauthorized
   *       404:
   *         description: No records found!
   *         example:
   *           message: Not Found!
   */

  async getUser({ auth, response }) {
    try {
      const { email, username } = await auth.getUser();
      let user = [{ email: email, username: username }];
      return user;
    } catch (error) {
      error = { message: "Missing or invalid jwt token" };
      return error;
    }
  }
}

module.exports = UserController;
