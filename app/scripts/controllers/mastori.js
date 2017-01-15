'use strict';

/**
 * @ngdoc function
 * @name app.controller:MastoriCtrl
 * @description
 * # MastoriCtrl
 * Controller of the app
 */
angular.module('app')
  .controller('MastoriCtrl', ['$scope', '$state', 'MastoriModel', 'AppointmentModel', 'RatingModel', 'AuthService', 'toaster',
    function ($scope, $state, MastoriModel, AppointmentModel, RatingModel, AuthService, toaster) {

    $scope.mastori = MastoriModel.query({id: $state.params.id});
    $scope.user = AuthService.user();

    var appointmentQueryParams = {orderby: 'created_at', order: 'desc', mastori_id: $state.params.id};
    var ratingQueryParams = {orderby: 'created_at', order: 'desc', mastori_id: $state.params.id};

    var today = new Date();

    $scope.ratings = RatingModel.query(ratingQueryParams);

    var appointmentInit = function() {
    	$scope.appointment = new AppointmentModel();
    	$scope.appointment.deadline = new Date(
			today.getFullYear(),
			today.getMonth(),
			today.getDate() + 1
		);
		$scope.appointment.address_id = $scope.user.addresses[0].id;
    };

    $scope.appoointmentRatingInit = function(appointment) {
        appointment.rating = new RatingModel();
    }

    $scope.deadline = {
    	maxDate: new Date(
			today.getFullYear(),
			today.getMonth() + 1,
			today.getDate()
		),
    	minDate: today
    };

    $scope.submitAppointment = function(form) {
    	$scope.appointment.mastori_id = $scope.mastori.id;
    	$scope.appointment.user_id = $scope.user.id;

    	form.$setPristine(); // clear form
    	form.$setUntouched();

		$scope.appointment.$save(function(saved){
			appointmentInit(); // reset appointment

			toaster.pop('success', "Ωραίος!", "Το μαστόρι ενημερώθηκε για το ραντεβού! Επιπλέον κέρδισες " + saved.points_rewarded + " μαστοροπόντους!!");
		}, function(error){
			toaster.pop('error', "Ουπς!", "Κάτι δεν πήγε καλά.. Ξαναπροσπάθησε παρακαλώ!");
		});
    }

    $scope.submitRating = function(form, appointment) {
        form.$setPristine(); // clear form
        form.$setUntouched();

        appointment.rating.mastori_id = $scope.mastori.id;
        appointment.rating.appointment_id = appointment.id;

        appointment.rating.$saveForMastori(function(saved){

            toaster.pop('success', "Κομπλέ!", "Σε ευχαριστούμε για την κριτική σου! Θα δημοσιευτεί μόλις την εγκρίνει ο μαστορο-admin! By the way, μόλις κέρδισες " + saved.points_rewarded + " μαστοροπόντους!!");
        }, function(error){
            toaster.pop('error', "Ουπς!", "Κάτι δεν πήγε καλά.. Ξαναπροσπάθησε παρακαλώ!");
        });
    }

    $scope.loadMoreAppointments = function() {
  		if ($scope.busyAp) {
  			return;
  		}
  		$scope.busyAp = true;

  		var page = $scope.appointments.current_page + 1;
  		var queryParams = angular.extend({page: page}, appointmentQueryParams);
    	var oldData = $scope.appointments.data;

    	AppointmentModel.query(queryParams, function (data) {
    		$scope.busyAp = false;
    		$scope.appointments = data;
    		$scope.appointments.data = oldData.concat(data.data);
    	});
    }

    $scope.loadMoreRatings= function() {
        if ($scope.busyAp) {
            return;
        }
        $scope.busyRat = true;

        var page = $scope.ratings.current_page + 1;
        var queryParams = angular.extend({page: page}, ratingQueryParams);
        var oldData = $scope.ratings.data;

        RatingModel.query(queryParams, function (data) {
            $scope.busyRat = false;
            $scope.ratings = data;
            $scope.ratings.data = oldData.concat(data.data);
        });
    }

    var initloggedInActions = function() {
        appointmentInit();
        $scope.appointments = AppointmentModel.query(appointmentQueryParams);
    }

    // If user is logged in init appointment, fetch past appointments
    if ($scope.user) {
    	initloggedInActions();
    }

    $scope.$on('user:logedin', function(event,data) {
     $scope.user = AuthService.user();
     initloggedInActions();
   });

}]);
