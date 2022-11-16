const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const generate = (username, password) => {
  return jwt.sign(
    {
      userName: username,
      password: password,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "7d" }
  );
};

const verify = (token) => {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return "";
    }
    return user;
  });
};
module.exports = {
  generate: generate,
  verify: verify,
};
