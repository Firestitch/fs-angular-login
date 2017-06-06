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
            	activeUser: '=?fsActiveUser'
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