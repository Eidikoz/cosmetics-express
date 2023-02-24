const User = require("../models/user");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("../config");

exports.index = async (req, res, next) => {
  const userResult = await User.find().sort({_id:-1});

  return res.status(200).json({ data: userResult });
};

exports.show = async (req, res, next) => {
  try {
    const {id} = req.params;
    const result = await User.findById(id)
    if(!result){
      throw new Error('User not found');
    }
    return res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req,res,next) => {
  const {id} = req.params
  const userResult = await User.deleteOne({_id:id});

  return res.status(200).json({message:"Deleted",data: userResult})
};

exports.update = async (req,res,next) => {
  try{
      const {id} = req.params;
      const {name,website} = req.body;
      const userResult = await User.findByIdAndUpdate(id,{
          name: name,
          website: website
      });
      if(!userResult){
          throw new Error("User not found");
      }
      const result = await userResult.save();

      return res.status(200).json({ message:"Updated "+(result!=null) });
  }catch(error){
      next(error)
  }
};

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Wrong data");
      error.statusCode = 422;
      error.validation = errors.array();
      throw error;
    }

    const existEmail = await User.findOne({ email: email });
    if (existEmail) {
      const error = new Error("This email has been used");
      error.statusCode = 400;
      throw error;
    }

    let user = new User();
    user.name = name;
    user.email = email;
    user.password = await user.encryptPassword(password);

    await user.save();

    res.status(201).json({
      message: "Add successfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Wrong data");
      error.statusCode = 422;
      error.validation = errors.array();
      throw error;
    }

    // check email isExist
    const user = await User.findOne({ email: email });
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    const isValid = await user.checkPassword(password);
    if (!isValid) {
      const error = new Error("Wrong password");
      error.statusCode = 401;
      throw error;
    }

    // create token
    const token = await jwt.sign(
      {
        id: user._id,
        // role: user.role,
      },
      config.JWT_SECRET,
      {
        expiresIn: "5 days",
      }
    );

    const expires_in = jwt.decode(token);

    res.status(200).json({
      access_token: token,
      expires_in: expires_in.exp,
      token_type: "Bearer",
    });
  } catch (error) {
    next(error);
  }
};

exports.profile = (req, res, next) => {
  const { role, name, email } = req.user;
  res.status(200).json({
    user: { name, email, role },
  });
};
