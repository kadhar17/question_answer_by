var app=angular.module("myapp",[]);

app.run(function($rootScope,$location, $window){

  $rootScope.title="Step by Step";
  $rootScope.appId='';
  $rootScope.href=$window.location.href;
  $rootScope.params=$rootScope.href.split('?');
  $rootScope.id=$rootScope.params[1];

})




app.controller("mycontroller",function($scope,$http,$rootScope, $interval,$timeout,$window){

 $scope.totalDivs;
 $scope.currentDiv = 0;
 $scope.setSpeed = 1000;
 $scope.increaseval=0;
 $scope.game=false;
 $scope.chainInterval;
 $scope.waitVar=true;
 $scope.playcnt=0;
 $scope.totobj;
 $scope.initial=false;
 $scope.appeartime=1000;
 $scope.fadeIntimer=300;
 $scope.eachdatashow=500;
 $scope.currentpartfade=100;
 $scope.currentparthide=200;
 $scope.nextpartshow=300;
 $scope.finalfadeout=300;
 $scope.finalfadein=600;

 $http.get("./"+$rootScope.id+".json").then(function(response){
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
  $scope.pausectrl=false;
  $scope.actdata=response.data;
  $scope.mydata=myObj;  
  $rootScope.appId=response.data.info.step0.appId;
  $scope.totobjFn(key-1)

  $scope.animate=response.data.info.step0.animate;
  console.log("animate "+ $scope.animate)
  $scope.initialload()

  if($scope.animate=='true'){
    console.log("animate true")
    $scope.hideFn()

    $timeout(function(){
     $scope.playFn()

     $("#play").css("display","none")
   },500)
  }else{
   console.log("animate false")
   // $timeout(function(){
   //   $scope.playFn()
   // },500)
 }



})

 $scope.modelopen=function(){
   $scope.pausectrl=false;
   if($scope.game){
     $scope.pausectrl=true;
     $scope.game=false;
   }
 }

 $scope.modelclose=function(){
  if($scope.pausectrl){
   $scope.game=true;
 }
}

$scope.showsolutionFn=function(){

  $("#mydata"+$scope.playcnt).fadeOut($scope.fadeIntimer,"",function(){
    $("#mydata"+$scope.playcnt).css("display","none")
  });
  $timeout(function()
  {
    $scope.resetFn();
  },$scope.fadeIntimer)

  $("#showsolution").css("display","none");
  $("#showanswer").css("display","none");
  $("#play").css("display","block")
  // $("#main").css("overflow-y","hidden");
}

$scope.replayFn=function(){
  console.log("replay")
  $interval.cancel($scope.chainInterval);
  $scope.game=false;
  $scope.playcnt=0;
  $scope.hideFn()
  $scope.initial=false;
  $("#showsolution").css("display","none");
  $scope.playFn()
  $("#play").css("display","none")
  $("#play").text("Pause");
  $("#replay").css("display","none");
  $("#play").css("visibility","visible")
}


// $(window).resize(function(){
//   $scope.playFn()
// })

$scope.resizeFn=function (){
  console.log("resizeFn")
  var cpos=$(".container").css("width");
  $("#main").css("height",(window.innerHeight-(window.innerHeight/5))+"px")
}

$scope.playFn=function (){
  if(!$scope.game){
    //console.log("game true")
    $scope.game=true;
    if(!$scope.initial){
      $scope.initial=true;
      //$("#showsolution").trigger("click");
      $scope.showsolutionFn()
      $("#showsolution").css("display","block");
      $("#showanswer").css("display","block");
      $("#main").css("overflow-y","auto");
    }
    $("#play").text("Pause");
  }else{
    //console.log("game false")
    //$("#main").css("overflow-y","hidden");
    $("#play").text("Play");
    $scope.game=false;
  }

}

$scope.hideFn=function(){
  for(var i=1;i<=$scope.totobj;i++){
    $("#mydata"+i).css("display","none")
  }
}

$scope.showFn=function(){
  for(var i=1;i<=$scope.totobj;i++){
    $("#mydata"+i).css("display","block")
  }
}


$scope.totobjFn=function(val){
  console.log("totobjFn")
  $scope.totobj=val;
}

$scope.showobjFn=function(){
  $("#mydata"+$scope.playcnt).css("display","none")
  $timeout(function(){
    $("#mydata"+$scope.playcnt).css("display","none")
    $scope.animFn()
  },$scope.fadeIntimer)
}

$scope.animFn=function(){
  $("#mydata"+$scope.playcnt).fadeIn();
  $timeout(function(){
    $("#mydata"+$scope.playcnt).css("display","block")
  },$scope.appeartime)

  if($scope.playcnt>1){
    $scope.totalDivs = $("#solution"+($scope.playcnt)+"> div").length;
    $("#solution"+($scope.playcnt)+" > div").css("display","none")
    //console.log("totalDivs "+totalDivs)
    $scope.game=true;
    $scope.chainInterval = $interval($scope.showChain, $scope.setSpeed);  
  }
}


$scope.resetFn=function(){
  $scope.currentDiv = 0;
  $scope.setSpeed = 1000;
  $scope.increaseval=0;
  $scope.game=false;
  $scope.playcnt+=1;
  $scope.showobjFn()
  //console.log("$scope.playcnt "+$scope.playcnt)
}

$scope.waitingFn=function(){
  console.log("waitingFn")
  $scope.waitVar=true;

}

$scope.showChain=function() { 

 console.log("timeinterval "+$scope.setSpeed+" "+$scope.game+" "+$scope.playcnt+" "+$scope.waitVar)

 if($scope.game && $scope.waitVar){
  if ($scope.currentDiv < $scope.totalDivs) {

    $scope.waitVar=false

    $("#solution"+ $scope.playcnt+"> div:eq(" + $scope.currentDiv + ")").fadeIn($scope.eachdatashow);

    $scope.increaseval+=$("#solution"+ $scope.playcnt+"> div:eq(" + $scope.currentDiv + ")").height();
    $("#main").animate({ scrollTop: ($scope.increaseval+"px") },1000);
    var eachdiv=$("#solution"+ $scope.playcnt+"> div:eq(" + $scope.currentDiv + ")").height()
    $scope.currentDiv++;
      //console.log("data "+$("#solution"+ $scope.playcnt+"> div:eq(" + $scope.currentDiv + ")").text().length);
      var eachdata=$("#solution"+ $scope.playcnt+"> div:eq(" + ($scope.currentDiv-1) + ")").text().length;

      if(eachdata>20){
        $scope.setSpeed=3000;
      }else{
        $scope.setSpeed=1000;
      }
      $timeout($scope.waitingFn,$scope.setSpeed)

    } else {
      console.log("$interval.cancel"+$scope.totobj)
      $scope.game=false;
      $interval.cancel($scope.chainInterval);

      if($scope.playcnt<$scope.totobj){
        $("#mydata"+$scope.playcnt).fadeOut($scope.currentpartfade);

        $timeout(function()
        {
          $("#mydata"+$scope.playcnt).css("display","none");
        },$scope.currentparthide);

        $timeout(function()
        {
          $scope.resetFn()
        },$scope.nextpartshow);

      }else{

        $("#replay").css("display","block");
        $("#play").css("visibility","hidden")
        
        $("#main").fadeOut($scope.finalfadeout,"",function(){
          $scope.showFn()
          $("#main").css("overflow-y","auto");
        });
        $("#main").fadeIn($scope.finalfadein);
        $("#main").animate({ scrollTop: (0) },1000);
        
      }
    }
  }
}


$scope.initialload=function(){
  console.log("initialload")
  $("#replay").css("display","none");
  $("#showsolution").css("display","none");
  $("#showanswer").css("display","none");
}


});

app.filter('renderHTMLCorrectly', function($sce)
{
  return function(stringToParse)
  {
    return $sce.trustAsHtml(stringToParse);
  }
});

app.directive('resizedir', ['$window', function ($window) {

 return {
  link: link,
  restrict: 'E',
  template: '{{resizeFn()}}'
};

function link(scope, element, attrs){

 scope.height = $window.innerHeight;

 angular.element($window).bind('resize', function(){

  scope.height = $window.innerHeight;
         // manuall $digest required as resize event
         // is outside of angular
         scope.$digest();
       });

}

}]);