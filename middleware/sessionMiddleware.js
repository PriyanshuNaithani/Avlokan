const session = require("express-session");
const crypto = require("crypto");
const MongoStore = require("connect-mongo");

const generateSessionSecret = () => {
  return crypto.randomBytes(32).toString("hex");
};

const sessionSecret = generateSessionSecret();

const sessionMiddleware = session({
  secret: sessionSecret,
  cookie: { maxAge: 3000000 },
  maxAge: 3000000,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URL,
    ttl: 3600000,
  }),
});

module.exports = sessionMiddleware;
