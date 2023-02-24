const express = require("express");
const router = express.Router();
const shopController = require("../controllers/shopController");
const { body } = require("express-validator");

router.get("/", shopController.index);
router.get("/product", shopController.product);
router.get("/:id", shopController.show);

router.post(
  "/",
  [
    body("name").not().isEmpty().withMessage("กรุณาป้อนชื่อร้านค้าด้วย")
  ],
  shopController.insert
);

module.exports = router;
