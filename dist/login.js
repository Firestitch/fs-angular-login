
(function () {
    'use strict';

    angular.module('fs-angular-login',['fs-angular-password','fs-angular-date'])
    .directive('fsLogin', function(fsPassword) {
        return {
            templateUrl: 'views/directives/login.html',
            restrict: 'E',
            scope: {
            	user: '=fsUser',
            	fsActivateUser: '&',
            	fsSendActivation: '&',
            	fsSavePassword: '&',
            	userActive: '=?fsUserActive'
            },
            controller: function($scope) {

            	$scope.activation = !!$scope.fsActivateUser;

            	$scope.passwordModal = function() {
            		fsPassword.show()
            		.then(function(password) {
            			$scope.fsSavePassword({ $password: password });
            		});
	            }

	            $scope.activateUser = function() {
	            	$scope.$parent.$eval($scope.fsActivateUser,{ user: $scope.user });
	            }

	            $scope.sendActivation = function() {
	            	$scope.$parent.$eval($scope.fsSendActivation,{ user: $scope.user });
	            }
            }
        };
    });
})();

angular.module('fs-angular-login').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/directives/login.html',
    "<fs-heading>Login Information<fs-heading-subheading ng-if=\"user.id\"><div ng-if=\"activation && user.activated\">Activated <span ng-show=\"user.activated_date\">{{user.activated_date | fsDate}}</span></div><div ng-if=\"activation && !user.activated\">Login not yet activated</div><div ng-if=\"user.login_date\">Last Logged in {{user.login_date | fsDate}}</div></fs-heading-subheading></fs-heading><div ng-if=\"activation\"><div ng-if=\"!userActive\"><md-checkbox-container ng-show=\"!user.activated\"><md-checkbox ng-model=\"user.send_activation\" aria-label=\"Send invite\" ng-true-value=\"1\" ng-false-value=\"0\">Send activation email</md-checkbox><div class=\"hint\">User will be invited to setup their password to login</div></md-checkbox-container></div><div ng-if=\"userActive && !user.activated\"><a href ng-click=\"sendActivation()\" class=\"activate-send\">Send activation email</a><div class=\"hint\">User will be invited to setup their password to login</div><a href ng-click=\"activateUser()\" class=\"activate-user\">Activate user</a><div class=\"hint\">User will be activated but will not receive a notification or password. You can then set their password manually.</div></div></div><div layout=\"row\" ng-show=\"!activation || user.activated\"><div><md-text-container class=\"md-block\"><label><md-icon>email</md-icon>Email</label><div class=\"text\">{{user.email}}</div></md-text-container></div><div flex=\"5\"></div><div ng-show=\"fsSavePassword\"><md-text-container class=\"md-block\"><label><md-icon>vpn_key</md-icon>Password</label><a class=\"text\" href ng-click=\"passwordModal()\">Update Password</a></md-text-container></div></div>"
  );

}]);
