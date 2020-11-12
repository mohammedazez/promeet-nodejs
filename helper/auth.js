require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = {
  auth: (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log("HEADER", authHeader);
    const token = authHeader.split(" ")[1];
    console.log("Token", token);

    if (token == null) return res.json("missing token");

    try {
      const isTokenValid = jwt.verify(token, process.env.KEYWORD);
      console.log("ISI TOKEN", isTokenValid);
      if (isTokenValid) {
        let { password, ...rest } = isTokenValid;
        req.body = rest;
        // req.body.fullName = rest;
        next();
      }
    } catch {
      res.json("token is not valid");
    }
  },
};
