angular
  .module('runchApp')
  .service('JoinGroupService', JoinGroupService);

JoinGroupService.$inject = ['User', 'TokenService', 'Group', 'CurrentUserService'];
function JoinGroupService(User, TokenService, Group, CurrentUserService) {
  const self = this;

  self.currentUserId = TokenService.decodeToken().id;
  self.loggedInUser = CurrentUserService.currentUser;


  self.joinGroup = function(group) {

    for (let i=0; i<group.members.length; i++) {
      if (group.members[i] === self.currentUserId) {
        console.log('You\'ve already joined this group');
        return false;
      }
    }

    if (group.schedule[0].maxRunners <= group.members.length) {
      console.log('Maximum number of runners has been reached');
      return false;
    }

    group.members.push(self.currentUserId);
    self.loggedInUser.groups.push(group);
    Group
      .update({ id: group._id }, group)
      .$promise
      .then(() => {
        User
          .update({ id: self.currentUserId }, self.loggedInUser)
          .$promise
          .then(() => {
            console.log('Joined group');
          });
      });
  };

}
