const Shop = require("../models/shop");
const { validationResult } = require("express-validator");
const Product = require("../models/product");

exports.index = async (req, res, next) => {
  const shopResult = await Shop.find().sort({_id:-1});

  return res.status(200).json({ data: shopResult });
};

exports.show = async (req, res, next) => {
  try {
    const {id} = req.params;
    const result = await Shop.findById(id).populate('product');
    if(!result){
      throw new Error('Shop not found');
    }
    return res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

exports.product = async (req, res, next) => {
  try {
    const product = await Product.find().populate("shop");

    res.status(200).json({
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

exports.insert = async (req, res, next) => {
  try {
    const { name, website, description} = req.body;

    // validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Wrong data");
      error.statusCode = 422;
      error.validation = errors.array();
      throw error;
    }

    let shop = new Shop({
      name: name,
      website: website,
      description: description,
    });
    await shop.save();

    res.status(201).json({
      message: "Add successfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req,res,next) => {
  const {id} = req.params
  const shopResult = await Shop.deleteOne({_id:id});

  return res.status(200).json({message:"Deleted",data: shopResult})
};

exports.update = async (req,res,next) => {
  try{
      const {id} = req.params;
      const {name,website} = req.body;
      const shopResult = await Shop.findByIdAndUpdate(id,{
          name: name,
          website: website
      });
      if(!shopResult){
          throw new Error("shop not found");
      }
      const result = await shopResult.save();

      return res.status(200).json({ message:"Updated "+(result!=null) });
  }catch(error){
      next(error)
  }
};
