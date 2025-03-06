const express = require('express');
const { register, login ,  forgotPassword, resetPassword} = require('../controllers/authController');
const { check } = require('express-validator');

const router = express.Router();

router.post('/register', [
    check('username', 'Username is required').notEmpty(),
    check('email', 'Valid email is required').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 })
], register);

router.post('/login', login);

router.post('/forgot-password', [check('email', 'Valid email is required').isEmail()], forgotPassword);
router.post('/reset-password', [
    check('newPassword', 'Password must be at least 6 characters').isLength({ min: 6 })
], resetPassword);

module.exports = router;
