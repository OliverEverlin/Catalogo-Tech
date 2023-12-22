
//ya no se usar esta coneccion 

// const express = require('express');
// const mongoose = require("mongoose");   //para conectar con BD
// require("dotenv").config();

// const userRoutes = require("./routes/user");


// const app = express();
// const port = process.env.PORT || 9000; //Para hosteo, en caso no tome el puerto 9000

// //middleware
// app.use(express.json());
// app.use('/api', userRoutes);


// //routes
// app.get('/',(req, res) => {
//     res.send("Welcome to the jungle");
// });

// //mongo db conection
// mongoose
//     .connect(process.env.MONGODB_URI)
//     .then(() => console.log("Conectado a MongoDB Atlas"))
//     .catch((err) => console.error(err));

// app.listen(port, () => console.log('server listening on port', port));