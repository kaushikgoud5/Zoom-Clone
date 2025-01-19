const User = require("../models/users");
const {setUser, getUser} =require('../services/auth');

async function handleUserSignup(req, res) {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    return res
      .status(200)
      .json({ message: "Registration successful", user: savedUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
async function handleUserLogin(req,res){
    try{
        const { email, password  } = req.body;
        if (!email || !password) {
          return res.status(400).json({ error: "Email and password are required." });
      }
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(401).json({ error: "Invalid username or password." });
        }
        const isPasswordMatch = user.password === password;
        if (!isPasswordMatch) {
          return res.status(401).json({ error: "Invalid username or password." });
      }
      const token = setUser(user);  
      res.cookie("token",token)
      return res.status(200).json({
        message: "Login successful",
        token,
        username: user.username
    }); 
    }
    catch{
      console.error("Login error:", error);
      return res.status(500).json({ error: "Internal server error. Please try again later." });
    }
}


module.exports={
    handleUserSignup,handleUserLogin
} 