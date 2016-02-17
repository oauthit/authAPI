'use strict';

(function() {

function AuthService ($location, $http, $q, Token, appConfig, Util, User, $rootScope) {

  var safeCb = Util.safeCb;
  var currentUser = {};
  var userRoles = appConfig.userRoles || [];

  if (Token.get() && $location.path() !== '/logout') {
    currentUser = User.get();
    currentUser.$promise.then(function(){
      console.log ('logged-in');
      $rootScope.$broadcast('logged-in');
    });
  }

  var Auth = {

    loginWithMobileNumber (mobileNumber) {

      return $http.get ('/auth/pha/' + mobileNumber);

    },

    authWithSmsCode (id,code) {

      return $http.get ('/auth/pha/' + id + '/' + code)
        .then (function (res){
          var token = res.headers ('x-access-token');
          return {
            token: token,
            user: res.data
          };
        });

    },

    /**
     * Authenticate user and save token
     *
     * @param  {Object}   user     - login info
     * @param  {Function} callback - optional, function(error, user)
     * @return {Promise}
     */
    login (token, callback) {
      return $http.get('/api/token/' + token, {
        headers: {
          'authorization': token
        }
      })
        .then(user => {
          currentUser = user.data;
          Token.save(token);
          safeCb (callback) (null, currentUser);
          $rootScope.$broadcast('logged-in');
          return currentUser;
        })
        .catch(err => {
          Auth.logout();
          safeCb (callback) (err.data);
          return $q.reject (err.data);
        });
    },

    /**
     * Delete access token and user info
     */
    logout() {
      Token.destroy();
      currentUser = {};
    },

    /**
     * Create a new user
     *
     * @param  {Object}   user     - user info
     * @param  {Function} callback - optional, function(error, user)
     * @return {Promise}
     */
    createUser(user, callback) {
      return User.save(user,
        function(data) {
          Token.save(data.token);
          currentUser = User.get();
          return safeCb(callback)(null, user);
        },
        function(err) {
          Auth.logout();
          return safeCb(callback)(err);
        }).$promise;
    },

    /**
     * Gets all available info on a user
     *   (synchronous|asynchronous)
     *
     * @param  {Function|*} callback - optional, funciton(user)
     * @return {Object|Promise}
     */
    getCurrentUser(callback) {
      if (arguments.length === 0) {

        return currentUser;
      }

      var value = (currentUser.hasOwnProperty('$promise')) ?
        currentUser.$promise : currentUser;
      return $q.when(value)
        .then(user => {
          safeCb(callback)(user);
          return user;
        }, () => {
          safeCb(callback)({});
          return {};
        });
    },

    /**
     * Check if a user is logged in
     *   (synchronous|asynchronous)
     *
     * @param  {Function|*} callback - optional, function(is)
     * @return {Bool|Promise}
     */
    isLoggedIn(callback) {
      if (arguments.length === 0) {
        return currentUser.hasOwnProperty('roles');
      }

      return Auth.getCurrentUser(null)
        .then(user => {
          var is = user.hasOwnProperty('roles');
          safeCb(callback)(is);
          return is;
        });
    },

     /**
      * Check if a user has a specified role or higher
      *   (synchronous|asynchronous)
      *
      * @param  {String}     role     - the role to check against
      * @param  {Function|*} callback - optional, function(has)
      * @return {Bool|Promise}
      */
    hasRole(role, callback) {
      var hasRole = function(r, h) {
        return userRoles.indexOf(r) >= userRoles.indexOf(h);
      };

      if (arguments.length < 2) {
        return hasRole(currentUser.role, role);
      }

      return Auth.getCurrentUser(null)
        .then(user => {
          var has = (user.hasOwnProperty('roles')) ?
            hasRole(user.roles, role) : false;
          safeCb(callback)(has);
          return has;
        });
    },

     /**
      * Check if a user is an admin
      *   (synchronous|asynchronous)
      *
      * @param  {Function|*} callback - optional, function(is)
      * @return {Bool|Promise}
      */
    isAdmin() {
      return Auth.hasRole
        .apply(Auth, [].concat.apply(['admin'], arguments));
    },

    /**
     * Get auth token
     *
     * @return {String} - a token string used for authenticating
     */
    getToken() {
      return Token.get();
    }
  };

  return Auth;
}

angular.module('authApiApp.auth')
  .factory('Auth', AuthService);

})();
