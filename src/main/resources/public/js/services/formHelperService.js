// Some common logic for all the forms
savet7App.service('formHelperService', function() {

  return {

    showError : function(fieldName, formName, $scope) {
      return ($scope.addressForm[fieldName].$invalid && $scope.addressForm[fieldName].$touched)
          || ($scope.addressForm[fieldName].$invalid && $scope.submitted);
    }

  };
});