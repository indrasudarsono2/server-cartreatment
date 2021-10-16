var seeder = require('mongoose-seed');
var mongoose = require('mongoose');

// Connect to MongoDB via Mongoose
seeder.connect('mongodb://127.0.0.1:27017/db_cartreatment', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: true,
  useUnifiedTopology: true
}, function () {

  // Load Mongoose models
  seeder.loadModels([
    './models/Member',
    './models/Booking'
  ]);

  // Clear specified collections
  seeder.clearModels(['Member', 'Booking'], function () {
    // Callback to populate DB once collections have been cleared
    seeder.populateModels(data, function () {
      seeder.disconnect();
    });

  });
});

var data = [
  {
    'model': 'Booking',
    'documents': [
      {
        _id: mongoose.Types.ObjectId('5e96cbe292b97300fc90cee1'),
        bookingStartDate: '12-12-2020',
        bookingEndDate: '12-12-2020',
        invoice: 1231231,
        itemId: {
          _id: mongoose.Types.ObjectId('614002696c4c0a9a9d3188eb'),
          title: 'Premium Nano Ceramic Coating',
          price: 4000,
          car: 2,
        },
        total: 8000,
        memberId: mongoose.Types.ObjectId('5e96cbe292b97300fc903333'),
        bankId: mongoose.Types.ObjectId('613dfd53f15772c5a79aefba'),
        payments: {
          proofPayment: 'images/bukti.jpeg',
          bankFrom: 'MANDIRI',
          status: 'Proses',
          accountHolder: 'Cipto'
        }
      }
    ]
  },
  ///
  {
    'model': 'Member',
    'documents': [
      {
        _id: mongoose.Types.ObjectId('5e96cbe292b97300fc903333'),
        firstName: 'Syamsyul',
        lastName: 'Ali',
        email: 'syamsyul@gmail.com',
        phoneNumber: '082377951122'
      },
      {
        _id: mongoose.Types.ObjectId('5e96cbe292b97300fc903334'),
        firstName: 'Baron',
        lastName: 'Tiko',
        email: 'baron@gmail.com',
        phoneNumber: '082377952211'
      }
    ]
  }
];