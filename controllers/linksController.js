const Links = require('../models/Link');
const shortid = require('shortid');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

exports.newLink = async (req, res, next) => {


    // Check errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json(errors);
    }
    // Create Link object
    const { nombre_original, nombre, password, downloads, image } = req.body;

    const link = new Links();
    link.url = shortid.generate();
    link.nombre = nombre;
    link.nombre_original = nombre_original;
    link.image = image;

    // If User Authenticated
    if (req.user) {
        
        if (downloads) {
            link.downloads = downloads;
        }
        if(password) {
            const salt = await bcrypt.genSalt(10);
            link.password = await bcrypt.hash( password, salt );
        }

        link.author = req.user.id;
    }    

    // Save to DB
    try {
        await link.save();
        return res.json({ msg : `${link.url}` });
    } catch (error) {
        console.log(error);
    }
}

// Take all links list

exports.allLinks = async ( req, res) => {

    try {
        const links = await Links.find({}).select('url -_id');
        res.json({links});
    } catch (error) {
        console.log(error);
    }
}

// Take link

exports.takeLink = async (req, res, next) => {

    const { url } = req.params;

    // Check if link exists
    const link = await Links.findOne({ url });
    if(!link) {
        res.status(404).json({msg: 'El enlace no existe'});
        return next();
    }

    // If link exists
    res.json({file: link.nombre, original_name: link.nombre_original, password: false, image: link.image})

    next();
}

// Retorna si el enlace tiene password o no
exports.hasPassword = async (req, res, next) => {

    
    const { url } = req.params;

    // Verificar si existe el enlace
    const link = await Links.findOne({ url });

    if(!link) {
        res.status(404).json({msg: 'El enlace no existe'});
        return next();
    }

    if(link.password) {
        return res.json({ password: true, link: link.url });
    }

    next();
}

exports.verifyPassword = async (req, res, next) => {
    
    const { url } = req.params;
    const { password } = req.body;

    // Check Link
    const link = await Links.findOne({ url });

    //Verify Password
    if(bcrypt.compareSync(password, link.password)) {
        // Enable user to download file        
        next();
    } else {
        return res.status(401).json({msg: 'Contraseña Incorrecta'})
    }    
    
}