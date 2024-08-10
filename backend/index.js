require('dotenv').config();

const express = require('express');
const Twilio = require('twilio');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = '+13867664736';

const client = Twilio(accountSid, authToken);

// Example mapping of areas to phone numbers
const areaPhoneNumbers = {
  'koramangala': '+917889169756',
  'jayanagar': '+918651599266',
  'whitefield': '+918792067476',
  'kr circle': '+918310372710',
};



app.post('/send-sms', async (req, res) => {
  const { area, body, isEmergency } = req.body;

  console.log('Received Area:', area); // Debugging line

  const recipient = isEmergency
    ? areaPhoneNumbers[area.toLowerCase()] // Use the selected area's number for emergencies
    : areaPhoneNumbers[area.toLowerCase()];

  if (!recipient) {
    return res.status(400).json({ success: false, error: 'Invalid area selected.' });
  }

  try {
    const message = await client.messages.create({
      body: body,
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
