const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const db = require('../models')
const User = db.user;
const emailSend = require('../config/email')

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.json({users})
    } catch (err){
        res.status(500).json({message: err.message})
    }
}

exports.getUser = async (req, res) => {
    let user = res.user
    try {
        res.status(200).json({user})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

exports.removeUser = async (req, res) => {
    let user = res.user
    let cart = res.cart
    let { email, name } = res.user
    //CREO QUE NO SE ESTA USANDO    
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Account Removed',
        text: `
    Hi ${name}

    Your account has been successfully removed. Thanks for shopping!
        `
    };
    try {
        await user.deleteOne()
        await cart.deleteOne()
        
        // emailSend.transporter.sendMail(mailOptions, function(error){
        //   if (error) {
        //     console.log(error);
        //     res.status(400).send({msg: "Email not sent"})
        //   }
        // });
        res.status(201).json({message: "User removed!"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

exports.editUser = async (req, res) => {
    let { name, email, password} = req.body
    let userEmail = res.user.email
    const salt = await bcrypt.genSalt()
        
    const mailOptions = {
        from: process.env.EMAIL,
        to: userEmail,
        subject: 'Account Edited',
        text: `
    Hi ${res.user.name}. 
    
    You Account has been edited.
        `
    };
    try {
        if(name) {
            res.user.name = name
        }
        if(email) {
            res.user.email = email
        }
        if(password) {
            res.user.password = bcrypt.hashSync(req.body.password, salt)
        }
        
        // emailSend.transporter.sendMail(mailOptions, function(error){
        //   if (error) {
        //     console.log(error);
        //     res.status(400).send({msg: "Email not sent"})
        //   }
        // });
        
        let token = jwt.sign({ id: res.user._id }, process.env.SECRET, {
            expiresIn: 86400 // 24 hours
        });

        const upadatedUser = await res.user.save()
        res.status(201).json({upadatedUser, accessToken: token})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

////////////////////////////////OTHER WAYS////////////////////////////////
// const User = require("../models/user"); // Importar el modelo de usuario
// //const controller = require("../controllers/user.controller"); --> pronto cambiare eso
// const finders = require("../middlewares/finders")

// exports.createUser = async (req, res) => {
//     try {
//         const user = new User(req.body);
//         const savedUser = await user.save();
//         res.json(savedUser);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// };

// exports.getAllUsers = async (req, res) => {
//     try {
//         const users = await User.find();
//         res.json(users);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

// exports.getUserById = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const user = await User.findById(id);

//         if (!user) {
//         return res.status(404).json({ message: "User not found" });
//         }

//         res.json(user);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

// exports.updateUser = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { name, age, password } = req.body;

//         const updatedUser = await User.findByIdAndUpdate(id, {
//         name,
//         age,
//         password,
//         }, { new: true });

//         if (!updatedUser) {
//         return res.status(404).json({ message: "User not found" });
//         }

//         res.json(updatedUser);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// };

// exports.deleteUser = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const deletedUser = await User.findByIdAndDelete(id);

//         if (!deletedUser) {
//         return res.status(404).json({ message: "User not found" });
//         }

//         res.json({ message: "User deleted successfully" });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };



// const User = require('../models/user');

// module.exports = {
//     index: (req, res) => {
//         const users = User.find();
//         res.send(users);
//     },
//     create: (req, res) => {
//         const user = new User({
//         name: req.body.name,
//         email: req.body.email,
//         });

//         user.save((err) => {
//         if (err) {
//             return res.send(err);
//         }

//         res.send(user);
//         });
//     },
//     update: (req, res) => {
//         const user = User.findById(req.params.id);

//         if (!user) {
//         return res.send(404);
//         }

//         user.name = req.body.name;
//         user.email = req.body.email;

//         user.save((err) => {
//         if (err) {
//             return res.send(err);
//         }

//         res.send(user);
//         });
//     },
//     delete: (req, res) => {
//         const user = User.findById(req.params.id);

//         if (!user) {
//         return res.send(404);
//         }

//         user.remove((err) => {
//         if (err) {
//             return res.send(err);
//         }

//         res.send(200);
//         });
//     },
// };