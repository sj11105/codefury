from twilio.rest import Client

# Your Account SID and Auth Token from twilio.com/console
account_sid = 'AC2891b4ee0a22b6516e2cadec2f4f863e'
auth_token = 'bad06e2d9fd00fd2beced59167006acb'

# Initialize the Twilio client
client = Client(account_sid, auth_token)
# List of organization phone numbers
recipients = ['+918792067476',  '+917889169756']

for recipient in recipients:
    message = client.messages.create(
        body="This is a disaster alert message.",
        from_='+13867664736',
        to=recipient
    )
    print(f"Message sent to {recipient} with SID: {message.sid}")
