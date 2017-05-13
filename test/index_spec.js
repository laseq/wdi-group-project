const { api, expect } = require('./spec_helper');

describe('Base Index.html test', () => {

  describe('GET /*', () => {

    it('should return a 200 response', function(done) {
      // this.skip()
      api
      .get('/')
      .set('Accept', 'application/html')
      .end((err, res) => {
        if (err) console.log(err);
        expect(res.status).to.eq(200);
        done();
      });
    }); // End of it('should return a 200 response'...)

    it('should return a html', function(done) {
    // this.skip()
      api
        .get('/')
        .set('Accept', 'application/html')
        .end((err, res) => {
          if (err) console.log(err);
          expect(res.headers['content-type'])
            .to.eq('text/html; charset=UTF-8');
          done();
        });
    }); // End of it('should return a html'...)

    it('should return the correct index.html with title Runch', function(done) {
    // this.skip()
      api
        .get('/')
        .set('Accept', 'application/html')
        .end((err, res) => {
          if (err) console.log(err);
          expect(res.text)
            .to.contain('<title>Runch</title>');
          done();
        });
    }); // End of it('should return the correct index.html with title Runch'...)

    it('should return the correct index.html even when an undefined endpoint is called', function(done) {
    // this.skip()
      api
        .get('/hlwhjisr')
        .set('Accept', 'application/html')
        .end((err, res) => {
          if (err) console.log(err);
          expect(res.text)
            .to.contain('<title>Runch</title>');
          done();
        });
    }); // End of it('should return the correct index.html even when an undefined endpoint is called'...)


  }); //End of describe('GET /*'...)

}); // End of describe('Base Index.html test'...)
