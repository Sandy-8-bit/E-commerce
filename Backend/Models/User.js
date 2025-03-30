const bcrypt = require("bcryptjs")
const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    name:{type : String,required : true},
    email:{type :String,required : true},
    password:{type :String, required:true},
    role : {type : String , enum:["user","admin"], default:"user"},
} , {timestamps : true});


userSchema.pre("save", async function (next){
    if(!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(8);
    this.password = await bcrypt.hash(this.password,salt)
    next();
})



userSchema.methods.comparePassword = async function (password){
    return await bcrypt.compare(password,this.password);

}



module.exports = mongoose.model("User",userSchema)

