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
var fadeIntimer=500;

$(document).ready(function(){

	$("#prev").css("display","none");
	$("#next").css("display","none");
	$("#prev").css("visibility","hidden");
	$("#next").css("visibility","hidden");
	$("#replay").css("display","none");
	$("#showsolution").css("display","none");

	$(window).resize(function(){
		console.log($(".container").css("width")+" "+window.innerHeight);
		console.log("main "+ $("#main div").length)
		var cpos=$(".container").css("width");
		$("#main").css("height",(window.innerHeight-(window.innerHeight/5))+"px")

	})

	$(window).trigger("resize");

	$("#play").click(function(e){
		if(!game){
			console.log("game true")
			game=true;
			if(!initial){
				initial=true;
				$("#showsolution").trigger("click");
				$("#showsolution").css("display","block");
				$("#main").css("overflow-y","auto");
			}
			$(this).text("Pause");
			$("#prev").css("visibility","hidden");
			$("#next").css("visibility","hidden");
		}else{
			console.log("game false")
			$("#main").css("overflow-y","hidden");
			$(this).text("Play");
			$("#prev").css("visibility","visible");
			$("#next").css("visibility","visible");
			game=false;
		}

	});

	$("#modelbtn").click(function(){
		game=false;
	})

	$(".close").click(function(){
		game=true;
	})

	

	$("#prev").click(function(){
		if(currentDiv>1){
			currentDiv-=1;
		}
		console.log("prev "+currentDiv)
	});

	$("#next").click(function(){
		if(currentDiv<(totalDivs)){
			currentDiv+=1;
		}
		console.log("next "+currentDiv)
	});


	$("#replay").click(function(e){
		clearInterval(chainInterval);
		game=false;
		playcnt=0;
		hideFn()
		initial=false;
		$("#showsolution").css("display","none");
		$("#play").trigger("click");
		$("#play").css("display","none")
		$("#play").text("Pause");
		$("#replay").css("display","none");
		$("#play").css("visibility","visible")
		$("#prev").css("visibility","hidden");
		$("#next").css("visibility","hidden");
		//$("#banner").css("display","block")
		//chainInterval = setInterval(showChain, setSpeed);
	});


	$("#showsolution").click(function(e){
		$("#mydata"+playcnt).fadeOut(fadeIntimer,"",function(){
			$("#mydata"+playcnt).css("display","none")
		});
		setTimeout(function()
		{
			resetFn();
		},fadeIntimer)

		$("#showsolution").css("display","none");
		$("#play").css("display","block")
		$("#main").css("overflow-y","hidden");
		//$("#play").trigger("click");
	})

	$("#play").trigger("click");
	$("#play").css("display","none")

});

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
	$("#mydata"+playcnt).fadeIn(fadeIntimer,"",function(){
		console.log("callback");
		setTimeout(animFn,fadeIntimer)
	});
}

function animFn(){
	$("#mydata"+playcnt).fadeIn(fadeIntimer,"",function(){
		$("#mydata"+playcnt).css("display","block")
	});

	if(playcnt>1){
		totalDivs = $("#solution"+(playcnt)+"> div").length;
		$("#solution"+(playcnt)+" > div").css("display","none")
		console.log("totalDivs "+totalDivs)
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
	console.log("playcnt "+playcnt)
}

function waitingFn(){
	waitVar=true;
}

function showChain(idcnt) { 
	console.log("timeinterval "+setSpeed+" "+game+" "+idcnt)
	if(game && waitVar){
		if (currentDiv < totalDivs) {

			waitVar=false

			$("#solution"+ idcnt+"> div:eq(" + currentDiv + ")").fadeIn(1000);

			increaseval+=$("#solution"+ idcnt+"> div:eq(" + currentDiv + ")").height();
			//$("#main").animate({ scrollTop: (increaseval+"px") },1000);
			var eachdiv=$("#solution"+ idcnt+"> div:eq(" + currentDiv + ")").height()
			currentDiv++;
			console.log("data "+$("#solution"+ idcnt+"> div:eq(" + currentDiv + ")").text().length);
			var eachdata=$("#solution"+ idcnt+"> div:eq(" + (currentDiv-1) + ")").text().length;
			
			setSpeed=1000;

			setTimeout(waitingFn,setSpeed)
		} else {
			console.log("clearInterval"+totobj)
			game=false;
			clearInterval(chainInterval);

			if(playcnt<totobj){
				$("#mydata"+playcnt).fadeOut(fadeIntimer,"",function(){
					$("#mydata"+playcnt).css("display","none");
				});
				setTimeout(function()
				{
					resetFn()
				},fadeIntimer);

			}else{
				
				$("#replay").css("display","block");
				$("#play").css("visibility","hidden")
				$("#prev").css("visibility","hidden");
				$("#next").css("visibility","hidden");
				
				$("#main").fadeOut(fadeIntimer,"",function(){
					showFn()
					$("#main").css("overflow-y","scroll");
				});

				$("#main").fadeIn(1000,"",function(){
					
				});
				//$("html, body").animate({ scrollTop: 0 }, 5000);
				//$("#main").animate({ scrollTop: (0) },5000);
			}
		}
	}
}