"use strict";

const { validate } = use("Validator");
const Encryption = use("Encryption");
const Token = use("App/Models/Token");

class AuthController {
  async login({ request, response, auth }) {
    const rules = {
      email: "required|email",
      password: "required"
    };

    const { email, password } = request.only(["email", "password"]);

    const validation = await validate({ email, password }, rules);

    if (!validation.fails()) {
      try {
        let jwtToken = await auth.withRefreshToken().attempt(email, password);
        let output = [{ message: "Logged in!" }, { token: jwtToken }];
        return response.status(200).json(output);
      } catch (err) {
        response.status(401).send({ error: "Invalid email or password" });
      }
    } else {
      response.status(401).send(validation.messages());
    }
  }

  // async refreshToken({ request, response, auth }) {
  //   const rules = {
  //     refresh_token: "required"
  //   };

  //   const { refresh_token } = request.only(["refresh_token"]);

  //   const validation = await validate({ refresh_token }, rules);

  //   if (!validation.fails()) {
  //     try {
  //       let output = await auth
  //         .newRefreshToken()
  //         .generateForRefreshToken(refresh_token);
  //       return response.status(200).json(output);
  //     } catch (err) {
  //       response.status(401).send({ error: "Invalid refresh token" });
  //     }
  //   } else {
  //     response.status(401).send(validation.messages());
  //   }
  // }

  //User Token as Authorization Header and parse refresh token {refresh_token:refresh_token}
  async logout({ request, response, auth }) {
    const rules = {
      refresh_token: "required"
    };

    const { refresh_token } = request.only(["refresh_token"]);

    const validation = await validate({ refresh_token }, rules);

    const decrypted = Encryption.decrypt(refresh_token);

    if (!validation.fails()) {
      try {
        const refreshToken = await Token.findBy("token", decrypted);
        if (refreshToken) {
          refreshToken.delete();
          response.status(200).send({ status: "Logged out!" });
        } else {
          response.status(401).send({ error: "Invalid refresh token" });
        }
      } catch (err) {
        response.status(401).send({ error: "something went wrong" });
      }
    } else {
      response.status(401).send(validation.messages());
    }
  }
}

module.exports = AuthController;
