const mongoose = require('mongoose');

const db_url = "mongodb+srv://nikhilgaikwad326:MKRXIDQ5TpeKNOa4@cluster0.5wjxtaw.mongodb.net/test";

const db_connection = async () => {
    console.log('inside db connection function');
    await mongoose.connect(db_url);
    console.log('database connection established.......');
}

module.exports = db_connection;