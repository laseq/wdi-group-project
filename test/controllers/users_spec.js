const { api, expect } = require('../spec_helper');

describe('Users Controller Test', () => {
  describe('GET /api/users', () => {
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
