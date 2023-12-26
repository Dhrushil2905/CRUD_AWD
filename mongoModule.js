var usermodel = angular.module('userApp', [])

usermodel.controller('userCtrl', ($scope, $http) => {
    $scope.userData = []
    $scope.newuserData = {}

    $scope.getUserData = () => {
        $http.get('/api/getUserData').then((response) => {
            $scope.userData = response.data
        })
    }

    $scope.addUser = () => {
        $http.post('/api/addUser', $scope.newuserData).then((response) => {
            $scope.userData.push(response.data)
            $scope.newuserData = {}
        })
    }
    $scope.deleteItem = function (item) {
        $http.delete(`/api/delete/${item}`).then((response) => {
            $scope.items = response.data
            $scope.getUserData()
        })
    }
    $scope.updateItem = (item) => {
        $scope.edit = true
        $scope.updatedItem = item
    }
    $scope.editItem = function (up) {
        $http.put(`/api/update/${up.userID}`, up).then((response) => {
            $scope.items = response.data
        })
        $scope.getUserData()
    }
    $scope.getUserData()

})
