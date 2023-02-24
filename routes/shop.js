const express = require("express");
const router = express.Router();
const shopController = require("../controllers/shopController");
const { body } = require("express-validator");

router.get("/", shopController.index);
router.get("/product", shopController.product);
router.get("/:id", shopController.show);
router.delete("/:id", shopController.delete);
router.put("/:id", shopController.update);

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
  ],
  shopController.insert
);

module.exports = router;
