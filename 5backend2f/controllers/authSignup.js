const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({ message: "user exixts", success: false });
    }
    const userModel = new User({ name, email, password });
    userModel.password = await bcrypt.hash(password, 10);
    await userModel.save();
    res.status(201).json({ message: "Signup done", success: true });
  } catch (error) {
    res.status(500).json({ message: "Server error", success: false });
  }
};

// fro login

const login = async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await User.findOne({ name });
    if (!user) {
      return res
        .status(403)
        .json({ message: "name or password is wrong", success: false });
    }
    const passComp = await bcrypt.compare(password, user.password);
    if (!passComp) {
      return res
        .status(403)
        .json({ message: "name or password is wrong", success: false });
    }

    const jwtToken = jwt.sign(
      { name: user.name, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    res.status(201).json({
      message: "Login Success",
      success: true,
      jwtToken,
      name,
      name: user.name,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", success: false });
  }
};
module.exports = { signup, login };
