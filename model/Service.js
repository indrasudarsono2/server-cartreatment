const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  itemId: [{
    type: ObjectId,
    ref: 'Item'
  }]
});

module.exports = mongoose.model('Service', serviceSchema);