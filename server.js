const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const path = require("path");
const loginRouter = require("./routes/login");
const registerRouter = require("./routes/register");
const authRouter = require("./routes/auth");
const logoutRouter = require("./routes/logout");
const activitiesRouter = require("./routes/activities");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server is currently running on port ${process.env.PORT}`);
});

app.use(
  cors({
    credentials: true,
    origin: "https://exercises-tracking-app.herokuapp.com",
    exposedHeaders: ["Authorization"],
  })
);
app.use(bodyParser.text());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/auth", authRouter);
app.use("/activities", activitiesRouter);
app.use("/logout", logoutRouter);

app.use("/", express.static(path.resolve(__dirname, "./client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build"));
});
