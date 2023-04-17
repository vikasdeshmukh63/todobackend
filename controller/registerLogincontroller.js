const User = require("../models/userModel");
const { hashPassword, comparePassword, tokenGenerator } = require("../helpers/helpers");
const JWT = require("jsonwebtoken");
const CustomErrorHandler = require("../helpers/customErrorHandler");

//todo register controller
const registerController = async (req, res, next) => {
  try {
    let { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.send({
        message: "User already exist",
        success: false,
        data: null,
      });
    }

    password = await hashPassword(password);

    const user = new User({ name, email, password });
    await user.save();
    res.send({
      message: "User registered successfully",
      success: true,
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

//todo login controller
const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email }).select("+password"); //!we have to select the password manually because it cant be shwon automatically as we did select option false for password in the userSchema

    if (!existingUser) {
      return next(new CustomErrorHandler("User not registered"));
    }

    const isMatched = await comparePassword(password, existingUser.password);

    if (!isMatched) {
      return next(new CustomErrorHandler("Invalid Password"));
    }

    const token = await tokenGenerator(existingUser._id, process.env.JWT_SECRET, "1d");

    res.send({
        message: "Login successful",
        success: true,
        data: token,
      });
  } catch (error) {
    next(error);
  }
};

const getMeController = (req, res,next) => {
  try {
    const user = req.user;
    res.send({
      message: "User fetch successfully",
      success: true,
      data: user,
    });
  } catch (error) {
    next(error)
  }
};



module.exports = {
  registerController,
  loginController,
  getMeController,
};
