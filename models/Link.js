const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const linksSchema = new Schema({
    url: {
        type: String,
        required: true,
    },
    nombre: {
        type: String,
        required: true
    },
    nombre_original: {
        type: String,
        required: true
    },
    downloads: {
        type: Number,
        default:1
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        default: null
    },
    password: {
        type: String,
        default: null
    },
    created: {
        type: Date,
        default: Date.now()
    },
    image: {
        type: String
    }
});

module.exports = mongoose.model('Links', linksSchema);