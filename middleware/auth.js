require('dotenv').config({ path: 'variables.env' });
const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {

    const authHeader = req.get('Authorization');
    if (authHeader) {
        // Get Token
        const token = authHeader.split(' ')[1];
        const validToken = jwt.verify(token, process.env.SECRETA);
        // Assing instace to the req
        req.user = validToken;
    } 

    return next();
}