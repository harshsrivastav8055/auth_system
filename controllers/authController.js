const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const sendResetEmail = require('../config/email');
const crypto = require('crypto');

// Register
exports.register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
        const { username, email, password } = req.body;
        const user = new User({ username, email, password });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};


exports.forgotPassword = async (req, res) => {
    // const { email } = req.body;
    // console.log("Received forgot password request for:", email); // Debugging log

    try {
        const user = await User.findOne({ email:req.body.email });
        if (!user) {
            console.log("User not found for email:", email);
            return res.status(400).json({ message: 'User not found' });
        }

        // Generate token
        const resetToken = crypto.randomBytes(32).toString('hex');
        user.resetToken = resetToken;
        user.resetTokenExpiry = Date.now() + 3600000; // 1 hour expiry
        await user.save();

        console.log("Generated reset token:", resetToken); // Debugging log

        // Send email
        await sendResetEmail(user.email, resetToken);
        console.log("Reset email sent successfully");

        res.json({ message: 'Reset link sent to email' });
    } catch (error) {
        console.error("Forgot password error:", error); // Log error details
        res.status(500).json({ message: 'Server error' });
    }
};

// Ensure you export the function
exports.resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;
    console.log("Received reset request for token:", token); // Debugging log

    try {
        const user = await User.findOne({ 
            resetToken: token, 
            resetTokenExpiry: { $gt: Date.now() } 
        });

        if (!user || user.tokenExpiry < Date.now()) {
            console.log("Invalid or expired token"); // Debugging log
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        console.log("User found:", user.email); // Debugging log
        user.password = await bcrypt.hash(newPassword, 10);
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;
        await user.save();

        res.json({ message: 'Password reset successful' });
    } catch (error) {
        console.error("Reset password error:", error); // Log error details
        res.status(500).json({ message: 'Server error' });
    }
};
