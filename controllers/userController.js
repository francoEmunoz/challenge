const User = require("../models/User");

const userController = {
    signUp: async (req, res) => {
        let { email, username, name, password, confirmPassword  } =
            req.body;
        try {
            let user = await User.findOne({ email });
            if (!user) {
                if (password == confirmPassword) {
                    user = await new User({
                        email,
                        username,
                        name,
                        password,
                        confirmPassword
                    }).save();
                    res.status(201).json({
                        email: user.email,
                        username: user.username,
                        name: user.name
                    });
                } else {
                    return res.status(400).json({
                        message: "Passwords do not match",
                        success: false,
                    });
                }
            } else {
                res.status(200).json({
                    message: "User already exists",
                    success: false,
                });
            }
        } catch (error) {
            res.status(400).json({
                message: error.message,
                success: false,
            });
        }
    },

    login: async (req, res) => {
        const { email, password } = req.body;
        try {
            const user = await User.findOne({ email });
            if (user) {
                if (user.password === password) {
                    res.status(200).json({
                        email: user.email,
                        username: user.username,
                        name: user.name,
                        message: "Login successful",
                        success: true
                    });
                } else {
                    res.status(401).json({
                        message: "Invalid password",
                        success: false
                    });
                }
            } else {
                res.status(404).json({
                    message: "User not found",
                    success: false
                });
            }
        } catch (error) {
            res.status(400).json({
                message: error.message,
                success: false
            });
        }
    }
    
};
module.exports = userController;