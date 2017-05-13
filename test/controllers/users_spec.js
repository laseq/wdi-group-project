const { api, expect } = require('../spec_helper');
const User            = require('../../models/user');

describe('Users Controller Test', () => {
  // This is testing the users index
  describe('GET /api/users', () => {

    // This gets rid of the duplicate error, which comes because of username having to be unique
    beforeEach(done => {
      User
      .remove()
      .then(() => done())
      .catch(done);
    });

    // This creates dummy data for the tests to run against in the API
    beforeEach(done => {
      User
      .create({
        username: 'alexyeates',
        name: 'alex',
        email: 'alex@alex.com',
        age: 23,
        gender: 'male',
        image: 'https://www.fillmurray.com/600/400',
        location: 'Aldgate',
        postcode: 'E1 7PT',
        locationCoords: { lat: 51.5152149, lng: 0.0745205 },
        about: 'lorem'
        // groups: [{ type: mongoose.Schema.ObjectId, ref: 'Group'}]
      })
      .then(() => done())
      .catch(done);
    }); // shuts: beforeEach(...)

    // This ensures that the unique dummy data is not re-used
    afterEach(done => {
      User
      .remove()
      .then(() => done())
      .catch(done);
    });

    // This test is checking that a request to our API is connecting to a link
    it('should return a 200 response', function (done) {
      api
      .get('/api/users')
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) console.log(err);
        expect(res.status).to.be.eq(200);
        done();
      }); // shuts: .end((err, res)..)
    }); // shuts: it('should return a 200 response'...)
    // This test is checking that the request to our API returns an arary
    it('should return an array', function (done) {
      api
      .get('/api/users')
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) console.log(err);
        expect(res.body).to.be.an('array');
        done();
      }); // shuts: .end((err, res)...)
    }); // shuts: it('should return an array'...)
    // This test is checking that the request to our API returns JSON
    it('should return a JSON object', function (done) {
      api
      .get('/api/users')
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) console.log(err);
        expect(res.header['content-type'])
        .to.be.eq('application/json; charset=utf-8');
        done();
      }); // shuts: .end((err, res)...)
    }); // shuts: it('should return a JSON object'...)

  }); // shuts: describe('GET /api/users'...)
}); // shuts: describe('Users Controller Test'...)
