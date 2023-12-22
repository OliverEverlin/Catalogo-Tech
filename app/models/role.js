const mongoose = require("mongoose");
const Role = mongoose.model(
    "Role",
    new mongoose.Schema({
        name: String
    })
);
module.exports = Role;

//Other way to do :v

// const mongoose = require("mongoose");
// const roleSchema = mongoose.Schema({
//     name: {
//         type: String
//     }
// });
// module.exports = mongoose.model('Role', roleSchema);