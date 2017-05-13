const { api, expect } = require('../spec_helper');
const Group           = require('../../models/group');
const User           = require('../../models/user');

describe('Groups Controller Test', () => {

  describe('GET /api/groups', () => {

    beforeEach(done => {
      Group
        .remove()
        .then(() => {

          User
          .remove()
          .then(() => done())
          .catch(done);
        });
    });

    beforeEach(done => {

      User
      .create([{
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
      }, {
        username: 'sophie',
        name: 'sophie',
        email: 'sophie@sophie.com',
        age: 25,
        gender: 'female',
        image: 'https://www.fillmurray.com/600/400',
        location: 'Whitechapel',
        postcode: 'E1 7PA',
        locationCoords: { lat: 51.0, lng: 0.0745205 },
        about: 'I like sports'
        // groups: [{ type: mongoose.Schema.ObjectId, ref: 'Group'}]
      }, {
        username: 'lou',
        name: 'lourenco',
        email: 'lou@lou.com',
        age: 27,
        gender: 'male',
        image: 'https://www.fillmurray.com/600/400',
        location: 'Stepney',
        postcode: 'E1 4EA',
        locationCoords: { lat: 52.0, lng: 0.0745205 },
        about: 'I like programming'
        // groups: [{ type: mongoose.Schema.ObjectId, ref: 'Group'}]
      }])
      .then(users => {
        console.log(`${users.length} users were created!`);

        return Group
        .create([{
          name: 'Aldgate Runchers',
          admin: users[0]._id,
          members: [
            users[1]._id,
            users[2]._id
          ],
          schedule: {
            day: 'Monday',
            date: new Date('2017-05-15'),
            startTime: '12:30',
            location: 'Aldgate East Station',
            distance: '3.0 km',
            description: 'A nice easy run'
          },
          comments: [
            { comment: 'Welcome to my group', user: users[0]._id },
            { comment: 'This is a great run group', user: users[1]._id }
          ]
        }]);
      })
      .then(groups => {
        // console.log('groups[0].admin:', groups[0].admin);
        // console.log('groups[0].members:', groups[0].members);
        // console.log('groups[0].comments:', groups[0].comments);
        console.log(`${groups.length} groups were created!`);
        done();
      })
      .catch(done);
    });

    afterEach(done => {
      Group
        .remove()
        .then(() => {

          User
          .remove()
          .then(() => done())
          .catch(done);
        });
    });

    it('should return a 200 response', function(done) {
      // this.skip();
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
      // this.skip();
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
      // this.skip();
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

    it('should return a group-like object with the required fields as the first item in the array', function(done) {
    // this.skip();
      api
        .get('/api/groups')
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (err) console.log(err);
          expect(res.body)
            .to.have.property(0)
            .and.to.include.keys([
              'name',
              'admin',
              '_id',
              'updatedAt',
              'createdAt'
            ]);
          done();
        });
    }); // End of it('should return a group-like object with the required fields...)

    it('should return a soup-like object with all fields as the first item in the array', function(done) {
    // this.skip();
      api
        .get('/api/groups')
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (err) console.log(err);
          expect(res.body)
            .to.have.property(0)
            .and.to.all.keys([
              '__v',
              '_id',
              'name',
              'admin',
              'members',
              'schedule',
              'comments',
              'updatedAt',
              'createdAt'
            ]);
          done();
        });
    });



    // [{
    //   name: 'Aldgate Runchers',
    //   admin: users[0]._id,
    //   members: [
    //     users[1]._id,
    //     users[2]._id
    //   ],
    //   schedule: {
    //     day: 'Monday',
    //     date: new Date('2017-05-15'),
    //     startTime: '12:30',
    //     location: 'Aldgate East Station',
    //     distance: '3.0 km',
    //     description: 'A nice easy run'
    //   },
    //   comments: [
    //     { comment: 'Welcome to my group', user: users[0]._id },
    //     { comment: 'This is a great run group', user: users[1]._id }
    //   ]
    // }]



  }); // End of describe('GET /api/groups'...)





}); // End of describe('Groups Controller Test'...)
