(function(angular, undefined) {
  angular.module("authApiApp.constants", [])

.constant("appConfig", {
	"userRoles": [
		"guest",
		"user",
		"admin"
	],
	"jsDataBasePath": "http://localhost:9090/api/opr/"
})

;
})(angular);