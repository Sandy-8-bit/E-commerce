const express = require("express");
const mongoose = require('mongoose')
const dotenv = require("dotenv");
const PORT = 5000;
const MONGO_URI = "mongodb://localhost:27017/E-commerce";
const app = express();
const routes = require("../Backend/Routes/authRoutes")

const cors = require("cors");
app.use(cors());

mongoose.connect(MONGO_URI)
.then(()=>console.log("Connected to db"))
.catch((error)=> console.log(error))

app.use(express.json());
app.use(routes);





app.listen(PORT,()=> console.log(`Server is running in the ${PORT}`));
