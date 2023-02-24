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
    body("name").not().isEmpty().withMessage("กรุณาป้อนชื่อ-สกุลด้วย"),
    body("email")
      .not()
      .isEmpty()
      .withMessage("กรุณาป้อนอีเมลด้วย")
      .isEmail()
      .withMessage("รูปแบบอีเมลไม่ถูกต้อง"),
    body("password")
      .not()
      .isEmpty()
      .withMessage("กรุณาป้อนรหัสผ่านด้วย")
      .isLength({ min: 5 })
      .withMessage("รหัสผ่านต้องมีอย่างน้อย 5 ตัวอักษร"),
  ],
  userController.register
);

router.post(
  "/login",
  [
    body("email")
      .not()
      .isEmpty()
      .withMessage("กรุณาป้อนอีเมลด้วย")
      .isEmail()
      .withMessage("รูปแบบอีเมลไม่ถูกต้อง"),
    body("password")
      .not()
      .isEmpty()
      .withMessage("กรุณาป้อนรหัสผ่านด้วย")
      .isLength({ min: 5 })
      .withMessage("รหัสผ่านต้องมีอย่างน้อย 5 ตัวอักษร"),
  ],
  userController.login
);

router.get("/me", [passportJWT.isLogin], userController.profile);

module.exports = router;
