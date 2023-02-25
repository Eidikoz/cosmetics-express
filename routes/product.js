const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { body } = require("express-validator");
const {isLogin} = require("../middleware/passportJWT");
const {isAdmin} = require("../middleware/checkAdmin");

router.get("/", productController.index);
router.get("/b/:bra", productController.brand);
router.get("/:id", productController.show);
router.delete(
    "/:id",
    [
        isLogin,isAdmin
    ], productController.delete
);

router.put(
  "/:id",
  [
    body("name")
      .not()
      .isEmpty()
      .withMessage("Please type product name"),
    body("website")
      .not()
      .isEmpty()
      .withMessage("Please type product website")
      .isURL()
      .withMessage("Wrong format"),
      isLogin,isAdmin
  ], productController.update
);

router.post(
  "/",
  [
    body("name")
      .not()
      .isEmpty()
      .withMessage("Please type product name"),
    body("website")
      .not()
      .isEmpty()
      .withMessage("Please type product website")
      .isURL()
      .withMessage("Wrong format"),
    body("description")
      .not()
      .isEmpty()
      .withMessage("Please type product website"),
      isLogin,isAdmin
  ],
  productController.insert
);

module.exports = router;