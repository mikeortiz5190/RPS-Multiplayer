
$( document ).ready(function(){

//AUDIO FILES

var audioOne = new Audio("assets/audio/Mortal_Kombat.mp3");

var audioTwo = new Audio("assets/audio/fireplace.mp3");

var audioThree = new Audio("assets/audio/Creepy_Laugh.mp3");

var audioFour = new Audio("assets/audio/click.wav");

//INITIAL VARIABLES

var playerOneWins = 0;

var playerTwoWins = 0;

var ties = 0;

var weaponSelectOne = "";

var weaponSelectTwo = "";

var insults = "";

//PLAY MUSIC WHEN PAGE LOADS

audioOne.play();

audioTwo.play();


  // Initialize Firebase
   var config = {
    apiKey: "AIzaSyANca2nC_ksILX-vVZfN8zqNkT3j4hH0uo",
    authDomain: "rps-multiplayer-4f302.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-4f302.firebaseio.com",
    projectId: "rps-multiplayer-4f302",
    storageBucket: "rps-multiplayer-4f302.appspot.com",
    messagingSenderId: "460136300624"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  //VARIABLES FOR WHEN A R/P/S IS CLICKED ON, PLAYER 1/ PLAYER2 RESPECTIVELY;

//function for player one to go first
  turnOne();

function turnOne(){

    weaponSelectOne = $(this).attr("data-weapon");

if(weaponSelectOne === "ROCK") {
    

    $("#player1-weapon").append($("<p>").text("ROCK"));

    audioFour.play();

    console.log(weaponSelectOne);

    database.ref("/playerOne").set({
        weaponSelectOne: weaponSelectOne

      });

      turnTwo();
        //code for displaying player one choice
}

else if(weaponSelectOne === "PAPER"){

    $("#player1-weapon").append($("<p>").text("PAPER"));

    audioFour.play();

    console.log(weaponSelectOne);

    database.ref("/playerOne").set({
        weaponSelectOne: weaponSelectOne

      });

      turnTwo();

    }



else if(weaponSelectOne === "SISSORS"){

    $("#player1-weapon").append($("<p>").text("SISSORS"));

    audioFour.play();

    console.log(weaponSelectOne);

    database.ref("/playerOne").set({
        weaponSelectOne: weaponSelectOne

      });

      turnTwo();

    }
};

function turnTwo(){

        $(".weapon4").click(function(){
    $(this).data("clicked", true);
});

$(".weapon5").click(function(){
    $(this).data("clicked", true);
});

$(".weapon6").click(function(){
    $(this).data("clicked", true);
});

if($(".weapon4").data("clicked")){
    weaponSelectTwo = $(".weapon4").attr("data-weapon");

    $("#player2-weapon").append($("<p>").text(weaponSelectTwo));

    audioFour.play();

    console.log(weaponSelectTwo);

    database.ref("/playerTwo").set({
        weaponSelectTwo: weaponSelectTwo

      });

        //code for displaying player one choice
    }

if($(".weapon5").data("clicked")){
    weaponSelectTwo = $(".weapon5").attr("data-weapon");

    $("#player2-weapon").append($("<p>").text(weaponSelectTwo));

    audioFour.play();

    console.log(weaponSelectTwo);

    database.ref("/playerTwo").set({
        weaponSelectTwo: weaponSelectTwo
      });

        //code for displaying player one choice
    }

if($(".weapon6").data("clicked")){
    weaponSelectTwo = $(".weapon6").attr("data-weapon");

    $("#player2-weapon").append($("<p>").text(weaponSelectTwo));

    audioFour.play();

    console.log(weaponSelectTwo);

    database.ref("/playerTwo").set({
        weaponSelectTwo: weaponSelectTwo

      });

        //code for displaying player one choice
    }

};

//DATABASE VARIABLES

database.ref().set({
        weaponSelectOne: weaponSelectOne,
        weaponSelectTwo: weaponSelectTwo,
        insults: insults

      });

//LOGIC FOR RPS


    function rps(){
        if ((weaponSelectOne === "ROCK") && (weaponSelectTwo === "SISSORS")) {
            playerOneWins++;
            //$("#stage").html($("<p>").html(ranNum));
            $("#stage").append("<h3 class='main-text>Player 1 WINS!</h3>"+"<h4 class='main-text>Player 2 you SUCK!</h3>");
          }
          else if ((weaponSelectOne === "ROCK") && (weaponSelectTwo === "PAPER")) {
            playerTwoWins++;
            $("#stage").append("<h3 class='main-text>Player 1 WINS!</h3>"+"<h4 class='main-text>Player 2 you SUCK!</h3>");
          }
          else if ((weaponSelectOne === "SISSORS") && (weaponSelectTwo === "ROCK")) {
            playerTwoWins++;
            $("#stage").append("<h3 class='main-text>Player 1 WINS!</h3>"+"<h4 class='main-text>Player 2 you SUCK!</h3>");
          }
          else if ((weaponSelectOne === "SISSORS") && (weaponSelectTwo === "PAPER")) {
            playerOneWins++;
            $("#stage").append("<h3 class='main-text>Player 1 WINS!</h3>"+"<h4 class='main-text>Player 2 you SUCK!</h3>");
          }
          else if ((weaponSelectOne === "PAPER") && (weaponSelectTwo === "ROCK")) {
            playerOneWins++;
            $("#stage").append("<h3 class='main-text>Player 1 WINS!</h3>"+"<h4 class='main-text>Player 2 you SUCK!</h3>");
          }
          else if ((weaponSelectOne === "PAPER") && (weaponSelectTwo === "SISSORS")) {
            playerTwoWins++;
            $("#stage").append("<h3 class='main-text>Player 1 WINS!</h3>"+"<h4 class='main-text>Player 2 you SUCK!</h3>");
          }
          else if (weaponSelectOne === weaponSelectTwo) {
            ties++;
          }
          //else if((playerOneWins === 3)&&( playerTwoWins == 3)){
              //suddenDeath();
          //}

    };

 //SUDDEN DEATH
 //function suddenDeath(){
     //audioThree.play();
     
 //}

//THE RPS FUCNTION IS CALLED WHEN PAGE LOADS
 rps();

    

//INITIAL LOAD

database.ref().on("value", function(snapshot) {
        console.log(snapshot.val());
        console.log(snapshot.val().weaponSelectOne);
        console.log(snapshot.val().weaponSelectTwo);
        console.log(snapshot.val().insults);
        
        $("#").html(snapshot.val().weaponSelectOne);
        $("#").html(snapshot.val().weaponSelectTwo);
        $(".").html(snapshot.val().insults);

      });

//CODE FOR DISPLAYING THE RESULT OF RPS ROUND


//TEXT BOX FOR FOUL ABUSIVE SLURS

});
