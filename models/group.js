const mongoose  = require('mongoose');

const groupSchema = new mongoose.Schema({
  name: { type: String, unique: true, trim: true, required: true },
  members: { type: mongoose.Schema.ObjectId, ref: 'User'},
  schedule: [{
    day: { type: String, required: true },
    date: {type: Date, required: true },
    startTime: { type: Date, required: true },
    location: { type: String, required: true },
    distance: { type: String, required: true },
    description: { type: String }
  }],
  comments: [{
    comment: { type: String, required: true },
    user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Group', groupSchema);
