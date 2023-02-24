const Shop = require("../models/shop");
const { validationResult } = require("express-validator");
const Product = require("../models/product");
const config = require("../config");

exports.index = async (req, res, next) => {
  const staffResult = await staffs.find().sort({_id:-1});

  return res.status(200).json({ data: staffResult });
};

exports.product = async (req, res, next) => {
  try {
    const menus = await Product.find().populate("shop");

    res.status(200).json({
      data: menus,
    });
  } catch (error) {
    next(error);
  }
};

exports.show = async (req, res, next) => {
  try {
    const {id} = req.params;
    const result = await shops.findOne({_id: id}).populate('product');
    if(!result){
      throw new Error('Shop not found');
    }
    return res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

exports.insert = async (req, res, next) => {
  try {
    const { name, location, photo } = req.body;

    // validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("ข้อมูลที่ได้รับมาไม่ถูกต้อง");
      error.statusCode = 422;
      error.validation = errors.array();
      throw error;
    }

    let shop = new Shop({
      name: name,
      location: location,
      photo: photo && (await saveImageToDisk(photo)),
    });
    await shop.save();

    res.status(201).json({
      message: "เพิ่มข้อมูลเรียบร้อยแล้ว",
    });
  } catch (error) {
    next(error);
  }
};
