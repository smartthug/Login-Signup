import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isverified: {
        type: Boolean,
        default: false,
    },
    lastlogin: {
        type: Date,
        default: Date.now,
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    otp: String,
    verificationTokenExpires: Date,
}, { timestamps: true });

const item = mongoose.model('Uservalue', itemSchema, 'Uservalue');
export default item;