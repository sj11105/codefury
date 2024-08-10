import os
from dotenv import load_dotenv
from twilio.rest import Client

# Load environment variables from .env file
load_dotenv()

# Get Twilio credentials from environment variables
account_sid = os.getenv('TWILIO_ACCOUNT_SID')
auth_token = os.getenv('TWILIO_AUTH_TOKEN')

# Initialize the Twilio client
client = Client(account_sid, auth_token)

# List of organization phone numbers
recipients = ['+918792067476', '+917889169756']

for recipient in recipients:
    message = client.messages.create(
        body="This is a disaster alert message.",
        from_='+13867664736',
        to=recipient
    )
    print(f"Message sent to {recipient} with SID: {message.sid}")
