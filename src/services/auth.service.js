angular.module('bookShelf')
  .factory('AuthService', ['$http', '$q',
    function ($http, $q) {

      var users = [{
        username: 'admin',
        password: 'password'
      }]

      function isLoggedIn() {
        return localStorage.getItem('loggedIn') === 'true';
      }

      function logout() {
        return localStorage.setItem('loggedIn', false);
      }

      function login(loginModel) {
        var authenticated = false;
        authenticated = users.filter(function (user) {
          return user.username === loginModel.username && user.password === loginModel.password;
        }).length !== 0;
        if (authenticated) {
          localStorage.setItem('loggedIn', true);
          return authenticated;
        }
        return authenticated;
      }

      return {
        isLoggedIn: isLoggedIn,
        login: login,
        logout: logout
      };

    }]);