


$(document).ready(function () {


    //game counter variable
    var currentSet = 0;
    var timeRemaining = 15;
    var correctCounter = 0;
    var wrongCounter = 0;
    var unanweredCounter = 0;


    //question set variable
    var questionSet = [

        {
            q: "When Iron Man is struck by Thor's lightning what happens?",

            options: [
                "Tony Stark's chest piece gives out and he goes into cardiac arrest.",
                "His suit shuts down and he is trapped in his own armor.",
                "It super charges his armor up to 400%.",
                "It is deflected and strikes Captain America."],
            a: "It super charges his armor up to 400%."
        },

        {
            q: "What is the name of the blue glowing square that Loki uses as a weapon?",
            options: [
                "The Soulstone",
                "The Infinity Gem",
                "The Tesseract",
                "The Forever Cube"],
            a: "The Tesseract"

        },

        {
            q: "Which of the following Avengers from the comics is not in the movie?",
            options: [
                "Black Widow",
                "Hawkeye",
                "Captain America",
                "The Wasp"],
            a: "The Wasp"

        },

        {
            q: " What is Agent Coulson's first name?",
            options: [
                "Steven",
                "Phil",
                "Cal",
                "John"],
            a: "Phil"

        },

        {
            q: "When Loki is locked up in the S.H.I.E.L.D. helicarrier, who gets him to reveal that he is planning to get Banner to change into the Hulk and destroy the ship from within?",
            options: [
                "Nick Fury",
                "Thor",
                "Iron Man",
                "Black Widow"],
            a: "Black Widow"

        },

        {
            q: "When the Avengers are in the streets of New York Captain America starts issuing orders. What are his orders to the Hulk?",
            options: [
                "Smash",
                "Turn back into Banner and help Tony reinitialize his armor.",
                "Destroy the force field surrounding the machine that is keeping the hole open.",
                "Throw a nuclear bomb into the rift in space."],
            a: "Smash"
        },

        {
            q: "Which Avenger's girlfriend makes an appearance in the film that isn't just a quick picture or a flashback to one of their solo movies?",
            options: ["Jane Foster (Thor)",
                "Betty Ross (Hulk)",
                "Peggy Carter (Captain America)",
                "Pepper Potts (Iron Man)"],
            a: "Pepper Potts (Iron Man)"
        }];

  





    // var initialize = function (){
    //     $("#gameScreen").hide()
    //     };



    var startGame = function () {
        //hide start button 
        $("#start").hide();
        $("#gameScreen").show()
        generateQuestion()
        timer();
        userTimeout();

    }



    //generate question

    function generateQuestion (){
        $("#gameScreen").append("<p><strong>" +
            questionSet[currentSet].q +
            "</strong></p> <button class ='options'>" + questionSet[currentSet].options[0] +
            "</button> <button class ='options'>" + questionSet[currentSet].options[1] +
            "</button> <button class ='options'>" + questionSet[currentSet].options[2] +
            "</button> <button class ='options'>" + questionSet[currentSet].options[3] +
            "</button>");
    }

    //when user's answer is correct
    function userWin() {
        $("#gameScreen").html("<p>Correct. Good job! </p>")
        correctCounter++;
        setTimeout(nextQuestion, 4000);
        currentSet++;
       
    }

    //when user's answer is wrong
    function userLose() {
        var correctAnswer = questionSet[currentSet].a;
        $("#gameScreen").html("<p>Wrong Answer! The Answer Is <span class='answer'>" + correctAnswer + "</span></p>");
        wrongCounter++;
        setTimeout(nextQuestion, 4000);
        currentSet++;
        
    }

    var userTimeout = function () {
        if (timeRemaining === 0) {
            var correctAnswer = questionSet[currentSet].a;
            $("#gameScreen").html("<p>You ran out of time! The Answer Is <span class='answer'>" + correctAnswer + "</span></p>")
       
            unanweredCounter++;
            
            
            setTimeout(nextQuestion, 4000);
            currentSet++;
           
        }
    }
    
    function timer() {
        
       setIntervalId = setInterval(countdown, 1000);

        function countdown() {
            if (timeRemaining < 1) {
                clearInterval(setIntervalId);
                userTimeout();
            }

           else if (timeRemaining >0) {
                timeRemaining--;
            }
            $("#timer").html("<strong>" + timeRemaining + "</strong>");

        }

    }

    var nextQuestion = function () {
        if (currentSet < questionSet.length) {
            console.log(questionSet.length)
            console.log(currentSet)
            timeRemaining = 15;
            $("#gameScreen").html("<p>You have <span id='timer'>" + timeRemaining + "</span> seconds left!</p>");
            generateQuestion();
            timer();
            userTimeout();

        }
        else {
            $("#gameScreen").html("<p> Correct: " + correctCounter + "</p><p> Wrong:" + wrongCounter + "</p> <p> Unanswered: " + unanweredCounter + "<p>");
            // reset();
            // $("#start").click(nextQuestion);
        }
    }





    // $("#gameScreen").on("click","button", function(){

    // userChoice = $(this).text();
    // console.log(userChoice);

    // if(userChoice === questionSet[currentSet].a){
    //     $("#gameScreen").html("<p>Correct. Good Job!</p>");
    //     clearInterval(timeRemaining);
    //     correctCounter ++;
    //     currentSet ++;
    //    setTimeout(nextQuestion, 2000);

    // }
    // else if(userChoice != questionSet[currentSet].a){
    //     $("#gameScreen").html("<p>Wrong Answer! The Answer Is "  + questionSet[currentSet].a +"</p>");
    //     wrongCounter ++;
    //     currentSet ++;
    //     setTimeout(nextQuestion, 2000);
    // }



   




    



    //reset game
    function reset() {
        currentSet = 0;
        correctCounter = 0;
        wrongCounter = 0;
    }


    // initialize();

    $("#start").click(nextQuestion);

    $("#gameScreen").on("click", "button", (function () {

        var userChoice = $(this).text();
        if (userChoice === questionSet[currentSet].a) {
            clearInterval(setIntervalId);
            userWin();
        }
        else {
            clearInterval(setIntervalId);
            userLose()
        }

    }));

});







