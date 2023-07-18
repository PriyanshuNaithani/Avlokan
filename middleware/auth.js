const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(400).send({ success: false, msg: "token is required." });
  }

  try {
    const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
    req.user = verifyUser;
    // console.log(verifyUser);
  } catch (error) {
    return res.status(400).send({ success: false, msg: "Invalid token" });
  }

  return next();
};

module.exports = verifyToken;
