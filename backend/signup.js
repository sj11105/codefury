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
    await mongoose.connect('enter the mongo uri');
}

app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend URL
    credentials: true // This allows the frontend to send cookies to the backend
}));

// Set up email transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.email,
        pass: process.env.email_pass,

    }
});

let username1 = " ";
let email1 = " ";
let password1 = " ";
let whatsappnumber1 = " ";
let address1 = " ";
let emailOtp1 = " ";
let smsOtp1 = " ";



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
            emailOtp1 = emailOtp;
            smsOtp1 = smsOtp;
            req.session.otpExpires = otpExpires;
            username1 = username;
            email1 = email;
            password1 = password;
            whatsappnumber1 = whatsappnumber;
            address1 = address;

            // Send email with OTP
            const emailPromise = transporter.sendMail({
                from: process.env.email,
                to: email,
                subject: 'OTP for Registration - 3 minutes expiry',
                text: `Your OTP for Registration is ${emailOtp}`
            });

            // Send SMS with OTP using Twilio
            const smsPromise = twilioClient.messages.create({
                body: `Your OTP for Registration is ${smsOtp}`,
                from: process.env.TWILIO_PHONE_NUMBER,
                to: whatsappnumber
            });

            // Wait for both promises to resolve
            Promise.all([emailPromise, smsPromise])
                .then(() => {
                    res.status(200).send('OTPs sent to your email and phone. Please verify.');
                })
                .catch(error => {
                    console.error('Error sending OTPs:', error);
                    res.status(500).send("Failed to send OTPs");
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
        console.log(`email otp ${emailOtp1} sms otp ${smsOtp1}`)
        // Check if OTPs match and haven't expired
        if (emailOtp1 !== emailOtp || smsOtp1 !== smsOtp || Date.now() > req.session.otpExpires) {
            return res.status(400).send('Invalid or expired OTP');
        }

        // Register the user with the data stored in session
        phoneNumber = whatsappnumber1.slice(2);
        let user = new User({ username1, email1, phoneNumber, address1 });
        let reguser = await User.register(user, password1);

        // Clear the session data after registration
        emailOtp1 = null;
        smsOtp1 = null;
        req.session.otpExpires = null;
        username1 = null
        email1 = null;
        password1 = null;
        whatsappnumber1 = null;
        address1 = null;



        req.login(reguser, (err) => {
            if (err) return next(err);
            res.status(200).send('User registered successfully');
        });

    } catch (err) {
        res.status(500).send(`Error: ${err.message}`);
    }
});
