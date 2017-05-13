const mongoose  = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, trim: true, required: true },
  name: { type: String, trim: true },
  email: { type: String, unique: true, trim: true, required: true },
  age: { type: Number, required: true },
  gender: { type: String, enum: ['male', 'female'] },
  image: { type: String, trim: true },
  location: { type: String, required: true },
  postcode: { type: String, required: true },
  locationCoords: { lat: { type: Number }, lng: { type: Number } },
  about: { type: String },
  groups: [{ type: mongoose.Schema.ObjectId, ref: 'Group'}]
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
