const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
      type: String, 
      required:true, 
      trim:true
    },
    desc: {type: String, 
      required:true, 
      trim:true
    },
    price: {type: Number},
    brand: {type: String, 
      required:true, 
      trim:true
    },
    shop: {
      type: Schema.Types.ObjectId,ref: 'shops'
    }
},{
    toJSON: { virtuals: true},
    timestamps: true,
    collection:"products"
});

productSchema.virtual('price_vat').get(function(){
    return this.price*1.07;
});

const product = mongoose.model("Products",productSchema);

module.exports = product;