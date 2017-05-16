const mongoose    = require('mongoose');
mongoose.Promise  = require('bluebird');
const User        = require('./user');

const groupSchema = new mongoose.Schema({
  name: { type: String, unique: true, trim: true, required: true },
  admin: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  members: [{ type: mongoose.Schema.ObjectId, ref: 'User'}],
  image: { type: String, trim: true },
  schedule: [{
    day: { type: String },
    date: {type: Date, required: true },
    startTime: { type: String },
    location: { type: String, required: true },
    distance: { type: String, required: true },
    description: { type: String },
    maxRunners: { type: Number }
  }],
  comments: [{
    comment: { type: String, required: true },
    user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
  }]
}, {
  timestamps: true
});

groupSchema.post('save', function() {

});

module.exports = mongoose.model('Group', groupSchema);
