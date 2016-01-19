// Some common logic for all the forms
savet7App.service('formHelperService', function() {

  return {

    showError : function(fieldName, formName, $scope) {
      return ($scope[formName][fieldName].$invalid && $scope[formName][fieldName].$touched)
          || ($scope[formName][fieldName].$invalid && $scope.submitted);
    }

  };
});