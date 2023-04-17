const router = require("express").Router();
const {registerController,loginController,getMeController} = require("../controller/registerLogincontroller");
const isAuthenticated = require("../middleware/auth")


//register route
router.post("/register",registerController);

//login route
router.post("/login",loginController);

// get my details
router.get("/me",isAuthenticated,getMeController);






module.exports = router