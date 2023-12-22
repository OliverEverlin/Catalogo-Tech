const { authJwt } = require("../middlewares");
const finders = require("../middlewares/finders");
const controller = require("../controllers/product");

//se delega CRUD al controller
module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.get("/products", controller.getAll);
    // app.post("/products", [true, true, finders.findUser], controller.addProduct);
    // app.delete("/products/:id", [true, true, finders.findProduct, finders.findUser], controller.removeProduct);
    // app.patch("/products/:id", [true, true, finders.findProduct, finders.findUser], controller.updateProduct);

    app.post("/products", [authJwt.verifyToken, authJwt.isAdmin, finders.findUser], controller.addProduct);
    app.delete("/products/:id", [authJwt.verifyToken, authJwt.isAdmin, finders.findProduct, finders.findUser], controller.removeProduct);
    app.patch("/products/:id", [authJwt.verifyToken, authJwt.isAdmin, finders.findProduct, finders.findUser], controller.updateProduct);
};



//PAST WAY -------------------------------- with out MVC arquitecture

// const express = require('express');
// const userSchema = require("../models/product");

// const router = express.Router();

// // Create product
// router.post('/product', (req, res)=>{
//     const user= userSchema(req.body);
//     user
//         .save()
//         .then((data) => res.json(data))
//         .catch((err) => res.json({ message: err }));
//     //res.send("create user");
// });


// //get all products
// router.get('/product', (req, res)=>{
//     userSchema
//         .find()
//         .then((data) => res.json(data))
//         .catch((err) => res.json({ message: err }));
// });

// //get a product
// router.get("/product/:id", (req, res)=>{
//     const { id }= req.params;
//     userSchema
//         .findById(id)
//         .then((data) => res.json(data))
//         .catch((err) => res.json({ message: err }));
// });

// // delete a product
// router.delete("/product/:id", (req, res) => {
//     const { id } = req.params;
//     userSchema
//         .deleteOne({ _id: id })
//         .then((data) => res.json(data))
//         .catch((error) => res.json({ message: error }));
// });


// //update a product
// router.put("/product/:id", (req, res)=>{
//     const { id }= req.params;
//     const {name, age, password} = req.body;
//     userSchema
//         .updateOne({_id: id },{ $set: { name, age, password } })
//         .then((data) => res.json(data))
//         .catch((err) => res.json({ message: err }));
// });

// module.exports = router;