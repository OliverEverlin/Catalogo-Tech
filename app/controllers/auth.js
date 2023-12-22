const db = require("../models");
const User = db.user;
const Role = db.role;
const Cart = db.cart;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

//crear una nueva cuenta 
exports.signup = async (req, res) => {
    const salt = await bcrypt.genSalt()
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, salt)
    });

    //envio este user a guardarse
    user.save((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        //condition si tengo algun rol asignado
        if (req.body.roles) {
            Role.find(
                {
                name: { $in: req.body.roles }
                },
                (err, roles) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                    user.roles = roles.map(role => role._id);
                    user.save(err => {
                        if (err) {
                        res.status(500).send({ message: err });
                        return;
                        }
                        res.send({ message: "User was registered successfully!" });
                    });
                }
            );
        } else {
        Role.findOne({ name: "user" }, (err, role) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            user.roles = [role._id];
            user.save(err => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                res.send({ message: "User was registered successfully!" });
            });
        });
        }
    });

    //le creo un carrito con su id de user
    const cart = new Cart({
        userId: user._id,
        quantity: 0,
        total: 100,
    })
    cart.save(err => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
    })
};

//inicia sesion o login
exports.signin = (req, res) => {
    //buscamos al usuario
    User.findOne({  name: req.body.name })
        .populate("roles", "-__v") //incluye roles
        .exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }
        //si lo encontramos y la constraseña es correcta
        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );
        if (!passwordIsValid) {
            return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
            });
        }
        //generamos el token y puedo estar con mi sesion inciada por 1 dia
        var token = jwt.sign({ id: user.id }, process.env.SECRET, {
            expiresIn: 86400 // 24 hours
        });
        //asigno los "poderes" deacuerdo al rol del usuario
        var authorities = [];
        for (let i = 0; i < user.roles.length; i++) {
            authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
        }
        res.status(200).send({
            id: user._id,
            name: user.name,
            email: user.email,
            roles: authorities,
            accessToken: token
        });
    });
};