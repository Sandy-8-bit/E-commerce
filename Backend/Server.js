const express = require("express");
const mongoose = require('mongoose')
const dotenv = require("dotenv");
const PORT = 5000;
const MONGO_URI = "mongodb://localhost:27017/E-commerce";
const app = express();
const routes = require("../Backend/Routes/authRoutes")
const product = require("../Backend/Routes/Admin")
const getss = require("../Backend/Routes/Products")
const mail = require("../Backend/Routes/Email")
const cart = require("../Backend/Routes/Cart")

const cors = require("cors");
const router = require("./Routes/Admin");
app.use(cors());

mongoose.connect(MONGO_URI)
.then(()=>console.log("Connected to db"))
.catch((error)=> console.log(error))

app.use(express.json());
app.use(routes);
app.use(product);
app.use(mail);
app.use(getss);
app.use(cart);



app.listen(PORT,()=> console.log(`Server is running in the ${PORT}`));
