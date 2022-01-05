const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

require('dotenv').config({ path: 'variables.env' })


exports.authenticateUser = async (req, res, next) => {

    // Check if errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ msg: errors.array()[0].msg });
    }
    // Check if user exists
    const { email, password } = req.body;
    const user = await User.findOne({ email })
    if (!user) {
        res.status(401).json({ msg: "El usuario no existe" });
        return next();
    }

    // Check correct password and validate user
    if (bcrypt.compareSync(password, user.password)) {

        //Create JWT
        const token = jwt.sign({
            id: user._id,
            name: user.name,
            email: user.email
        }, process.env.SECRETA, {
            expiresIn: '8h'
        });
        res.status(200).json({ msg: "Authenticated", token: token});

    } else {
        res.status(400).json({ msg: "Contraseña Incorrecta" });
        return next();
    }
}

exports.authenticatedUser = async (req, res, next) => {
        res.json({user: req.user})
}