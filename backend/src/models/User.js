const mongoose = require("mongoose");

const geoSchema = new mongoose.Schema({
  lat: { type: String, required: true },
  lng: { type: String, required: true }
});

const addressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  zipcode: { type: String, required: true },
  geo: geoSchema
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    match: [/^\S+@\S+\.\S+$/, "Invalid email format"] 
  },
  phone: { type: String, required: true },
  company: { type: String, required: true },
  address: addressSchema
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
