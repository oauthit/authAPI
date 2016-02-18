(function(angular, undefined) {
  angular.module("authApiApp.constants", [])

.constant("appConfig", {
	"userRoles": [
		"guest",
		"user",
		"admin"
	],
	"jsDataBasePath": "http://localhost:9000/api/opr/"
})

;
})(angular);