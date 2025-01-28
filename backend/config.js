const dotenv = require('dotenv');
const mongoose = require("mongoose");

dotenv.config();

const config = {
    app_name: process.env['APP_NAME'],
    port: process.env['PORT'] ?? 3000,
    db_uri: process.env['DB_URI'] ?? 'mongodb://localhost:27017/usersDb',
    db_options: {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
}

module.exports=config
