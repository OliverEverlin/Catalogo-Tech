const authJwt = require("./authJwt");
const verifySignUp = require("./verifySignUp");
const finders = require("./finders");
//por que no se incluye a finders? :O -> le agregue finders xd
module.exports = {
    authJwt,
    verifySignUp,
    finders
};