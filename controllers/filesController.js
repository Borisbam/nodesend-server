const multer = require('multer');
const shortid = require('shortid');
const fs = require('fs');
const Links = require('../models/Link');

exports.uploadFile = async (req, res, next) => {

    const multerconfig = {
        limits: { fileSize: (req.user ? 100000000 : 5000000) },
        storage: fileStorage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, __dirname + '/../uploads')
            },
            filename: (req, file, cb) => {
                const extension = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
                cb(null, `${shortid.generate()}${extension}`)
            }

        })
    }

    const upload = multer(multerconfig).single('file');

    upload(req, res, async (error) => {

        if (!error) {
            res.json({ archivo: req.file.filename, image: req.body.image })
        } else {
            console.log(error)
            return next();
        }
    })
}

exports.deleteFile = async (req, res) => {


    try {
        fs.unlinkSync(__dirname + `/../uploads/${req.file}`)
    } catch (error) {

    }
}

exports.download = async (req, res, next) => {
    // Take link
    const { file } = req.params;
    const link = await Links.findOne({ url: file});
    const { downloads, nombre, nombre_original } = link;
    const downloadFile = __dirname + '/../uploads/' + nombre;
    res.download(downloadFile, nombre_original);

    
    // If downloads = 1, delete file
    if (downloads === 1) {

        // Delete file
        req.file = name;
        // Delete in DB

        await Links.findOneAndRemove(link.id)
        next();
    } else {
        // If downloads < 1, downlad--;
        link.downloads--;
        await link.save();

    }
}