const db = require('mongoose');
require('dotenv').config({ path: '.env'});

const connectDB = async () => {
    try {
        await db.connect( process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log('DB Connecteded')
    } catch (error) {
        console.log('DB Connection Error');
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB;