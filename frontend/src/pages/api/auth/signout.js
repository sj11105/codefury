export default function handler(req, res) {
    if (req.method === 'POST') {
      // Clear the authentication token from the cookie
      res.setHeader('Set-Cookie', 'token=; Path=/; HttpOnly; Max-Age=0');
      
      // Respond with success
      res.status(200).json({ message: 'Signed out successfully' });
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  