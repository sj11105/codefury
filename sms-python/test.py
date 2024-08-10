import os
from dotenv import load_dotenv
from twilio.rest import Client


load_dotenv()


account_sid = os.getenv('TWILIO_ACCOUNT_SID')
auth_token = os.getenv('TWILIO_AUTH_TOKEN')
twilio_phone_number = os.getenv('TWILIO_PHONE_NUMBER')


client = Client(account_sid, auth_token)


recipients = ['+918792067476', '+917889169756']

for recipient in recipients:
    message = client.messages.create(
        body="This is a disaster alert message.",
        from_=twilio_phone_number,
        to=recipient
    )
    print(f"Message sent to {recipient} with SID: {message.sid}")
