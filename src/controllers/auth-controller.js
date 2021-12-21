const User = require("../models/User");
const Role = require("../models/Role");
const jwt = require("jsonwebtoken");
const logger = require("../logger");
require("dotenv").config();

const signUp = async (req, res) => {
  try {
    const { username, email, password, roles } = req.body;
    const newUser = new User({
      username,
      email,
      password,
    });
    if (roles) {
      const foundRoles = await Role.find({ name: { $in: roles } });
      newUser.roles = foundRoles.map((role) => role._id);
    } else {
      const role = await Role.findOne({ name: "User" });
      newUser.roles = [role._id];
      logger.info(newUser);
    }
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({
      msg: error,
    });
    logger.error(error);
  }
};

const signIn = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username: username }).populate("roles");
  if (!user) {
    return res.status(400).json({ msg: "User not found" });
  }
  const matchPassword = await User.comparePassword(password, user.password);
  if (!matchPassword) {
    return res.status(401).json({ token: null, msg: "Invalid password" });
  } else {
    const token = jwt.sign({ id: user._id }, process.env.SECRET_JWT, {
      expiresIn: 86400,
    });
    res.json({ token: token });
  }
};

module.exports = { signUp, signIn };
