const mongoose = require("mongoose");

//Asignacion de gerente, supervisor y trabajador con objeto ROLES
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    roles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role"
        }
    ]
});

// userSchema.methods.verifyPassword = function (password) {
//     return bcrypy.compare(password, this.password);
// };

// userSchema.methods.encryptPassword = async (password) => {
//     const salt = await bcrypy.genSalt(10);
//     return bcrypy.hash(password, salt);
// };

module.exports = mongoose.model('User', userSchema);
