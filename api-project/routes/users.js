const express = require('express');
const { check } = require('express-validator')
const { asyncHandler, handleValidationErrors } = require('../utils');
const router = express.Router();
const { User } = require('..db/models');
const bcrypt = require('bcryptjs');
const { getUserToken } = require('../auth');


const validateUsername =
  check("username")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a username");

const validateEmailAndPassword = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a password."),
];

router.post('/', validateUsername, validateEmailAndPassword, handleValidationErrors, asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    const user = await User.create({ username, email, hashedPassword });

    const token = getUserToken(user);
    res.status(201).json({
        user: { id: user.id },
        token,
    });
}));







module.exports = router;
