const mongoose = require("mongoose");
const path = require("path");

function getMongoURI() {
    if (process.env.MONGO_URI) {
        return process.env.MONGO_URI;
    }
    try {
        const config = require('config');
        if (config.has('mongoURI')) {
            return config.get('mongoURI');
        }
    } catch (e) {
        // config folder not found or key missing
    }
    return "mongodb://127.0.0.1:27017/AgroWaste";
}

function connectDB() {
    const db = getMongoURI();
    mongoose.set('strictQuery', false);
    console.log(`Connecting to MongoDB...`);
    mongoose.connect(db)
        .then((resp) => {
            console.log("Successfully Connected to the DB");
        })
        .catch((err) => {
            console.error("Error Occurred at DB connection:", err.message);
            console.error("Please ensure your MongoDB server is running or provide a valid MONGO_URI in .env");
        });
}

module.exports = connectDB;
