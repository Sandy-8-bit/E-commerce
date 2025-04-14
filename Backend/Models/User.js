const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    fullName: { type: String }, // Full Name
    phoneNumber: { type: String }, // Phone Number
    addressLine1: { type: String }, // Address Line 1
    addressLine2: { type: String }, // Address Line 2 (optional)
    city: { type: String }, // City
    state: { type: String }, // State/Province
    postalCode: { type: String }, // Postal Code (PIN/ZIP)
    country: { type: String }, // Country
    upiId: { type: String }, // UPI ID
}, { timestamps: true });

// Hash password before saving if it's modified
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(8);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method to compare password
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
