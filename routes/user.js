const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { body } = require("express-validator");
const {isLogin} = require("../middleware/passportJWT");
const {isAdmin} = require("../middleware/checkAdmin");

router.get(
  "/",
  [
    isLogin,isAdmin
  ],
  userController.index
);

router.delete("/:id",[isLogin,isAdmin], userController.delete);

router.put(
  "/:id",
  [
    body("name")
      .not()
      .isEmpty()
      .withMessage("Please type name"),
    body("email")
      .not()
      .isEmpty()
      .withMessage("Please type email")
      .isURL()
      .withMessage("Wrong format"),
    body("password")
      .not()
      .isEmpty()
      .withMessage("Please type password")
      .isLength({ min: 5 })
      .withMessage("Need at least 5 characters"),
    isLogin,isAdmin
  ], userController.delete
);

router.post(
  "/register",
  [
    body("name").not()
      .isEmpty()
      .withMessage("Please type name and surname"),
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
      .withMessage("Need at least 5 characters"),
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

router.get("/me", [isLogin], userController.profile);

module.exports = router;
