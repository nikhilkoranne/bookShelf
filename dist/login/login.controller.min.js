angular.module('bookShelf')
  .controller('LoginController', ['$scope', 'AuthService', '$location',
    function ($scope, AuthService, $location) {
      var vm = this;
      vm.inValidLogin = false;

      vm.login = login;
      vm.logout = logout;
      vm.isLoggedIn = isLoggedIn;

      function isLoggedIn() {
        return AuthService.isLoggedIn();
      }

      function logout() {
        AuthService.logout();
        $location.path('/login');
      }

      function login(loginForm) {
        if (loginForm.$valid) {
          if (AuthService.login(vm.loginModel)) {
            $location.path('/books');
            vm.inValidLogin = false;
          } else {
            vm.inValidLogin = true;
          }
        }
      }

    }]);