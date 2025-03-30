const User = require("../Models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config(); // Load environment variables

const JWT_SECRET =  "thisisme"; // Use env variable

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    //  Hash password before creating user )
    const hashedPassword = bcrypt.hashSync(password, 8);

    // Create new user
    user = new User({ name, email, password: hashedPassword, role });
    await user.save();

    // Generate JWT Token 
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "7d", // Token valid for 7 days
    });

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};



exports.Login = async (req, res) => {
    const {email,password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({message:"Please Register"})
        }

        const isMatch = await user.comparePassword(password)
        if(!isMatch){
            return res.status(400).json({message:"Invalid password"})
        }

        //genrate token 
        const token = jwt.sign({id:user._id} , JWT_SECRET,{expiresIn:"1d"})

        res.status(200).json({
            message:"Login Success",
            token,
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                role:user.role
            }
        })
    } catch (error) {
        return res.status(500).json({message:`Server Error ${error}`})   

    }}


    exports.getUser = async (req, res) => {
        try {
            
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                return res.status(401).json({ message: "No token provided, authorization denied" });
            }
    
            
            const token = authHeader.split(" ")[1];
    
            const decoded = jwt.verify(token, JWT_SECRET);
            const userId = decoded.id; 
            const user = await User.findById(userId).select("name");
            const profilepic =`https://api.multiavatar.com/${userId}.svg`;
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
    
            res.status(200).json({
                message: "User found",
                user,
                profilepic
            });
    
        } catch (error) {
            return res.status(500).json({ message: "Server Error", error: error.message });
        }
    };
    