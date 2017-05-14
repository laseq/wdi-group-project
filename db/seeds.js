const mongoose     = require('mongoose');
mongoose.Promise   = require('bluebird');
const env          = require('../config/env');

console.log('process.env.NODE_ENV:', process.env.NODE_ENV);

mongoose.connect(env.db[process.env.NODE_ENV]||env.db.development);

const User = require('../models/user');
const Group = require('../models/group');

User.collection.drop();
Group.collection.drop();

function UserTemplate(username, name, email, age, gender, location) {
  this.username = username;
  this.name = name;
  this.email = email;
  this.age = age;
  this.gender = gender;
  this.location = location;
  this.postcode = 'E1 7PT';
  this.about = 'I like running';
}

let groupsArray = [];

User
  .create([
    new UserTemplate('sophie1', 'Sophie', 'sophie@sophie.com', 20, 'female', 'Aldgate East'),
    new UserTemplate('tim1', 'Tim', 'tim@tim.com', 30, 'male', 'Aldgate East'),
    new UserTemplate('alex1', 'Alex', 'alex@alex.com', 25, 'male', 'Aldgate East'),
    new UserTemplate('lou1', 'Lourenco', 'lou@lou.com', 27, 'male', 'Whitechapel'),
    new UserTemplate('dave1', 'Dave', 'dave@dave.com', 28, 'male', 'Whitechapel'),
    new UserTemplate('danai1', 'Danai', 'danai@danai.com', 25, 'female', 'Whitechapel'),
    new UserTemplate('jen1', 'Jennifer', 'jen@jen.com', 30, 'female', 'Whitechapel'),
    new UserTemplate('jack1', 'Jack', 'jack@jack.com', 27, 'male', 'Bethnal Green'),
    new UserTemplate('casey1', 'Casey', 'casey@casey.com', 23, 'female', 'Bethnal Green'),
    new UserTemplate('ed1', 'Ed', 'ed@ed.com', 25, 'male', 'Bethnal Green')
  ])
  .then(users => {
    console.log(`${users.length} users created!`);
    console.log('users[1].name:', users[1].name);
    console.log('users[3].email:', users[3].email);

    return Group.create([
      {
        name: 'Aldgate Runchers',
        admin: users[0]._id,
        members: [users[0]._id, users[1]._id, users[2]._id],
        schedule: [{
          day: 'Monday',
          date: new Date('2017-05-15'),
          startTime: '12:30',
          location: 'Aldgate East Station',
          distance: '3.0 km',
          description: 'A nice easy run',
          maxRunners: 10
        },{
          day: 'Wednesday',
          date: new Date('2017-05-17'),
          startTime: '12:30',
          location: 'Aldgate East Station',
          distance: '3.0 km',
          description: 'A nice easy run',
          maxRunners: 10
        },{
          day: 'Friday',
          date: new Date('2017-05-19'),
          startTime: '12:30',
          location: 'Aldgate East Station',
          distance: '3.0 km',
          description: 'A nice easy run',
          maxRunners: 10
        }],
        comments: [
          { comment: 'Welcome to my group', user: users[0]._id },
          { comment: 'This is a great run group', user: users[1]._id }
        ]
      },
      {
        name: 'Whitechapel Runchers',
        admin: users[3]._id,
        members: [users[3]._id, users[4]._id, users[5]._id, users[6]._id, users[1]._id, users[2]._id],
        schedule: [{
          day: 'Tuesday',
          date: new Date('2017-05-16'),
          startTime: '13:00',
          location: 'Whitechapel Tube Station',
          distance: '4.0 km',
          description: 'A fast paced run',
          maxRunners: 8
        },
        {
          day: 'Thursday',
          date: new Date('2017-05-18'),
          startTime: '13:00',
          location: 'Whitechapel Tube Station',
          distance: '5.0 km',
          description: 'A fast paced run',
          maxRunners: 8
        }],
        comments: [
          { comment: 'Welcome to my group', user: users[3]._id },
          { comment: 'Whitechapel Runchers rocks!', user: users[4]._id }
        ]
      },
      {
        name: 'Bethnal Green Runchers',
        admin: users[7]._id,
        members: [users[7]._id, users[8]._id, users[9]._id],
        schedule: [{
          day: 'Wednesday',
          date: new Date('2017-05-17'),
          startTime: '12:00',
          location: 'Bethnal Green Tube Station',
          distance: '2.0 km',
          description: 'A leisurely run',
          maxRunners: 15
        }],
        comments: [
          { comment: 'We meet up once a week on a Wednesday', user: users[7]._id },
          { comment: 'This run group helps keep me active', user: users[8]._id }
        ]
      }
    ]);
  })
  .then(groups => {
    groupsArray = groups;
    console.log(`${groups.length} groups created!`);
    console.log('groups[0].name:', groups[0].name);
    // console.log('groups[0].schedule[1]:', groups[0].schedule[1]);
    console.log('groups[0].members:', groups[0].members);
    console.log('groups[1].name:', groups[1].name);
    console.log('groups[1].schedule[0].maxRunners:', groups[1].schedule[0].maxRunners);
    // console.log('groups[1].schedule:', groups[1].schedule);
    console.log('groups[2].name:', groups[2].name);
    console.log('groups[2].admin:', groups[2].admin);
    // console.log('groups[2].comments:', groups[2].comments);

    // groups.forEach(group => {
    //   let memberArray = [];
    //   memberArray = group.members;
    //   console.log('memberArray:', memberArray);
    //   memberArray.forEach(memberId => {
    //     return User
    //       .find({ id: memberId })
    //       .exec()
    //       .then(member => {
    //         console.log('member in double forEach:', member);
    //         member.groups.push(group._id);
    //         member.save();
    //       });
    //   });
    // });

    // User
    // .find()
    // .exec()
    // .then(users => {
    //   users.forEach(user => {
    //     if (user.email === 'sophie@sophie.com') {
    //       user.groups.push(groupsArray[0]._id);
    //     }
    //     if (user.email === 'tim@tim.com') {
    //       user.groups.push(groupsArray[0]._id);
    //       user.groups.push(groupsArray[1]._id);
    //     }
    //     if (user.email === 'alex@alex.com') {
    //       user.groups.push(groupsArray[0]._id);
    //       user.groups.push(groupsArray[1]._id);
    //     }
    //     if (user.email === 'lou@lou.com') {
    //       user.groups.push(groupsArray[1]._id);
    //     }
    //     if (user.email === 'dave@dave.com') {
    //       user.groups.push(groupsArray[1]._id);
    //     }
    //     if (user.email === 'danai@danai.com') {
    //       user.groups.push(groupsArray[1]._id);
    //     }
    //     if (user.email === 'jen@jen.com') {
    //       user.groups.push(groupsArray[1]._id);
    //     }
    //     if (user.email === 'jack@jack.com') {
    //       user.groups.push(groupsArray[2]._id);
    //     }
    //     if (user.email === 'casey@casey.com') {
    //       user.groups.push(groupsArray[2]._id);
    //     }
    //     if (user.email === 'ed@ed.com') {
    //       user.groups.push(groupsArray[2]._id);
    //     }
    //     user.save();
    //   });
  })
  .catch(err => {
    console.log('seeds file error:', err);
  })
  .finally(() => {
    mongoose.connection.close();
  });
