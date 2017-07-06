'use strict';


angular.module('app')
  .controller('ProfileCtrl', ['$scope', 'AuthService', 'AppointmentModel', 'RatingModel', 'UserModel', 'toaster', 'moment',
  	function ($scope, AuthService, AppointmentModel, RatingModel, UserModel, toaster, $moment) {

  		// we dont wont the changes in user model to be directly saved to $localStorage
  		// but only on user save success callback
      $scope.user = new UserModel(AuthService.user());

      $scope.mobileRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

      var appointmentQueryParams = {orderby: 'created_at', order: 'desc', user_id: $scope.user.id};

      $scope.appointments = AppointmentModel.query(appointmentQueryParams);

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

    	$scope.appoointmentRatingInit = function(appointment) {
        appointment.rating = new RatingModel();
    	}

      $scope.canSubmitRating = function(appointment) {
        var appointmentDeadline = $moment(appointment.deadline, "YYYY-MM-DD HH");
        var now = $moment();

        return appointment && now.diff(appointmentDeadline, 'hours') > 1;
      }

    	$scope.submitRating = function(form, appointment) {
        form.$setPristine(); // clear form
        form.$setUntouched();

        appointment.rating.mastori_id = appointment.mastori.id;
        appointment.rating.appointment_id = appointment.id;

        appointment.rating.$saveForMastori(function(saved){

            toaster.pop('success', "Κομπλέ!", "Σε ευχαριστούμε για την κριτική σου! Θα δημοσιευτεί μόλις την εγκρίνει ο μαστορο-admin! By the way, μόλις κέρδισες " + saved.points_rewarded + " μαστοροπόντους!!");
        }, function(error){
            toaster.pop('error', "Ουπς!", "Κάτι δεν πήγε καλά.. Ξαναπροσπάθησε παρακαλώ!");
        });
    	}

    	$scope.updateUser = function(form) {
    		form.$setPristine(); // clear form
        form.$setUntouched();

    		$scope.user.$save(function(saved) {
    			// update user in localStorage
    			AuthService.updateUserData(saved);
        	toaster.pop('success', "Ετοιμος!", "Τα στοιχεία του λογαριασμού σου ανανεώθηκαν με επιτυχία!");
	      }, function(error){
	        toaster.pop('error', "Ουπς!", "Κάτι δεν πήγε καλά.. Ξαναπροσπάθησε παρακαλώ!");
	      });
    	}

}]);
