const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    products: {
        type: Array,
        required: false,
        default: []
    }
});



module.exports = mongoose.model('Cart', cartSchema);

//estructura con items antigua
// items: {
//     type: Array,
//     items: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "item",
//     },
// },
// id: {
//     type: String,
//     required: true,
// },
// user: {
//     type: String,
//     required: false,
// },
// total: {
//     type: Number,
//     required: false,
// },