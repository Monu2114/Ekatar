// authController.js
const User = require("../model/User");
const bcrypt = require("bcrypt");

exports.register = async (req, res, next) => {
    const { username, password } = req.body;
    
    // Validate password length
    if (password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create a new user with hashed password
        const user = await User.create({ username, password: hashedPassword });

        res.status(200).json({ message: "User successfully created", user });
    } catch (err) {
        res.status(401).json({ message: "User not successfully created", error: err.message });
    }
};

exports.login = async (req, res, next) => {
    const { username, password } = req.body;

    // Check if username and password are provided
    if (!username || !password) {
        return res.status(400).json({ message: "Username or Password not present" });
    }

    try {
        // Find user by username
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: "Login not successful", error: "User not found" });
        }

        // Compare passwords
        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return res.status(401).json({ message: "Login not successful", error: "Invalid password" });
        }

        // If username and password are valid, send success response
        res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
};
