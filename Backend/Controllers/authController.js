const User = require("../Models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


const JWT_SECRET =  "thisisme"; // Use env variable

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // ✅ No manual hashing here!
    user = new User({ name, email, password, role });
    await user.save(); // The pre-save hook will hash the password

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "7d",
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
    



    exports.getUserDetails = async (req, res) => {
        try {
          const userId = req.body.userId; // Get the user ID from the request body
          if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
          }
      
          // Fetch the user details by ID without checking for a token
          const user = await User.findById(userId).select("-password"); // Don't return the password in response
          if (!user) {
            return res.status(404).json({ message: "User not found" });
          }
      
          res.json(user); // Return the user details
        } catch (error) {
          res.status(500).json({ message: "Server Error", error: error.message });
        }
      };
      

// Update user details
 exports.updateUserDetails = async (req, res) => {
  try {
      const userId = req.body.userId; // Get the user ID from the request body
      if (!userId) {
          return res.status(400).json({ message: "User ID is required" });
      }

      const updatedDetails = req.body; // Collect details from the request body
      delete updatedDetails.userId; // Remove userId from the body before saving

      const user = await User.findByIdAndUpdate(userId, updatedDetails, { new: true });
      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      res.json(user); // Return the updated user
  } catch (error) {
      res.status(500).json({ message: "Server Error", error: error.message });
  }
};
