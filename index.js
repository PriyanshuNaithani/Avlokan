const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/user");
const dbConn = require("./config/dbConnection");
const sessionMiddleware = require("./middleware/sessionMiddleware");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(sessionMiddleware);

const port = process.env.PORT || 5600;
app.use("/", userRoute);

dbConn().then(() => {
  app.listen(port, () => {
    console.log("server is live on", port);
  });
});
