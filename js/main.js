var totalDivs;
var currentDiv = 0;
var setSpeed = 1000;
var increaseval=0;
var game=false;
var chainInterval;
var waitVar=true;
var playcnt=0;
var totobj;
var initial=false;
var appeartime=1000;
var fadeIntimer=300;
var eachdatashow=500;
var currentpartfade=100;
var currentparthide=200;
var nextpartshow=300;
var finalfadeout=300;
var finalfadein=600;

$(document).ready(function(){

	$(window).resize(function(){
		resizeFn()
	})


	$("#play").bind("click",function(e){
		playFn()
	});

	$("#modelbtn").bind("click",function(){
		game=false;
	})

	$(".close").bind("click",function(){
		game=true;
	})

	

	$("#prev").bind("click",function(){
		if(currentDiv>1){
			currentDiv-=1;
		}
		//console.log("prev "+currentDiv)
	});

	$("#next").bind("click",function(){
		if(currentDiv<(totalDivs)){
			currentDiv+=1;
		}
		//console.log("next "+currentDiv)
	});


	$("#replay").bind("click",function(e){
		console.log("replay")
		clearInterval(chainInterval);
		game=false;
		playcnt=0;
		hideFn()
		initial=false;
		$("#showsolution").css("display","none");
		//$("#play").trigger("click");
		playFn()
		$("#play").css("display","none")
		$("#play").text("Pause");
		$("#replay").css("display","none");
		$("#play").css("visibility","visible")
		$("#prev").css("visibility","hidden");
		$("#next").css("visibility","hidden");
	});


	$("#showsolution").bind("click",function(e){
		console.log("showsolution")
		showsolutionFn()
	});

	$("#prev").css("display","none");
	$("#next").css("display","none");
	$("#prev").css("visibility","hidden");
	$("#next").css("visibility","hidden");
	$("#replay").css("display","none");
	$("#showsolution").css("display","none");
	$("#showanswer").css("display","none");
	
	
	
});


function resizeFn(){
	//console.log($(".container").css("width")+" "+window.innerHeight);
	//console.log("main "+ $("#main div").length)
	var cpos=$(".container").css("width");
	$("#main").css("height",(window.innerHeight-(window.innerHeight/5))+"px")
}

function showsolutionFn(){
	$("#mydata"+playcnt).fadeOut(fadeIntimer,"",function(){
		$("#mydata"+playcnt).css("display","none")
	});
	setTimeout(function()
	{
		resetFn();
	},fadeIntimer)

	$("#showsolution").css("display","none");
	$("#showanswer").css("display","none");
	$("#play").css("display","block")
	$("#main").css("overflow-y","hidden");
}

function playFn(){
	if(!game){
		//console.log("game true")
		game=true;
		if(!initial){
			initial=true;
			//$("#showsolution").trigger("click");
			showsolutionFn()
			$("#showsolution").css("display","block");
			$("#showanswer").css("display","block");
			$("#main").css("overflow-y","auto");
		}
		$("#play").text("Pause");
		$("#prev").css("visibility","hidden");
		$("#next").css("visibility","hidden");
	}else{
		//console.log("game false")
		$("#main").css("overflow-y","hidden");
		$("#play").text("Play");
		$("#prev").css("visibility","visible");
		$("#next").css("visibility","visible");
		game=false;
	}

}

function hideFn(){
	for(var i=1;i<=totobj;i++){
		$("#mydata"+i).css("display","none")
	}
}

function showFn(){
	for(var i=1;i<=totobj;i++){
		$("#mydata"+i).css("display","block")
	}
}


function totobjFn(val){
	totobj=val;
}

function showobjFn(){
	$("#mydata"+playcnt).css("display","none")
	setTimeout(function(){
		$("#mydata"+playcnt).css("display","none")
		animFn()
	},fadeIntimer)
}

function animFn(){
	$("#mydata"+playcnt).fadeIn();
	setTimeout(function(){
		$("#mydata"+playcnt).css("display","block")
	},appeartime)

	if(playcnt>1){
		totalDivs = $("#solution"+(playcnt)+"> div").length;
		$("#solution"+(playcnt)+" > div").css("display","none")
		//console.log("totalDivs "+totalDivs)
		game=true;
		chainInterval = setInterval(showChain, setSpeed,playcnt);  
	}
}


function resetFn(){
	currentDiv = 0;
	setSpeed = 1000;
	increaseval=0;
	game=false;
	playcnt+=1;
	showobjFn()
	//console.log("playcnt "+playcnt)
}

function waitingFn(){
	waitVar=true;
}

function showChain(idcnt) { 
	//console.log("timeinterval "+setSpeed+" "+game+" "+idcnt)
	if(game && waitVar){
		if (currentDiv < totalDivs) {

			waitVar=false

			$("#solution"+ idcnt+"> div:eq(" + currentDiv + ")").fadeIn(eachdatashow);

			increaseval+=$("#solution"+ idcnt+"> div:eq(" + currentDiv + ")").height();
			$("#main").animate({ scrollTop: (increaseval+"px") },1000);
			var eachdiv=$("#solution"+ idcnt+"> div:eq(" + currentDiv + ")").height()
			currentDiv++;
			//console.log("data "+$("#solution"+ idcnt+"> div:eq(" + currentDiv + ")").text().length);
			var eachdata=$("#solution"+ idcnt+"> div:eq(" + (currentDiv-1) + ")").text().length;

			if(eachdata>20){
				setSpeed=3000;
			}else{
				setSpeed=1000;
			}
			

			setTimeout(waitingFn,setSpeed)
		} else {
			//console.log("clearInterval"+totobj)
			game=false;
			clearInterval(chainInterval);

			if(playcnt<totobj){
				$("#mydata"+playcnt).fadeOut(currentpartfade);

				setTimeout(function()
				{
					$("#mydata"+playcnt).css("display","none");
				},currentparthide);

				setTimeout(function()
				{
					resetFn()
				},nextpartshow);

			}else{
				
				$("#replay").css("display","block");
				$("#play").css("visibility","hidden")
				$("#prev").css("visibility","hidden");
				$("#next").css("visibility","hidden");
				
				$("#main").fadeOut(finalfadeout,"",function(){
					showFn()
					$("#main").css("overflow-y","auto");
				});
				$("#main").fadeIn(finalfadein);
				$("#main").animate({ scrollTop: (0) },1000);
				
			}
		}
	}
}