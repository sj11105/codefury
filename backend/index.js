require('dotenv').config();

const express = require('express');
const Twilio = require('twilio');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3001;

// Retrieve Twilio credentials from environment variables
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = Twilio(accountSid, authToken);

app.post('/send-sms', async (req, res) => {
  const { recipients, body } = req.body;

  if (!Array.isArray(recipients) || recipients.length === 0) {
    return res.status(400).json({ success: false, error: 'Recipients list is required and must be an array.' });
  }

  try {
    const messages = await Promise.all(recipients.map(recipient =>
      client.messages.create({
        body: body,
        from: '+13867664736',
        to: recipient
      })
    ));

    res.json({
      success: true,
      messages: messages.map(message => ({ recipient: message.to, messageSid: message.sid }))
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
