const { api, expect } = require('../spec_helper');
const Group           = require('../../models/group');
const User           = require('../../models/user');

let user0, user1, user2;

function userAndTokens(user, token) {
  this.user = user;
  // this.userId = user._id;
  // this.username = user.username,
  // this.name = user.name,
  // this.email = user.email,
  // this.age = user.age,
  // this.passwordHash = user.passwordHash,
  // this.gender = user.gender,
  // this.image = user.image,
  // this.location = user.location,
  // this.postcode = user.postcode,
  // this.locationCoords = user.locationCoords,
  // this.about = user.about,
  this.token = token;
}

const testUserArray = [{
  username: 'alexyeates',
  name: 'alex',
  email: 'alex@alex.com',
  age: 23,
  password: 'password',
  passwordConfirmation: 'password',
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
  password: 'password',
  passwordConfirmation: 'password',
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
  password: 'password',
  passwordConfirmation: 'password',
  gender: 'male',
  image: 'https://www.fillmurray.com/600/400',
  location: 'Stepney',
  postcode: 'E1 4EA',
  locationCoords: { lat: 52.0, lng: 0.0745205 },
  about: 'I like programming'
  // groups: [{ type: mongoose.Schema.ObjectId, ref: 'Group'}]
}];

function registerUsersAndCreateGroup(done) {
  const p1 = api
    .post('/api/register')
    .set('Accept', 'application/json')
    .send(testUserArray[0])
    .then(data => {
      const jsonData = JSON.parse(data.text);
      // jsonTokenArray.push(jsonData.token);
      // currentUserIdArray.push(jsonData.user._id);
      user0 = new userAndTokens(jsonData.user, jsonData.token);
      // console.log('user0:', user0);
    });

  const p2 = api
    .post('/api/register')
    .set('Accept', 'application/json')
    .send(testUserArray[1])
    .then(data => {
      const jsonData = JSON.parse(data.text);
      // jsonTokenArray.push(jsonData.token);
      // currentUserIdArray.push(jsonData.user._id);
      user1 = new userAndTokens(jsonData.user, jsonData.token);
      // console.log('user1:', user1);
    });

  const p3 = api
    .post('/api/register')
    .set('Accept', 'application/json')
    .send(testUserArray[2])
    .then(data => {
      const jsonData = JSON.parse(data.text);
      // jsonTokenArray.push(jsonData.token);
      // currentUserIdArray.push(jsonData.user._id);
      user2 = new userAndTokens(jsonData.user, jsonData.token);
      // console.log('user2:', user2);
    });

  Promise.all([p1,p2,p3])
    .then(() => {
      createGroup([user0.user, user1.user, user2.user]);
      done();
    })
    .catch(done);
}

function createGroup(users) {
  const runningGroup = {
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
  };

  return runningGroup;
}

function removeGroupAndUserDbs(done) {
  Group
  .remove()
  .then(() => {

    User
    .remove()
    .then(() => done())
    .catch(done);
  });
}

