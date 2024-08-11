const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    whatsappnumber: {
        type: Number,
        validate: {
            validator: function(v) {
                return /^\d{10}$/.test(v);
            },
            message: props => `${props.value} is not a valid 10-digit number for WhatsApp.`
        }
    },
    address: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
    },
    resetPasswordExpires: {
        type: Date,
    }
});

// Use email as the username field for passport-local-mongoose
userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

module.exports = mongoose.model("User", userSchema);
