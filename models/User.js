const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    resetToken: String,
    resetTokenExpiry: Date
});

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.generateResetToken = function () {
    this.resetToken = crypto.randomBytes(32).toString('hex');
    this.resetTokenExpiry = Date.now() + 3600000; // 1 hour expiry
};

module.exports = mongoose.model('User', userSchema);
