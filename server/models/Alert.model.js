const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  species: {
    type: String,
    required: true,
  },
  tattooNumber: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  comments: {
    type: [
      {
        commenterId:String,
        commenterPseudo: String,
        text: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      }
    ],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Alert = mongoose.model('Alert', alertSchema);

module.exports = Alert;
