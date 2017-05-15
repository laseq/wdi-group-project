const { api, expect } = require('../spec_helper');
const Group           = require('../../models/group');
const User           = require('../../models/user');

let user0, user1, user2, groupId;
let promise1, promise2, promise3;

function userAndTokens(user, token) {
  this.user = user;
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

function registerUsers() {
  promise1 = api
    .post('/api/register')
    .set('Accept', 'application/json')
    .send(testUserArray[0])
    .then(data => {
      const jsonData = JSON.parse(data.text);
      user0 = new userAndTokens(jsonData.user, jsonData.token);
    });

  promise2 = api
    .post('/api/register')
    .set('Accept', 'application/json')
    .send(testUserArray[1])
    .then(data => {
      const jsonData = JSON.parse(data.text);
      user1 = new userAndTokens(jsonData.user, jsonData.token);
    });

  promise3 = api
    .post('/api/register')
    .set('Accept', 'application/json')
    .send(testUserArray[2])
    .then(data => {
      const jsonData = JSON.parse(data.text);
      user2 = new userAndTokens(jsonData.user, jsonData.token);
    });
}

function registerUsersAndCreateGroup(done) {

  registerUsers();

  Promise.all([promise1,promise2,promise3])
    .then(() => {
      return Group
        .create(createGroup([user0.user, user1.user, user2.user]));
    })
    .then(group => {
      groupId = group._id;
    })
    .then(done)
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

    beforeEach(done => {
      registerUsersAndCreateGroup(done);
    });

    afterEach(done => {
      removeGroupAndUserDbs(done);
    });

    it('should return a 200 response', function(done) {
      // this.skip();
      api
      .get(`/api/groups/${groupId}`)
      .set('Authorization', 'Bearer ' + user0.token)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status)
        .to.eq(200);
        done();
      });
    }); //End of it('should return a 200 response'...)


    it('should not return a group if the id is wrong', function(done) {
      // this.skip();
      api
      .get(`/api/groups/59171dd6cbeaf9fb9f1236c6`)
      .set('Authorization', 'Bearer ' + user0.token)
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

    beforeEach(done => {
      removeGroupAndUserDbs(done);
    });

    beforeEach(() => {
      registerUsers();
    });

    afterEach(done => {
      removeGroupAndUserDbs(done);
    });

    it('should return a 201 response', function(done) {
      // this.skip();
      api
      .post('/api/groups')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + user0.token)
      .send(createGroup([user0.user, user1.user, user2.user]))
      .end((err, res) => {
        if (err) console.log(err);
        expect(res.status)
        .to.eq(201);
        done();
      });
    }); // End of it('should return a 201 response'...)

  }); // End of describe('POST /api/groups'...)

  describe('PUT /api/groups/:id', () => {

    beforeEach(done => {
      removeGroupAndUserDbs(done);
    });

    beforeEach(done => {
      registerUsersAndCreateGroup(done);
    });

    afterEach(done => {
      removeGroupAndUserDbs(done);
    });

    it('should return a 200 response and update name', function(done) {
      // this.skip();
      api
      .put(`/api/groups/${groupId}`)
      .set('Authorization', 'Bearer ' + user0.token)
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
    }); // End of it('should return a 200 response and update name'...)

  }); // End of describe('PUT /api/groups/:id'...)

  describe('DELETE /api/groups/:id', () => {

    beforeEach(done => {
      removeGroupAndUserDbs(done);
    });

    beforeEach(done => {
      registerUsersAndCreateGroup(done);
    });

    afterEach(done => {
      removeGroupAndUserDbs(done);
    });

    it('should return a 204 response', function(done) {
      // this.skip();

      api
      .delete(`/api/groups/${groupId}`)
      .set('Authorization', 'Bearer ' + user0.token)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) console.log(err);
        expect(res.status)
        .to.eq(204);
        done();
      });

    }); // End of it('should return a 204 response'...)

  }); // End of describe('DELETE /api/groups/:id'...)

}); // End of describe('Groups Controller Test'...)
