// models/Car.js
const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
    make: String,
    model: String,
    year: Number,
    description: String,
    photos: [String], // Array for multiple photo file paths
    createdAt: { type: Date, default: Date.now }
});

const Car = mongoose.model('Car', CarSchema);

module.exports = Car;
