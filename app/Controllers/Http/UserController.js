"use strict";

const User = use("App/Models/User");
const { validateAll } = use("Validator");

class UserController {
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
}

module.exports = UserController;
