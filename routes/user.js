const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { body } = require("express-validator");
const passportJWT = require("../middleware/passportJWT");
const checkAdmin = require("../middleware/checkAdmin")

// router.get(
//   "/", 
//   [
//     passportJWT.isLogin, checkAdmin.isAdmin
//   ],
//   userController.get
// );

router.post(
  "/register",
  [
    body("name").not().isEmpty().withMessage("Please type name and surname"),
    body("email")
      .not()
      .isEmpty()
      .withMessage("Please type email")
      .isEmail()
      .withMessage("Wrong format"),
    body("password")
      .not()
      .isEmpty()
      .withMessage("Please type password")
      .isLength({ min: 5 })
      .withMessage("need at least 5 characters"),
  ],
  userController.register
);

router.post(
  "/login",
  [
    body("email")
      .not()
      .isEmpty()
      .withMessage("Please type email")
      .isEmail()
      .withMessage("Wrong format"),
    body("password")
      .not()
      .isEmpty()
      .withMessage("Please type password")
      .isLength({ min: 5 })
      .withMessage("Wrong format"),
  ],
  userController.login
);

router.get("/me", [passportJWT.isLogin], userController.profile);

module.exports = router;
