const { api, expect } = require('../spec_helper');

describe('Groups Controller Test', () => {

  describe('GET /api/groups', () => {
    it('should return a 200 response', done => {
      api
        .get('/api/groups')
        .set('Accept', 'application/json')
        .end((err,res) => {
          if (err) console.log(err);
          expect(res.status).to.be.eq(200);
          done();
        });
    }); // End of it('should return a 200 response'...)
  }); // End of describe('GET /api/groups'...)





}); // End of describe('Groups Controller Test'...)
