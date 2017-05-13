const { api, expect } = require('../spec_helper');

describe('Groups Controller Test', () => {

  describe('GET /api/groups', () => {
    it('should return a 200 response', function(done) {
      this.skip();
      api
        .get('/api/groups')
        .set('Accept', 'application/json')
        .end((err,res) => {
          if (err) console.log(err);
          expect(res.status).to.be.eq(200);
          done();
        });
    }); // End of it('should return a 200 response'...)

    it('should return an array', function(done) {
      this.skip();
      api
        .get('/api/groups')
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (err) console.log(err);
          expect(res.body).to.be.an('array');
          done();
        });
    }); // End of it('should return an array'...)

    it('should return a JSON object', function(done) {
      this.skip();
      api
        .get('/api/groups')
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (err) console.log(err);
          expect(res.header['content-type'])
            .to.be.eq('application/json; charset=utf-8');
          done();
        });
    }); // End of it('should return a JSON object'...)



  }); // End of describe('GET /api/groups'...)





}); // End of describe('Groups Controller Test'...)
