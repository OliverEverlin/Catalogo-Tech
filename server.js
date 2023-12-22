require('dotenv').config()

const express = require("express");
const cors = require("cors");
const app = express();
const bcrypt = require('bcrypt')


app.use(cors());
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.role;
const User = db.user;

db.mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Welcome to the jungle.");
        initial();
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    });

// db.mongoose
// .connect(process.env.DATABASE_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
// .then(() => {
//     console.log("Successfully connect to MongoDB.");
//     initial();
// })
// .catch(err => {
//     console.error("Connection error", err);
//     process.exit();
// });

async function initial() {
    // subo los roles
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
        new Role({
            name: "user"
        }).save(err => {
            if (err) {
            console.log("error", err);
            }
            console.log("added 'user' to roles collection");
        });
        new Role({
            name: "admin"
        }).save(err => {
            if (err) {
            console.log("error", err);
            }
            console.log("added 'admin' to roles collection");
        });
        }
    });
    
    //busco usuarios 
    User.findOne({
        name: 'liverlin'
    }).exec(async (err, user) => {
        if (err) {
        res.status(500).send({ message: err });
        return;
        }
        if (!user) {
            const salt = await bcrypt.genSalt();
            //console.log(salt+'ABASD');
            //console.log(process.env.PASSWORD);
            const user = new User({
                name: 'liverlin',
                email: 'a20196445@pucp.edu.pe',
                password: bcrypt.hashSync(process.env.PASSWORD, salt)
            });
            user.save((err, user) => {
            
            if (err) {
                console.log({ message: err });
                return;
            }
            Role.findOne({ name: "admin" }, (err, role) => {
                if (err) {
                    console.log({ message: err });
                    return;
                }
                user.roles = [role._id];
                user.save(err => {
                    if (err) {
                    console.log({ message: err });
                    return;
                    }
                    console.log({ message: "User was registered successfully!" });
                });
                });
            })
        }
    })
}

// simple route
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to Oliver's E-commerce API.",
        routes: {
            auth: {
                signIn: "POST /auth/signin",
                signUp: "POST /auth/signup"
            },
            products: {
                getProducts: "GET /products",
                addProduct: "POST /products",
                deleteProduct: "DELETE /products/:id",
                editProduct: "PATCH /products/:id"
            },
            users: {
                getUsers: "GET /users",
                getUser: "GET /user",
                deleteUser: "DELETE /user",
                editUser: "PATCH /user"
            },
            cart: {
                getCart: "GET /cart",
                addProductToCart: "POST /cart/:id",
                deleteProductFromCart: "PATCH /cart/:id",
                clearCart: "DELETE /cart",
                changeCartItemQty: "PUT /cart/:id",
            }
        }
    });
});

require('./app/routes/auth')(app);
require('./app/routes/user')(app);
require('./app/routes/product')(app);
require('./app/routes/cart')(app);

// app.use((req, res, next) => {
//     res.status(404).json({
//         message: "Página no encontrada"
//     });
// });

// set port, listen for requests
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});