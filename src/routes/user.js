const express = require('express');
const userSchema = require("../models/user");

const router = express.Router();

// Create user
router.post('/users', (req, res)=>{
    const user= userSchema(req.body);
    user
        .save()
        .then((data) => res.json(data))
        .catch((err) => res.json({ message: err }));

    //res.send("create user");
});


//get all users
router.get('/users', (req, res)=>{
    userSchema
        .find()
        .then((data) => res.json(data))
        .catch((err) => res.json({ message: err }));
});

//get a user
router.get("/users/:id", (req, res)=>{
    const { id }= req.params;
    userSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((err) => res.json({ message: err }));
});

// delete a user
router.delete("/users/:id", (req, res) => {
    const { id } = req.params;
    userSchema
        .deleteOne({ _id: id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});


//update a user
router.put("/users/:id", (req, res)=>{
    const { id }= req.params;
    const {name, age, password} = req.body;
    userSchema
        .updateOne({_id: id },{ $set: { name, age, password } })
        .then((data) => res.json(data))
        .catch((err) => res.json({ message: err }));
});




module.exports = router;