const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { body } = require("express-validator");
const {isLogin} = require("../middleware/passportJWT");
const {isAdmin} = require("../middleware/checkAdmin");

router.get("/", productController.index);
router.get("/b/:bra", productController.brand);
router.get("/s/:sea", productController.search);
router.get("/:id", productController.show);
router.delete("/:id",[isLogin,isAdmin], productController.delete);

router.put(
  "/:id",
  [
    body("name")
      .not()
      .isEmpty()
      .withMessage("Please type product name"),
    body("price")
      .not()
      .isEmpty()
      .withMessage("Please type product price")
      .isNumeric()
      .withMessage("Price must be numeric"),
    body("brand")
      .not()
      .isEmpty()
      .withMessage("Please type product brand"),
    body("shop")
      .not()
      .isEmpty()
      .withMessage("Please type product shop id"),
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
    body("price")
      .not()
      .isEmpty()
      .withMessage("Please type product price")
      .isNumeric()
      .withMessage("Price must be numeric"),
    body("brand")
      .not()
      .isEmpty()
      .withMessage("Please type product brand"),
    body("shop")
      .not()
      .isEmpty()
      .withMessage("Please type product shop id"),
      isLogin,isAdmin
  ],
  productController.insert
);

module.exports = router;