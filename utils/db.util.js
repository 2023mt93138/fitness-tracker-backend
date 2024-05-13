const mongoose = require('mongoose');
const usersDatabaseUrl = process.env.MONGO_DB_URL;

mongoose.connect(usersDatabaseUrl);

const mongooseDB = mongoose.connection;

mongooseDB.on('error', (error) => {
    console.log("Database Error: " + error)
})

mongooseDB.once('connected', () => {
    console.log('Database Connected');
})