describe('Groups Controller Test', () => {

  describe('GET /api/groups', () => {

    beforeEach(done => {
      removeGroupAndUserDbs(done);
    });

    beforeEach(done => {

      registerUsersAndCreateGroup(done);

      // User
      // .create(testUserArray)
      // .then(users => {
      //   // console.log(`${users.length} users were created!`);
      //
      //   return Group
      //   .create([createGroup(users)]);
      // })
      // .then(groups => {
      //   // console.log('groups[0].admin:', groups[0].admin);
      //   // console.log('groups[0].members:', groups[0].members);
      //   // console.log('groups[0].comments:', groups[0].comments);
      //   // console.log(`A group with group id ${groups[0]._id} was created!`);
      //   console.log(`${groups.length} groups were created!`);
      //   done();
      // })
      // .catch(done);
    });

    afterEach(done => {
      removeGroupAndUserDbs(done);
    });

    it('should return a 200 response', function(done) {
      // this.skip();
      api
      .get('/api/groups')
      .set('Authorization', 'Bearer ' + user0.token)
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
      .set('Authorization', 'Bearer ' + user0.token)
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
      .set('Authorization', 'Bearer ' + user0.token)
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
      .set('Authorization', 'Bearer ' + user0.token)
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
      .set('Authorization', 'Bearer ' + user0.token)
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
  }); // End of describe('GET /api/groups'...)

  describe('GET /api/groups/:id', () => {

    beforeEach(done => {
      removeGroupAndUserDbs(done);
    });

    afterEach(done => {
      removeGroupAndUserDbs(done);
    });

    it('should return a 200 response', function(done) {
      this.skip();
      User
      .create(testUserArray)
      .then(users => {
        // console.log(`${users.length} users were created!`);

        return Group
        .create(createGroup(users));
      })
      .then(group => {
        // console.log(`A group with group id ${group._id} was created!`);
        api
        .get(`/api/groups/${group._id}`)
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status)
          .to.eq(200);
          done();
        });
      })
      .catch(done);
    }); //End of it('should return a 200 response'...)

    it('should not return a group if the id is wrong', function(done) {
      this.skip();
      api
      .get(`/api/groups/59171dd6cbeaf9fb9f1236c6`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) console.log(err);
        expect(res.status)
        .to.eq(404);
        // Could check that the message is correct?
        done();
      });
    }); //End of it('should not return a group if the id is wrong'...)
  }); // End of describe('GET /api/groups/:id'...)

  describe('POST /api/groups', () => {
    it('should return a 201 response', function(done) {
      this.skip();
      let testUsers = [];
      User
      .create(testUserArray)
      .then(users => {
        // console.log(`${users.length} users were created!`);
        testUsers = users;

        api
        .post('/api/groups')
        .set('Accept', 'application/json')
        .send(createGroup(testUsers))
        .end((err, res) => {
          if (err) console.log(err);
          expect(res.status)
          .to.eq(201);
          done();
        });
      })
      .catch(done);
    }); // End of it('should return a 201 response'...)
  }); // End of describe('POST /api/groups'...)

  describe('PUT /api/groups/:id', () => {

    beforeEach(done => {
      removeGroupAndUserDbs(done);
    });

    afterEach(done => {
      removeGroupAndUserDbs(done);
    });

    it('should return a 200 response and update name', function(done) {
      this.skip();
      User
      .create(testUserArray)
      .then(users => {
        // console.log(`${users.length} users were created!`);

        return Group
        .create(createGroup(users));
      })
      .then(group => {
        api
        .put(`/api/groups/${group._id}`)
        .set('Accept', 'application/json')
        .send({
          name: 'Whitechapel Runchers'
        })
        .end((err, res) => {
          if(err) console.log(err);
          expect(res.status)
          .to.eq(200);

          expect(res.body)
          .to.have.property('name');

          expect(res.body.name)
          .to.eq('Whitechapel Runchers');
          done();
        });
      })
      .catch(done);
    }); // End of it('should return a 200 response and update name'...)
  }); // End of describe('PUT /api/groups/:id'...)

  describe('DELETE /api/groups/:id', () => {

    beforeEach(done => {
      removeGroupAndUserDbs(done);
    });

    afterEach(done => {
      removeGroupAndUserDbs(done);
    });

    it('should return a 204 response', function(done) {
      this.skip();
      User
      .create(testUserArray)
      .then(users => {
        // console.log(`${users.length} users were created!`);

        return Group
        .create(createGroup(users));
      })
      .then(group => {
        api
        .delete(`/api/groups/${group._id}`)
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (err) console.log(err);
          expect(res.status)
          .to.eq(204);
          done();
        });
      })
      .catch(done);
    }); // End of it('should return a 204 response'...)
  }); // End of describe('DELETE /api/groups/:id'...)

}); // End of describe('Groups Controller Test'...)
