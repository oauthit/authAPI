'use strict';

(function () {

  angular.module('authApiApp.core.interceptors')
    .factory('errorInterceptor', function ($q, $injector) {
      return {
        /**
         *
         * @param   {*} response
         *
         * @returns {*|Promise}
         */
        response: function responseCallback(response) {
          if (response.data.error &&
            response.data.status &&
            response.data.status !== 200
          ) {
            return $q.reject(response);
          } else {
            return response || $q.when(response);
          }
        },

        /**
         * Interceptor method that is triggered whenever response error occurs on $http requests.
         *
         * @param   {*} response
         *
         * @returns {*|Promise}
         */
        responseError: function responseErrorCallback(response) {
          var message = '';

          if (response.data && response.data.error) {
            message = response.data.error;
          } else if (response.data && response.data.message) {
            message = response.data.message;
          } else {
            if (typeof response.data === 'string') {
              message = response.data;
              if (message.length === 0) {
                message = $injector.get('saHttpStatusService').getStatusCodeText(response.status);
              }
            } else if (response.statusText) {
              message = response.statusText;
            } else {
              message = $injector.get('saHttpStatusService').getStatusCodeText(response.status);
            }

            message = message + ' <span class="text-small">(HTTP status ' + response.status + ')</span>';
          }

          if (message) {
            $injector.get('saMessageService').error(message);
          }

          return $q.reject(response);
        }
      };
    })
  ;

}());
