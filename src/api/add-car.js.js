// /pages/api/add-car.js
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST allowed' });
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(); // auto uses the one in your URI
    const cars = db.collection('cars');

    const result = await cars.insertOne(req.body);

    res.status(201).json({ message: 'Car added', id: result.insertedId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error saving car' });
  } finally {
    await client.close();
  }
}
