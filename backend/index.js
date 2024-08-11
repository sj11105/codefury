require('dotenv').config();

const express = require('express');
const Twilio = require('twilio');
const cors = require('cors');
const geolib = require('geolib'); // Install this package for geolocation utilities

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = '+13867664736';

const client = Twilio(accountSid, authToken);

// Example mapping of areas to phone numbers and their respective coordinates
const areaPhoneNumbers = {
  'koramangala': { phone: '+917889169756', coords: { latitude: 12.9345, longitude: 77.6192 } },
  'jayanagar': { phone: '+918651599266', coords: { latitude: 12.9250, longitude: 77.5938 } },
  'whitefield': { phone: '+918792067476', coords: { latitude: 12.9698, longitude: 77.7500 } },
  'kr circle': { phone: '+918310372710', coords: { latitude: 12.9766, longitude: 77.5906 } },
};

// Function to find the nearest area based on the user's location
function findNearestArea(latitude, longitude) {
  let nearestArea = null;
  let shortestDistance = Infinity;

  for (const [area, data] of Object.entries(areaPhoneNumbers)) {
    const distance = geolib.getDistance(
      { latitude, longitude },
      data.coords
    );

    if (distance < shortestDistance) {
      shortestDistance = distance;
      nearestArea = area;
    }
  }

  return nearestArea;
}

app.post('/send-sms', async (req, res) => {
  const { latitude, longitude, body, isEmergency } = req.body;

  console.log('Received Coordinates:', latitude, longitude); // Debugging line

  const nearestArea = findNearestArea(latitude, longitude);
  if (!nearestArea) {
    return res.status(400).json({ success: false, error: 'Unable to determine the nearest area.' });
  }

  const recipient = areaPhoneNumbers[nearestArea].phone;

  try {
    // Include the area name in the message body
    const fullMessageBody = `${body}\n\nLocation: ${nearestArea}`;

    const message = await client.messages.create({
      body: fullMessageBody,
      from: twilioPhoneNumber,
      to: recipient
    });

    res.json({
      success: true,
      message: { recipient: message.to, messageSid: message.sid }
    });
  } catch (error) {
    console.error('Error sending SMS:', error);
    res.status(500).json({ success: false, error: 'An error occurred while sending SMS: ' + error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
