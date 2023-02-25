const { validationResult } = require("express-validator");
const Product = require("../models/product");

exports.index = async (req, res, next) => {
  const productResult = await Product.find().sort({_id:-1});

  return res.status(200).json({ data: productResult });
};

exports.show = async (req, res, next) => {
  try {
    const {id} = req.params;
    const result = await Product.findById(id);
    if(!result){
      throw new Error('Product not found');
    }
    return res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

exports.insert = async (req, res, next) => {
  try {
    const { name, price,brand,shop} = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Wrong data");
      error.statusCode = 422;
      error.validation = errors.array();
      throw error;
    }

    let product = new Product({
      name: name,
      price: price,
      brand: brand,
      shop: shop
    });
    await product.save();

    res.status(201).json({
      message: "Add successfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req,res,next) => {
  const {id} = req.params
  const productResult = await Product.deleteOne({_id:id});

  return res.status(200).json({message:"Deleted",data: productResult})
};

exports.update = async (req,res,next) => {
  try{
      const {id} = req.params;
      const {name, price,brand,shop} = req.body;
      const productResult = await Product.findByIdAndUpdate(id,{
        name: name,
        price: price,
        brand: brand,
        shop: shop
      });
      if(!productResult){
          throw new Error("Product not found");
      }
      const result = await productResult.save();

      return res.status(200).json({ message:"Updated "+(result!=null) });
  }catch(error){
      next(error)
  }
};

exports.brand = async (req,res,next) => {
    try {
        const {bra} = req.params;
        const braResult = await Product.find({
          brand: bra,
        });
        if(!braResult){
            throw new Error("Product not found");
        }
        return res.status(200).json({ data: braResult });
    
      } catch (error) {
        next(error);
      }
};

exports.search = async (req,res,next) => {
    try {
        const {sea} = req.params;
        const seaResult = await Product.find({
          name: sea,
        });
        if(!seaResult){
            throw new Error("Product not found");
        }
        return res.status(200).json({ data: seaResult });
    
      } catch (error) {
        next(error);
      }
};