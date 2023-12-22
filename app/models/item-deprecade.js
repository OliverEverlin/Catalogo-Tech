const mongoose = require("mongoose");
//los productos que se llevaria el consumidor
const itemSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    unitPrice: {
        type: Number,
        required: false,
    },
    quantity: {
        type: Number,
        required: false,
    },
});

module.exports = mongoose.model('Item', itemSchema);