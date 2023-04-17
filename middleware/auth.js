const User = require("../models/userModel");
const JWT = require("jsonwebtoken")

const isAuthenticated = async(req, res, next) => {
  try {
    const token = req.headers.authorization;

if (!token) {
    return res.send({
        message: "Authorization failed",
        success: false
    });
}

const decoded = JWT.verify(token, process.env.JWT_SECRET);
console.log(req.user)
req.user = await User.findById(decoded._id)
next();
} catch (error) {
    return res.send({
        message: "Authorization failed with error",
        success: false
    });
}
};


module.exports = isAuthenticated