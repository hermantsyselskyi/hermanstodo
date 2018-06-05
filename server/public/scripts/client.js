//Here is our App
const app = angular.module('ToDoApp', []);
//Seting up controller and putting all logic inside of it.
app.controller('ToDoController', ['$http', function($http) {
//Now vm = this and its binded with our tc mark in HTML.
    let vm = this;
//Making an array for all of our tasks
    vm.toDos = [];
//Submitting our new task
    vm.addTask = function() {
//Console logging our object
        console.log('Add Task');
        console.log(vm.newTask);
//Sending it to back end
        $http({
            method: 'POST',
            url: '/tasks',
//Data is our new task
            data: vm.newTask
        }).then(function(response) {
//Clearing inputs 
            vm.clearInputs();
//Refreshing Dom
            vm.getTasks();
        }).catch(function(error) {
//We are being a good server
            console.log('Error from POST', error);  
        });
    }
//Refreshing info for DOM
    vm.getTasks = function() {
        $http({
            method: 'GET',
            url: '/tasks'
        }).then(function(response) {
            vm.toDos = response.data;
        }).catch(function(error) {
            console.log('Error from GET', error);
            
        })
    }
//clearInputs aka assigning an empty array for NAME
    vm.clearInputs = function() {
        vm.newTask = {
            name: ''
        }
    }
//Thanks Ally for explaining this part.
    vm.completeTask = function(selectedToDo) {
//Console logging our object
        console.log('complete button!');
        console.log('task to delete', selectedToDo);
//Sorting part
        let updatedData = {
            completed: true
        }
//Updating backend
        $http({
            method: 'PUT',
//Sending ID
            url: `/tasks/${selectedToDo._id}`,
            data: updatedData
        }).then(function(response) {
//Refresh DOM
            vm.getTasks();
        }).catch(function(error) {
//We are good server
            console.log('Error from PUT', error);
            
        })
        
    }
//Deleting 
    vm.deleteTask = function(taskToDelete) {
        console.log('Delete!');
        console.log(taskToDelete);
//If statement, to make sure that we wanna delete it. If its True we are deleting it if not its not running
        if(confirm('Are you super sure about that?')) {
            $http({
                method: 'DELETE',
//Sending ID
                url: `/tasks/${taskToDelete._id}`
            }).then(function(response) {
//Refresh DOM
                vm.getTasks();
                
            }).catch(function(error) {
                console.log('Error from DELETE', error);
                
            })
        }
        
    }
//Refreshing our server
    vm.getTasks();
}]);