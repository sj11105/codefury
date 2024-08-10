import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Send user data to your backend for registration
      const response = await axios.post('enter the api', req.body);
      
      // Respond with success or additional information (e.g., welcome message)
      res.status(200).json({ message: 'Sign up successful', user: response.data });
    } catch (error) {
      // Handle errors (e.g., user already exists)
      res.status(400).json({ error: 'Sign up failed', details: error.response.data });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
