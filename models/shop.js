const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shopSchema = new Schema(
  {
    name: { 
      type: String, 
      required: true, 
      trim: true 
    },
    website: { 
      type: String, 
      required: true, 
      trim: true 
    },
    description: { 
      type: String, 
      required: true, 
      trim: true 
    }
  },
  { collection: "shops", timestamps: true, toJSON: { virtuals: true } }
);

shopSchema.virtual("products", {
  ref: "products",
  localField: "_id",
  foreignField: "shop",
});

const shop = mongoose.model("Shops", shopSchema);

module.exports = shop;