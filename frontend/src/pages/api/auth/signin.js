import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Send credentials to your backend for authentication
      const response = await axios.post('https://your-backend.com/api/signin', req.body);
      
      // Extract token or session info from response
      const { token } = response.data;
      
      // Set token in a cookie or other client-side storage
      res.setHeader('Set-Cookie', `token=${token}; Path=/; HttpOnly`);
      
      // Respond with success
      res.status(200).json({ message: 'Signed in successfully' });
    } catch (error) {
      // Handle errors (e.g., invalid credentials)
      res.status(400).json({ error: 'Invalid credentials' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
