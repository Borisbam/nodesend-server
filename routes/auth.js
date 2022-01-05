const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { check } = require('express-validator');
const auth = require('../middleware/auth');

router.post('/',
    [
        check('email', 'Email no válido').isEmail(),
        check('password', 'Contraseña requerida').not().isEmpty(),
        check('password', 'La contraseña requiere al menos 6 caractéres').isLength({ min: 6 })
    ],
    authController.authenticateUser
);

router.get('/',
    auth,
    authController.authenticatedUser
);

module.exports = router;