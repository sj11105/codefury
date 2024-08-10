require('dotenv').config();

const express = require('express');
const app = express();
const twilio = require('twilio');
const session = require('express-session');
const cors = require('cors');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const passport = require("passport");
const localStrat = require('passport-local');
let User = require('./models/user.js');
const mongoose = require('mongoose');
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const methodoverride = require('method-override');
app.use(methodoverride("_method"));

// Session options
const sessionOptions = {
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true
    }
};

// Using sessions
app.use(session(sessionOptions));

// Using passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrat(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Twilio client setup
const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Listening
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

// MongoDB connection
main().then(() => {
    console.log(`MongoDB connection successful`);
}).catch((err) => console.error(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/codefury');
}

app.use(cors());

// Set up email transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.email,
        pass: process.env.email_pass,
    }
});

// Step 1: Signup & OTP Generation
app.post('/signup', async (req, res) => {
    try {
        let { username, email, password, whatsappnumber, address } = req.body;
        const user1 = await User.findOne({ email });

        if (user1) {
            return res.status(400).send('Email is already registered with an account');
        } else {
            // Generate OTPs for both email and SMS
            const emailOtp = crypto.randomBytes(3).toString('hex'); // 6-character OTP for email
            const smsOtp = crypto.randomBytes(3).toString('hex'); // 6-character OTP for SMS
            const otpExpires = Date.now() + 3 * 60 * 1000; // OTP expires in 3 minutes

            // Store OTPs and user data in the session
            req.session.emailOtp = emailOtp;
            req.session.smsOtp = smsOtp;
            req.session.otpExpires = otpExpires;
            req.session.tempUser = { username, email, password, whatsappnumber, address };

            // Send email with OTP
            const mailOptions = {
                from: process.env.email,
                to: email,
                subject: 'OTP for Registration - 3 minutes expiry',
                text: `Your OTP for Registration is ${emailOtp}`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return res.status(500).send("Failed to send email");
                }
            });

            // Send SMS with OTP using Twilio
            twilioClient.messages.create({
                body: `Your OTP for Registration is ${smsOtp}`,
                from: process.env.TWILIO_PHONE_NUMBER,
                to: whatsappnumber
            }).then(message => {
                console.log(`SMS sent: ${message.sid}`);
                res.status(200).send('OTPs sent to your email and phone. Please verify.');
            }).catch(error => {
                console.error('Error sending SMS:', error);
                res.status(500).send("Failed to send SMS");
            });
        }
    } catch (err) {
        res.status(500).send(`Error: ${err.message}`);
    }
});

// Step 2: OTP Verification & Registration
app.post('/verify-otp', async (req, res) => {
    try {
        const { emailOtp, smsOtp } = req.body;

        // Check if OTPs match and haven't expired
        if (req.session.emailOtp !== emailOtp || req.session.smsOtp !== smsOtp || Date.now() > req.session.otpExpires) {
            return res.status(400).send('Invalid or expired OTP');
        }

        // Register the user with the data stored in session
        const { username, email, password, whatsappnumber, address } = req.session.tempUser;
        let phoneNumber = whatsappnumber.slice(2);
        let user = new User({ username, email, phoneNumber, address });
        let reguser = await User.register(user, password);

        // Clear the session data after registration
        req.session.emailOtp = null;
        req.session.smsOtp = null;
        req.session.otpExpires = null;
        req.session.tempUser = null;

        req.login(reguser, (err) => {
            if (err) return next(err);
            res.status(200).send('User registered successfully');
        });

    } catch (err) {
        res.status(500).send(`Error: ${err.message}`);
    }
});
