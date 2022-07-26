const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { getPropertyFromDB } = require("../database/dbModules");

const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const isUsernameExist =
    (
      await getPropertyFromDB("exercise_tracking_users", "username", {
        username,
      })
    ).length > 0;
  if (!isUsernameExist) {
    res.status(402).json({ msg: `The username '${username}' does not exist!` });
    return;
  }
  const [{ password: hashPassword }] = await getPropertyFromDB(
    "exercise_tracking_users",
    "password",
    { username }
  );
  const isPaasswordCorrect = bcrypt.compareSync(password, hashPassword);
  if (!isPaasswordCorrect) {
    res.status(403).json({ msg: "Password is incorrect! ⛔" });
    return;
  }

  const [{ user_id: userId, bmr, full_name: fullName }] =
    await getPropertyFromDB("exercise_tracking_users", "*", {
      username,
    });

  const userData = { username, fullName, bmr, userId };

  const jwtToken = jwt.sign(
    {
      ...userData,
      exp:
        Math.floor(Date.now() / 1000) + 60 * process.env.TOKEN_EXPIRATION_MINS,
    },
    process.env.JWT_SECRET
  );

  res.cookie("token", jwtToken, {
    httpOnly: true,
    maxAge: process.env.TOKEN_EXPIRATION_MINS * 60 * 1000,
  });

  res.set("Authorization", jwtToken);

  res.status(200).send();
};

module.exports = { postLogin };
