const dotenv = require("dotenv");
const statusCodes = require("http-status-codes");
const { verify } = require("../token/index");
dotenv.config();

const requireToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (token && token.split(" ")[0] === "Bearer") {
    const accessToken = token.split(" ")[1];
    const user = verify(accessToken);
    if (!user) {
      return res.status(statusCodes.FORBIDDEN).json({ error: "Token expire" });
    }
    req.user = user;
    next();
  } else {
    res.status(statusCodes.UNAUTHORIZED).json({ error: "Require token" });
  }
};

module.exports = {
  requireToken: requireToken,
};
