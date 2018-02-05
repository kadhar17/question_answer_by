                    var totalDivs;
                    var currentDiv = 0;
                    var setSpeed = 1000;
                    var increaseval=0;
                    var game=false;
                    var chainInterval;
                    var waitVar=true;

                    $(document).ready(function(){
                        "use strict";
                        $("#prev").css("display","none");
                        $("#next").css("display","none");
                        $("#prev").css("visibility","hidden");
                        $("#next").css("visibility","hidden");

                        $(window).resize(function(){
                            console.log($(".container").css("width")+" "+window.innerHeight);

                            var cpos=$(".container").css("width");
                            $("#outline").css("height",(window.innerHeight-(window.innerHeight/6))+"px")
                            $("#outline").css("width",cpos)
                            $("#banner").css("width",cpos)
                            $("#banner").css("text-align","center");
                        })

                        $(window).trigger("resize");

                        $("#banner").html("<h1>Play the Question</h1>")
                        
                        $("a.show_chain").click(function () {
                         totalDivs = $("#main div").length;
                         currentDiv = 0;
                         setSpeed = 1000;
                         increaseval=0;
                         game=false;
                         animateFn()    
                     });

                        $(window).focus(function() {

                        });

                        $(window).blur(function() {

                        });

                        function animateFn(){
                            chainInterval = setInterval(showChain, setSpeed);  
                        }

                        function waitingFn(){
                            if(currentDiv==(totalDivs-1)){
                                $("#play").css("visibility","hidden")
                                $("#prev").css("visibility","hidden");
                                $("#next").css("visibility","hidden");
                            }
                            waitVar=true;
                        }

                        function showChain() { 
                            console.log("timeinterval "+setSpeed+" "+game)
                            if(game && waitVar){
                                if (currentDiv < totalDivs) {
                                    waitVar=false
                                    
                                    $("#main  div:eq(" + currentDiv + ")").fadeIn(1000,"swing");
                                    
                                    increaseval+=$("#main  div:eq(" + currentDiv + ")").height();
                                    $("#main").animate({ scrollTop: (increaseval+"px") },1000);
                                    var eachdiv=$("#main  div:eq(" + currentDiv + ")").height()
                                    currentDiv++;
                                    console.log("data "+$("#main  div:eq(" + currentDiv + ")").text().length);
                                    var eachdata=$("#main  div:eq(" + (currentDiv-1) + ")").text().length;
                                    if(eachdata<20){
                                        setSpeed= 3000;
                                    }else{
                                        setSpeed= (100 * eachdata );
                                    }

                                    if(setSpeed>7000){
                                        setSpeed=7000;
                                    }

                                    
                                    setTimeout(waitingFn,setSpeed)
                                } else {
                                    console.log("clearInterval")
                                    game=false;
                                    
                                    clearInterval(chainInterval);
                                }
                            }
                        }

                        $("a.show_chain").trigger("click")

                        $("#play").click(function(e){
                            if(!game){
                                game=true;
                                $(this).text("Pause");
                                $("#prev").css("visibility","hidden");
                                $("#next").css("visibility","hidden");
                                $("#banner").css("display","none")
                            }else{
                                $(this).text("Play");
                                $("#prev").css("visibility","visible");
                                $("#next").css("visibility","visible");
                                $("#banner").css("display","none")
                                game=false;
                            }
                            
                        });

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
                            $("#main div").css("display","none")
                            totalDivs = $("#main div").length;
                            currentDiv = 0;
                            setSpeed = 1000;
                            increaseval=0;
                            game=false;
                            $("#play").text("Play");
                            $("#play").css("visibility","visible")
                            $("#prev").css("visibility","hidden");
                            $("#next").css("visibility","hidden");
                            $("#banner").css("display","block")
                            chainInterval = setInterval(showChain, setSpeed);
                        });
                    });
