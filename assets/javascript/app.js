$(document).ready(function() {

//global variable
    //question set variable
var questionSet= [
    
    {
        q: "When Iron Man is struck by Thor's lightning what happens?",

        options: ["Tony Stark's chest piece gives out and he goes into cardiac arrest.",
        "His suit shuts down and he is trapped in his own armor.", 
        "It super charges his armor up to 400%.", 
        "It is deflected and strikes Captain America."],

        a: "It super charges his armor up to 400%."

    },

    {
        q: "What is the name of the blue glowing square that Loki uses as a weapon?",
    
        options: ["The Soulstone",
        "The Infinity Gem", 
        "The Tesseract", 
        "The Forever Cube"],
    
        a: "The Tesseract"
    
        }

];



var currentSet = 0;
//game counter variable

var timeRemaining = 30;
var correctCounter = 0;
var wrongCounter = 0;
var unanweredCounter = 0;

//before start: reset game counters hide question & option buttons

var initialize = function (){
    $("#remainingTime").hide()
    $("#question").hide();
    $("#options").hide();
    }







var startGame = function (){
    //hide start button and show timer, question, and options
    $("#start").hide();
    $("#remainingTime").show()
    $("#question").show();
    $("#options").show();
    generateQuestion()
    timer();
    userTimeout();

}
    
    
      
//generate question
    
    var generateQuestion = function (){
       
        
       
        $("#gameScreen").append("<p>"+
        questionSet[currentSet].q +
        "</p> <button>"+ questionSet[currentSet].options[0]+
        "</button> <button>"+ questionSet[currentSet].options[1]+
        "</button> <button>"+ questionSet[currentSet].options[2]+
        "</button> <button>"+ questionSet[currentSet].options[3]+
        "</button>");
    
    }    


          
    var nextQuestion = function(){
        if(currentSet < questionSet.length){
            timeRemaing = 30;
            generateQuestion();
            timer();
            userTimeout();

        }
        else {
            $("#gameScreen").append ("<p> Correct: "+ correctCounter+ "</p><p> Wrong:" + wrongCounter +"</p> <p> Unanswered: " + unanweredCounter+"<p>");
           
        }
    }
    

    var userTimeout = function(){
        if(timeRemaining ===0){
            $("gameScreen").html("You ran out of time!")
            unanweredCounter ++;

            setTimeout(nextQuestion,4000);
            currentSet ++;
        }
    }
        

    $("#gameScreen").on("click","button", function(){
   
    userChoice = $(this).text();
    console.log(userChoice);
    
    if(userChoice === questionSet[currentSet].a){
        $("#gameScreen").html("Good Job!");
        clearInterval(timeRemaining);
        correctCounter ++;
        currentSet ++;
       setTimeout(nextQuestion, 4000);
          
    }
    else if(userChoice != questionSet[currentSet].a){
        $("#gameScreen").html("Wrong Answer! The Answer Is "  + questionSet[currentSet].a );
        wrongCounter ++;
        currentSet ++;
        setTimeout(nextQuestion, 4000);
    }
    
    

    });

   

    

    
    function timer(){

        var timeRemaining = 30;
       
        var setIntervalId = setInterval(countdown, 1000);
       

        function countdown(){
            if (timeRemaining < 1) {
                clearInterval(setIntervalId);
                userTimeout();
            }
                
            else {
                timeRemaining --;
                $("#remainingTime").text("Remaining Time: " + timeRemaining);
            }


    }
}



    //reset game
    function reset(){
        currentSet = 0;
        correctCounter =0;
        wrongCounter =0;
    } 

    

initialize();
$("#start").on("click", startGame());






});
