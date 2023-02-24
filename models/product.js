const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const menuSchema = new Schema({
    name: {type: String, required:true, trim:true},
    price: {type: Number},
    shop: {type: Schema.Types.ObjectId,ref: 'shops'}
},{
    toJSON: { virtuals: true},
    timestamps: true,
    collection:"products"
});

menuSchema.virtual('price_vat').get(function(){
    return this.price*1.07;
})

const menu = mongoose.model("products",menuSchema,"products");
module.exports = menu;