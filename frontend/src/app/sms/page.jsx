'use client';
import { useState } from 'react';
import MapComponent from '../components/MapComponent';

export default function SendSMS() {
  const [area, setArea] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Predefined message for emergencies
  const emergencyMessage = 'This is an emergency alert! Please respond immediately.';

  // Function to get user's current location
  const getLocation = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const position = await getLocation(); // Get user's location
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      const response = await fetch('http://localhost:3001/send-sms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ latitude, longitude, body, isEmergency: false }),
      });

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Unexpected response format');
      }

      const data = await response.json();

      if (data.success) {
        alert('Message sent successfully!');
        setArea('');
        setBody('');
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      setError('Error sending message: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEmergency = async () => {
    setLoading(true);
    setError('');

    try {
      const position = await getLocation(); // Get user's location for emergency
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      const response = await fetch('http://localhost:3001/send-sms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ latitude, longitude, body: emergencyMessage, isEmergency: true }), // Sending emergency flag
      });

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Unexpected response format');
      }

      const data = await response.json();

      if (data.success) {
        alert('Emergency message sent successfully!');
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      setError('Error sending message: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <MapComponent />
      </div>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-2xl font-semibold mb-6 text-center text-gray-800">Send SMS</h1>
          
          <div className="mb-6">
            <button
              onClick={handleEmergency}
              className="w-full py-2 px-4 font-semibold rounded-md text-white bg-red-500 hover:bg-red-600 transition-colors duration-300"
            >
              Send Emergency Alert
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="body" className="block text-gray-600 text-sm font-medium mb-2">Message:</label>
              <textarea
                id="body"
                name="body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows="4"
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 px-4 font-semibold rounded-md text-white ${
                loading ? 'bg-gray-400' : 'bg-indigo-500 hover:bg-indigo-600'
              } transition-colors duration-300`}
            >
              {loading ? 'Sending...' : 'Send SMS'}
            </button>
          </form>
          {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
        </div>
      </div>
    </>
  );
}
