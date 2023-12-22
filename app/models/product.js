//los productos que tiene la tienda
const mongoose = require("mongoose");
//otra manera de mongoose
//const Product = mongoose.model("Product",new mongoose.Schema({
//...); 
//module.exports = Product;

//uso number para precios, proximo a corregirse
const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    img: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: false,
    },
    qty: {
        type: Number,
        required: false,
    },
});

module.exports = mongoose.model('Product', productSchema);