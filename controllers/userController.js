const User = require('../models/User');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
exports.newUser = async (req, res) => {

    // Express Validator
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }
    // Check if user already created
    const { email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) {
        return res.status(400).json({ msg: "El usuario ya existe" })
    }


    // Create new user
    user = new User(req.body);

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);


    

    try {
        await user.save();

        //Create JWT
        const token = jwt.sign({
            id: user._id,
            name: user.name,
            email: user.email
        }, process.env.SECRETA, {
            expiresIn: '8h'
        });
        res.status(200).json({ token: token, msg: 'Usuario creado correctamente'});
    } catch (error) {
        console.log(error);
    }

}