"use strict";

const { validate } = use("Validator");
const Encryption = use("Encryption");
const Token = use("App/Models/Token");

class AuthController {
  /**
   * @swagger
   * /auth/login:
   *   post:
   *     tags:
   *       - Auth
   *     summary: Log in user API endpoint
   *     parameters:
   *       - name: email
   *         description: Registered user email
   *         in: query
   *         required: true
   *         type: string
   *       - name: password
   *         description: User password
   *         in: query
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: Token
   *         example:
   *           message: Bearer token
   *       401:
   *         description: Unauthorized action
   *         example:
   *           message: Unauthorized
   */
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

  /**
   * @swagger
   * /auth/token/refresh:
   *   post:
   *     tags:
   *       - Auth
   *     summary: Refresh user bearer token API endpoint
   *     parameters:
   *       - name: refresh_token
   *         description: Current user refresh token
   *         in: query
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: New bearer token
   *         example:
   *           message: Bearer token
   *       401:
   *         description: Unauthorized action
   *         example:
   *           message: Unauthorized
   */

  async refreshToken({ request, response, auth }) {
    const rules = {
      refresh_token: "required"
    };

    const { refresh_token } = request.only(["refresh_token"]);

    const validation = await validate({ refresh_token }, rules);

    if (!validation.fails()) {
      try {
        let output = await auth
          .newRefreshToken()
          .generateForRefreshToken(refresh_token);
        return response.status(200).json(output);
      } catch (err) {
        response.status(401).send({ error: "Invalid refresh token" });
      }
    } else {
      response.status(401).send(validation.messages());
    }
  }

  /**
   * @swagger
   * /auth/logout:
   *   post:
   *     tags:
   *       - Auth
   *     summary: User logout API endpoint
   *     parameters:
   *       - name: refresh_token
   *         description: Current user refresh token
   *         in: query
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: Sign out message
   *         example:
   *           message: Logged out
   *       401:
   *         description: Unauthorized action
   *         example:
   *           message: Unauthorized!
   */

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
