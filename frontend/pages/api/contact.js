import { MongoClient } from 'mongodb';

// MongoDB connection URI and database name
const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

let client;
let db;

const connectToDatabase = async () => {
  if (db) return { db, client };
  client = await MongoClient.connect(uri);
  db = client.db(dbName);
  return { db, client };
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { name, email, phone, message } = req.body;

      if (!name || !email || !phone || !message) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      const { db } = await connectToDatabase();
      const collection = db.collection('contacts');

      // Check if the email already exists
      const existingContact = await collection.findOne({ email });
      if (existingContact) {
        return res.status(400).json({ message: 'Email already exists' });
      }

      // Insert the new contact
      const result = await collection.insertOne({ name, email, phone, message, createdAt: new Date() });

      res.status(200).json({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
      console.error('Error saving message:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
