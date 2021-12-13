const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const userController = require('../controllers/userController')

router.post('/', 
    [
        check('name', 'Name is required').not().isEmpty(),        
        check('email', 'Email is not valid').isEmail(),
        check('password', 'Password is required').not().isEmpty(),
        check('password', 'Password require al least 6 characters').isLength({min: 6})
    ],
    userController.newUser

);

module.exports = router;