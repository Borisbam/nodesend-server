const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { check } = require('express-validator');
const auth = require('../middleware/auth');

router.post('/',
    [
        check('email', 'Email is not valid').isEmail(),
        check('password', 'Password is required').not().isEmpty(),
        check('password', 'Password require al least 6 characters').isLength({ min: 6 })
    ],
    authController.authenticateUser
);

router.get('/',
    auth,
    authController.authenticatedUser
);

module.exports = router;