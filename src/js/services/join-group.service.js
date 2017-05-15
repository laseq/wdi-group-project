angular
  .module('runchApp')
  .service('JoinGroupService', JoinGroupService);

JoinGroupService.$inject = ['User', 'TokenService', 'Group', 'CurrentUserService'];
function JoinGroupService(User, TokenService, Group, CurrentUserService) {
  const self = this;

  self.currentUserId = TokenService.decodeToken().id;
  self.loggedInUser = CurrentUserService.currentUser;


  self.joinGroup = function(group) {
    console.log('group:', group);
    console.log('self.loggedInUser:', self.loggedInUser);

    for (let i=0; i<group.members.length; i++) {
      if (group.members[i] === self.currentUserId) {
        console.log('You\'ve already joined this group');
        return false;
      }
    }

  };


}
