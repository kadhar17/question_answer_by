var app=angular.module("myapp",[]);

app.run(function($rootScope){
  $rootScope.title="Step by Step";
  $rootScope.appId='';
})

app.controller("mycontroller",function($scope,$http,$rootScope, $interval,$timeout){


 $http.get("./data.json").then(function(response){

  var myObj = {}
  var key = 0;
  for(var i in response.data)
  {
    for(var j in response.data[i])
    {

      if(key !=0)
      {
        myObj[key] = response.data[i][j];
      }
      key++;
    }
  }

  console.log(myObj)
  console.log(key)
  $scope.mydata=myObj;  
  $rootScope.appId=response.data.appId[0];
  totobjFn(key-1)
  hideFn()

})



});