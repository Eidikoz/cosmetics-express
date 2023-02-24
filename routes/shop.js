const express = require("express");
const router = express.Router();
const shopController = require("../controllers/shopController");
const { body } = require("express-validator");
const {isLogin} = require("../middleware/passportJWT");
const {isAdmin} = require("../middleware/checkAdmin");

router.get("/", shopController.index);
router.get("/product", shopController.product);
router.get("/:id", shopController.show);
router.delete("/:id",[isLogin,isAdmin], shopController.delete);
router.put(
  "/:id",
  [
    body("name")
      .not()
      .isEmpty()
      .withMessage("Please type shop name"),
    body("website")
      .not()
      .isEmpty()
      .withMessage("Please type shop website")
      .isURL()
      .withMessage("Wrong format"),
      isLogin,isAdmin
  ], shopController.update
);

router.post(
  "/",
  [
    body("name")
      .not()
      .isEmpty()
      .withMessage("Please type shop name"),
    body("website")
      .not()
      .isEmpty()
      .withMessage("Please type shop website")
      .isURL()
      .withMessage("Wrong format"),
    body("description")
      .not()
      .isEmpty()
      .withMessage("Please type shop website"),
      isLogin,isAdmin
  ],
  shopController.insert
);

module.exports = router;
