// server.js
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve uploaded files

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Define Car schema
const carSchema = new mongoose.Schema({
  make: String,
  model: String,
  year: Number,
  description: String,
  images: [String],
});

const Car = mongoose.model('Car', carSchema);

// API Endpoints
app.post('/api/cars', upload.array('images', 50), async (req, res) => {
  const { make, model, year, description } = req.body;
  const images = req.files.map(file => file.path);

  const newCar = new Car({ make, model, year, description, images });
  await newCar.save();
  res.status(201).json({ message: 'Car added successfully', car: newCar });
});

app.get('/api/cars', async (req, res) => {
  const cars = await Car.find();
  res.json(cars);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
