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
    // This test is ensuring the required parts of the model are there
    it('should return a user-like object with the required fields as the first item in the array', function(done) {
      api
      .get('/api/users')
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) console.log(err);
        expect(res.body)
        .to.have.property(0)
        .and.to.include.keys([
          'username',
          'email',
          'age',
          'location',
          'postcode',
          '_id',
          'updatedAt',
          'createdAt'
        ]);
        done();
      }); // shuts: .end((err, res)..)
    }); // shuts: it('should return ...)
    // This test will check that the request is returning all of the fields specified in the model
    it('should return a user-like object with all fields as the first item in the array', function(done) {
      api
      .get('/api/users')
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) console.log(err);
        expect(res.body)
        .to.have.property(0)
        .and.to.have.all.keys([
          '__v',
          '_id',
          'updatedAt',
          'createdAt',
          'username',
          'email',
          'age',
          'location',
          'postcode',
          'image',
          'name',
          'gender',
          'locationCoords',
          'about',
          'groups'
        ]);
        done();
      }); // shuts: .end((err, res)..)
    }); // shuts: it('should return...')
  }); // shuts: describe('GET /api/users'...)

  describe('GET /api/users/:id', () => {

    // This gets rid of the duplicate error, which comes because of username having to be unique
    beforeEach(done => {
      User
      .remove()
      .then(() => done())
      .catch(done);
    });

    // This ensures that the unique dummy data is not re-used
    afterEach(done => {
      User
      .remove()
      .then(() => done())
      .catch(done);
    });

    // This test should test that there is a connection when trying to view a user page 
    it('should return a 200 response', function(done) {
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
      .then(user => {
        api
        .get(`/api/users/${user._id}`)
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status)
          .to.eq(200);
          done();
        });
      })
      .catch(done);
    }); // shuts: it('should return'...)
  }); // shuts: describe('GET /api/users/:id'...)
}); // shuts: describe('Users Controller Test'...)
