const chai = require('chai');
const chaiHttp = require('chai-http');
const { set } = require('../app');
const expect = chai.expect;
const app = require('../app');
const fs = require('fs');

chai.use(chaiHttp);

describe('API ENDPOINT TESTING', () => {
  it('GET Landing Page', (done) => {
    chai.request(app).get('/api/v1/member/landing-page').end((err,res) => {
      expect(err).to.be.null
      expect(res).to.have.status(200)
      expect(res.body).to.be.an('object')
      expect(res.body).to.have.property('hero')
      expect(res.body.hero).to.have.all.keys('costumers', 'cars')
      expect(res.body).to.have.property('mostFav')
      expect(res.body.mostFav).to.have.an('array')
      expect(res.body).to.have.property('service')
      expect(res.body.service).to.have.an('array')
      expect(res.body).to.have.property('testimony')
      expect(res.body.testimony).to.have.an('Object')
      done();
    })
  })

  it('GET Detail Item', (done) => {
    chai.request(app).get('/api/v1/member/detail-page/6146c2faa4ebcd673a97d3a3')
      .end((err,res) => {
      expect(err).to.be.null
      expect(res).to.have.status(200)
      expect(res.body).to.be.an('object')
      expect(res.body).to.be.property('_id')
      expect(res.body).to.be.property('title')
      expect(res.body).to.be.property('price')
      expect(res.body).to.be.property('unit')
      expect(res.body).to.be.property('isFavorite')
      expect(res.body).to.be.property('description')
      expect(res.body).to.be.property('__v')
      expect(res.body).to.be.property('sumBooking')
      expect(res.body).to.be.property('imageId')
      expect(res.body).to.be.property('testimony')
      expect(res.body.imageId).to.have.an('array')
      expect(res.body).to.be.property('featureId')
      expect(res.body.featureId).to.have.an('array')
      expect(res.body).to.be.property('stepId')
      expect(res.body.stepId).to.have.an('array')
      expect(res.body).to.be.property('bank')
      expect(res.body.bank).to.have.an('array')
      done();
    })
  })

  it('POST Booking Page', (done) => {
    const image = __dirname + '/bukti.jpeg';
    
    const dataSample = {
      image,
      idItem : '6146c2faa4ebcd673a97d3a3',
      car : 2,
      bookingStartDate : '2021-10-04',
      bookingEndDate : '2021-10-06',
      firstName : 'Dedi',
      lastName : 'Darko',
      email : 'dedi@gmail.com',
      phoneNumber : '081213518282',
      accountHolder : 'Desi Darko',
      bankFrom : 'Mandiri',
    }
    
    chai.request(app).post('/api/v1/member/booking-page')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .field('idItem', dataSample.idItem)
      .field('car', dataSample.car)
      .field('bookingStartDate', dataSample.bookingStartDate)
      .field('bookingEndDate', dataSample.bookingEndDate)
      .field('firstName', dataSample.firstName)
      .field('lastName', dataSample.lastName)
      .field('email', dataSample.email)
      .field('phoneNumber', dataSample.phoneNumber)
      .field('accountHolder', dataSample.accountHolder)
      .field('bankFrom', dataSample.bankFrom)
      .attach('image', fs.readFileSync(dataSample.image), '/bukti.jpeg')
      .end((err,res) => {
      expect(err).to.be.null
      expect(res).to.have.status(201)
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('message')
      expect(res.body.message).to.equal('Success booking')
      expect(res.body).to.have.property('booking')
      expect(res.body.booking).to.have.all.keys('bookingStartDate', 'bookingEndDate',
      'invoice', 'itemId', 'total', 'memberId', 'payments', '_id', '__v')
      expect(res.body.booking.payments).to.have.all.keys('proofPayment', 'bankFrom'
      , 'accountHolder', 'status')
      expect(res.body.booking.itemId).to.have.all.keys('_id', 'title', 'price', 'car')
      console.log(res.body.booking)
      done();
    })
  })
})
