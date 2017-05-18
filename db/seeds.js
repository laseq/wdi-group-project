const mongoose     = require('mongoose');
mongoose.Promise   = require('bluebird');
const env          = require('../config/env');

mongoose.connect(env.db[process.env.NODE_ENV]||env.db.development);

const User = require('../models/user');
const Group = require('../models/group');

User.collection.drop();
Group.collection.drop();

function UserTemplate(username, name, email, age, gender, location, password, image = '../images/blank-profile-pic.png') {
  this.username = username;
  this.name = name;
  this.email = email;
  this.age = age;
  this.gender = gender;
  this.image = image;
  this.location = location;
  this.postcode = 'E1 7PT';
  this.about = 'I like running';
  this.password = 'password';
  this.passwordConfirmation = 'password';
}

// let groupsArray = [];

User
.create([
  new UserTemplate('sophie1', 'Sophie', 'sophie@sophie.com', 20, 'Female', 'Aldgate East', 'password', 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAMIAAAAJGY5NmJiOTIwLWRjZDgtNDdhNS04YjlkLTg3ZDIzYWNmMjE5Mg.jpg'),
  new UserTemplate('tim1', 'Tim', 'tim@tim.com', 30, 'Male', 'Aldgate East', 'password', 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAwHAAAAJDg4ZWUwMmViLTE1YmUtNDk5OC1hY2Y4LWQzNDE3ODI5NTMwNg.jpg'),
  new UserTemplate('alex1', 'Alex', 'alex@alex.com', 23, 'Male', 'Aldgate East', 'password', 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAtvAAAAJDQwN2U4NTBhLWY4NDgtNDA1NC05ZGE1LWZjODc4Y2NkMGNiOQ.jpg'),
  new UserTemplate('lou1', 'Lourenco', 'lou@lou.com', 27, 'Male', 'Whitechapel', 'password', '../images/lou.jpg'),
  new UserTemplate('dave1', 'Dave', 'dave@dave.com', 28, 'Male', 'Whitechapel', 'password', '../images/dave.png'),
  new UserTemplate('danai1', 'Danai', 'danai@danai.com', 25, 'Female', 'Whitechapel', 'password', 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAA0yAAAAJGQ1ZDQ5ZmQwLWFlODMtNGY0OS04ZTkxLTkyNzg5ZjRiM2YxMA.jpg'),
  new UserTemplate('max1', 'Maxim', 'max@max.com', 20, 'Male', 'Whitechapel', 'password', 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAcFAAAAJDE4NDEzNDYwLTFmOWYtNGEwMy1hOTVhLTliYjMxZDE4MDNiYQ.jpg'),
  new UserTemplate('jack1', 'Jack', 'jack@jack.com', 27, 'Male', 'Bethnal Green', 'password', '../images/jack.png'),
  new UserTemplate('casey1', 'Casey', 'casey@casey.com', 23, 'Female', 'Bethnal Green', 'password', 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAVFAAAAJGZmZGQ0MWI4LWE0ZjMtNGNlYy1iMzFlLWU3MTIwM2EzZGQwNg.jpg'),
  new UserTemplate('ed1', 'Ed', 'ed@ed.com', 25, 'Male', 'Bethnal Green', 'password', 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAqkAAAAJGJjMDA5YjQxLWFlNzgtNDhjNS04ZjQyLTVmMTU4NWUwZTg4Mg.jpg'),
  new UserTemplate('nat1', 'Nat', 'nat@nat.com', 25, 'Female', 'Bethnal Green', 'password', 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/1/005/085/112/3fde578.jpg'),
  new UserTemplate('did1', 'Didrik', 'didrik@didrik.com', 22, 'Male', 'Kensington', 'password', 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAA1vAAAAJGYwZGVlMGYxLWY3MmEtNDYxZS04MWM4LWY2ODE2MTFiZmUwYw.jpg'),
  new UserTemplate('harry1', 'Harry', 'harry@harry.com', 23, 'Male', 'Mayfair', 'password', 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAaJAAAAJDkxOTliNmU4LTk4MzEtNDgxYS05ZDExLTJlZTE3YTMxZmVjYw.jpg'),
  new UserTemplate('louis1', 'Louis', 'louis@louis.com', 27, 'Male', 'Belgravia', 'password', 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAVkAAAAJDM4MmNiMzg5LTUyMDUtNGIwOS04MTNiLWU4ZGZjMTJjZGJlOA.jpg'),
  new UserTemplate('edie1', 'Edie', 'edie@edie.com', 24, 'Female', 'Kensington', 'password', 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAxmAAAAJDU2MjY4OGY1LWE3ZjktNDg5NC1iMjE2LTY2OTkzNGRlNDdjMw.jpg'),
  new UserTemplate('lee1', 'Lee', 'lee@lee.com', 23, 'Male', 'Mayfair', 'password', 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAA1yAAAAJGYzZTdlMDM4LTMxMmQtNGFjNS1hNjY4LTVjZjZiMGUzY2NmMw.jpg'),
  new UserTemplate('marisa1', 'Marisa', 'marisa@marisa.com', 30, 'Female', 'Kingston', 'password', 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAWFAAAAJDNjYTMxZTlhLTlmYzEtNDQ0NC04ODdmLTdjYjU5MjFhM2M5YQ.jpg'),
  new UserTemplate('hass1', 'Hassan', 'hass@hass.com', 26, 'Male', 'Hampton Wick', 'password', 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAjyAAAAJDVjNmE3NjE0LWEzYWUtNGQxMC1iYzgxLWU0MWIwZjE1NjYwZg.jpg'),
  new UserTemplate('anna1', 'Anna', 'anna@anna.com', 25, 'Female', 'Kingston', 'password', 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAApsAAAAJDY2NzFlOGY3LWJmYTUtNDc0Yy05YWQ1LTllNDk2Y2MwMDljMw.jpg'),
  new UserTemplate('charlie1', 'Charlie', 'charlie@charlie.com', 27, 'Male', 'Hampton Wick', 'password', '../images/jack.png'),
  new UserTemplate('monju1', 'Monju', 'monju@monju.com', 28, 'Male', 'Hampton', 'password', 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAuYAAAAJDBjYTg4Y2NiLWUxNjktNDI3MC04YjBlLTk1NmE2ZmE0N2JjMg.jpg')
])
.then(users => {
  console.log(`${users.length} users created!`);
  // console.log('PasswordHash:', users[1].passwordHash);
  // console.log('PasswordConfirmation:', users[1].passwordConfirmation);
  // console.log('users[1].name:', users[1].name);
  // console.log('users[3].email:', users[3].email);

  return Group.create([
    {
      name: 'Aldgate Runchers',
      admin: users[0]._id,
      members: [users[0]._id, users[1]._id, users[2]._id],
      image: 'http://www.runningismypassport.com/wp-content/uploads/2015/05/running-0045.jpg',
      schedule: [{
        day: 'Tuesday',
        date: new Date('May 23, 2017 12:00:00'),
        startTime: '12:00',
        location: 'E1 7PT',
        meetingPoint: 'Aldgate East Station',
        distance: '3.0 km',
        description: 'A nice easy run around through the City of London',
        maxRunners: 10
      }/*,{
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
      }*/],
      comments: [
        { comment: 'Welcome to my organised run. We\'re going to be running at 12:30. Don\'t be late.', user: users[0]._id },
        { comment: 'I joined but I think it\'s going to be raining', user: users[1]._id },
        { comment: 'We run rain or shine', user: users[2]._id }
      ]
    },
    {
      name: 'Whitechapel Runchers',
      admin: users[3]._id,
      members: [users[3]._id, users[4]._id, users[5]._id, users[6]._id, users[1]._id, users[2]._id],
      image: 'http://running.competitor.com/files/2012/03/Good-Running-Form.jpg',
      schedule: [{
        day: 'Monday',
        date: new Date('May 22, 2017 12:30:00'),
        startTime: '12:30',
        location: 'E1 1BY',
        meetingPoint: 'Whitechapel Tube Station',
        distance: '4.0 km',
        description: 'A fast paced run',
        maxRunners: 8
      }/*,
      {
        day: 'Thursday',
        date: new Date('2017-05-18'),
        startTime: '13:00',
        location: 'Whitechapel Tube Station',
        distance: '5.0 km',
        description: 'A fast paced run',
        maxRunners: 8
      }*/],
      comments: [
        { comment: 'Welcome to my run group. I run a mile in 6 minutes so if you can\'t keep up, don\'t join.', user: users[3]._id },
        { comment: 'I average about 6 mins 20 secs a mile. Can I still join?', user: users[4]._id },
        { comment: 'Yeah I guess', user: users[3]._id },
        { comment: 'Can I bring my pet bear along?', user: users[6]._id }
      ]
    },
    {
      name: 'Bethnal Green Runchers',
      admin: users[7]._id,
      members: [users[7]._id, users[8]._id, users[9]._id, users[10]._id],
      image: 'https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2013/5/7/1367930926942/A-running-group-training--008.jpg?w=700&q=55&auto=format&usm=12&fit=max&s=9d3798295399683096a9a2a624a2e4e7',
      schedule: [{
        day: 'Friday',
        date: new Date('May 19, 2017 14:00:00'),
        startTime: '14:00',
        location: 'E2 0ET',
        meetingPoint: 'Bethnal Green Tube Station',
        distance: '2.0 km',
        description: 'This is going to be a nice short run. Should help you clear your mind during your lunch break.',
        maxRunners: 15
      }],
      comments: [
        { comment: 'This should be a nice fun run this Friday', user: users[7]._id },
        { comment: 'Should be nice weather right?', user: users[8]._id },
        { comment: 'I can\'t wait to get out of the office. This desk posture is killing me.', user: users[10]._id },
        { comment: 'Me too! Looking forward to the hotdog afterwards.', user: users[9]._id},
        { comment: 'That kind of defeats the purpose, Ed.', user: users[10]._id},
        { comment: 'Protein Nat, protein.', user: users[9]._id}
      ]
    },
    {
      name: 'Hyde Park Runchers',
      admin: users[11]._id,
      members: [users[11]._id, users[12]._id, users[13]._id, users[14]._id, users[15]._id],
      image: 'http://www.warriorwomen.co.uk/wp-content/uploads/2008/07/gcr200708.jpg',
      schedule: [{
        day: 'Friday',
        date: new Date('May 19, 2017 12:00:00'),
        startTime: '12:00',
        location: 'W2 2UH',
        meetingPoint: 'The South Gate',
        distance: '4.0 km',
        description: 'We\'ll be doing a nice leisurely run around the park',
        maxRunners: 10
      }],
      comments: [
        { comment: 'Hi everyone. We meet at 12.00 pm on the dot.', user: users[11]._id },
        { comment: 'I hope it doesn\'t rain', user: users[14]._id },
        { comment: 'Shouldn\'t do. The forecast says it\'s fine', user: users[13]._id },
        { comment: 'It\'s meant to be quite warm. I might have to cool off in the river after the run.', user: users[12]._id},
        { comment: 'Good call Harry. I\'ll probably join you too', user: users[15]._id},
        { comment: 'You\'re just looking for any excuse to take your top off', user: users[12]._id},
        { comment: 'You\'ll probably get arrested if you swim in the river', user: users[14]._id},
        { comment: 'You\'re just jealous of my button game', user: users[12]._id}
      ]
    },
    {
      name: 'Kingston Runchers',
      admin: users[16]._id,
      members: [users[16]._id, users[17]._id, users[18]._id, users[19]._id, users[20]._id],
      image: 'https://farm2.staticflickr.com/1685/25619392222_9b72360005_z.jpg',
      schedule: [{
        day: 'Wednesday',
        date: new Date('May 24, 2017 13:00:00'),
        startTime: '13:00',
        location: 'KT1 4DQ',
        meetingPoint: 'East entrance of Bushy Park',
        distance: '5.0 km',
        description: 'This will be a medium paced run along the paths of Bushy Park.',
        maxRunners: 8
      }],
      comments: [
        { comment: 'We\'ll be meeting at 1.00 pm at the east entrance of Bushy Park near Hampton Wick train station.', user: users[16]._id },
        { comment: 'Last time I visited Bushy Park I got chased by a deer', user: users[20]._id },
        { comment: 'Yeah they\'re dangerous at this time of year as it\'s mating season. Stay away from the deer and you should be fine.', user: users[18]._id },
        { comment: 'We should go for pizza aftwards.', user: users[19]._id}
      ]
    }
  ]);
})
.then(groups => {
  // groupsArray = groups;
  console.log(`${groups.length} groups created!`);


  process.exit();
})
.catch(err => {
  console.log('seeds file error:', err);
})
.finally(() => {
  mongoose.connection.close();
  console.log('closed');
});
// });
