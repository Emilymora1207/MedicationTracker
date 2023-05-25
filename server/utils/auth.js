//  import the jsonwebtoken module in a Node.js application.
const jwt = require("jsonwebtoken");
// configure environment variables from a .env file in a Node.js application.
require("dotenv").config();

// retrieves the values of environment variables JWT_SECRET and JWT_EXP using process.env in a Node.js application.

const secret = process.env.JWT_SECRET;
const expiration = process.env.JWT_EXP;

// Sitting the functions for authMiddleware for token verification and user assignment to req, and signToken for generating JWTs based on user data.
module.exports = {
  authMiddleware: ({ req }) => {
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }

    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log("Invalid token");
    }

    return req;
  },
  signToken: function ({ username, _id }) {
    const payload = { username, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
