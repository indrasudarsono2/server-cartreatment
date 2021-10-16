const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema;

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  isFavorite: {
    type: Boolean,
    default: false
  },
  description: {
    type: String,
    required: true
  },
  unit: {
    type: String,
    default: 'car'
  },
  sumBooking: {
    type: Number,
    default: 0
  },
  serviceId: {
    type: ObjectId,
    ref: 'Service'
  },
  imageId: [{
    type: ObjectId,
    ref: 'Image'
  }],
  featureId: [{
    type: ObjectId,
    ref: 'Feature'
  }],
  stepId: [{
    type: ObjectId,
    ref: 'Step'
  }]

});

module.exports = mongoose.model('Item', itemSchema);