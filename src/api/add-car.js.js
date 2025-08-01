import formidable from 'formidable';
import fs from 'fs';
import { MongoClient } from 'mongodb';

// Disable default body parsing
export const config = {
  api: {
    bodyParser: false,
  },
};

const uri = process.env.MONGODB_URI;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST allowed' });
  }

  const form = new formidable.IncomingForm({ keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Form parsing error:', err);
      return res.status(500).json({ error: 'Form parsing failed' });
    }

    const { make, model, year, price } = fields;
    const imageFile = files.image;

    // Optional: Upload image to cloud storage (e.g., Cloudinary)
    // For now, you can store just the filename or base64 (not ideal for production)

    try {
      const client = new MongoClient(uri);
      await client.connect();
      const db = client.db();
      const cars = db.collection('cars');

      const newCar = {
        make,
        model,
        year: parseInt(year),
        price: parseFloat(price),
        imageUrl: imageFile?.filepath || '', // placeholder
      };

      const result = await cars.insertOne(newCar);
      await client.close();

      res.status(201).json({ message: 'Car saved', id: result.insertedId });
    } catch (dbErr) {
      console.error('Database error:', dbErr);
      res.status(500).json({ error: 'DB insert failed' });
    }
  });
}
