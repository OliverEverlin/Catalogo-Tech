const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const db = {};

db.mongoose = mongoose;
db.user = require('./user');
db.role = require("./role");
db.cart = require('./cart');
db.product = require('./product');
//db.item = require('./item-deprecade');
db.ROLES = ['user','admin'];
// - Gerente: CRUD: Trabajador, supervisor y productos -> admin
// - Supervisor: CRUD productos,
// - Trabajador: RUD productos, -> user
module.exports = db;