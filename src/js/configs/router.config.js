angular
  .module('runchApp')
  .config(Router);

Router.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider'];
function Router($stateProvider, $locationProvider, $urlRouterProvider){
  $locationProvider.html5Mode(true);

  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: '/js/views/home.html'
  })
  .state('register', {
    url: '/register',
    templateUrl: '/js/views/register.html',
    controller: 'RegisterCtrl',
    controllerAs: 'register'
  })
  .state('login', {
    url: '/login',
    templateUrl: '/js/views/login.html',
    controller: 'LoginCtrl',
    controllerAs: 'login'
  })
  .state('dashboard', {
    url: '/dashboard',
    templateUrl: '/js/views/dashboard.html',
    controller: 'DashboardCtrl',
    controllerAs: 'dashboard'
  })
  .state('usersProfile', {
    url: '/users/profile', // called it profile to avoid confusion with usersShow
    templateUrl: '/js/views/users/profile.html',
    controller: 'UsersProfileCtrl',
    controllerAs: 'usersProfile'
  })
  .state('usersEdit', {
    url: '/users/edit', // took out the :id as we're not using the id, using main.user
    templateUrl: '/js/views/users/edit.html',
    controller: 'UsersEditCtrl',
    controllerAs: 'usersEdit'
  })
  .state('usersShow', {
    url: '/users/:id',
    templateUrl: '/js/views/users/show.html',
    controller: 'UsersShowCtrl',
    controllerAs: 'usersShow'
  })
  .state('usersNew', {
    url: '/users/new',
    templateUrl: '/js/views/users/new.html',
    controller: 'UsersNewCtrl',
    controllerAs: 'usersNew'
  })
  .state('groupsEdit', {
    url: '/groups/:id/edit',
    templateUrl: '/js/views/groups/edit.html',
    controller: 'GroupsEditCtrl',
    controllerAs: 'groupsEdit'
  })
  .state('groupsIndex', {
    url: '/groups',
    templateUrl: '/js/views/groups/index.html',
    controller: 'GroupsIndexCtrl',
    controllerAs: 'groupsIndex'
  })
  .state('groupsNew', {
    url: '/groups/new',
    templateUrl: '/js/views/groups/new.html',
    controller: 'GroupsNewCtrl',
    controllerAs: 'groupsNew'
  })
  .state('groupsShow', {
    url: '/groups/:id',
    templateUrl: '/js/views/groups/show.html',
    controller: 'GroupsShowCtrl',
    controllerAs: 'groupsShow'
  });

  $urlRouterProvider.otherwise('/');
}
