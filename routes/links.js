const express = require('express');
const router = express.Router();
const linksController = require('../controllers/linksController');
const { check } = require('express-validator');
const auth = require('../middleware/auth');

router.post('/',
    auth,
    
    auth ? ([
        check('nombre', 'Upload a file').not().isEmpty(),
        check('nombre_original', 'Name the file').not().isEmpty()
        
    ]): null,
    linksController.newLink,

);

router.get('/',
    linksController.allLinks
)

router.get('/:url',
    linksController.hasPassword,
    linksController.takeLink
)

router.post('/:url',
    linksController.verifyPassword,
    linksController.takeLink
)

module.exports = router;