
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

var player1 = "";

var player2 = "";

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

  window.onload = function(){
    //$("#playing-field").hide(); 
    $(".player-one-buttons").hide();
    $(".player-two-buttons").hide();
    $("#textOne").hide();
    $("#textTwo").hide();
  };

$("#start").on('click', function(){
    $("#myModal").modal("show");
    audioFour.play();
    $("#start").hide();
});

$("#add-name").on('click', function(){
    var nameInput = $("#name-input").val().trim();
    console.log(nameInput);
    NameYourPlayer(nameInput);
    audioFour.play();
    $("#myModal").modal("hide");
    //$("#playing-field").show();
})


function NameYourPlayer(name){
    database.ref("/players").once("value", function (snapshot) {
      console.log('value player 1 ', snapshot.val())
        p1 = snapshot.child("player1").exists();
        p2 = snapshot.child("player2").exists();
      console.log(p1);
      console.log(p2);
             if (!p1) {
                console.log("no one is in yet");
                database.ref("/players").set({
                    player1: name
                })
                $(".name1").html($("<h3>").html(name));
                console.log("Player 1 is logged in! ");
                enterPlayerOne(name);
                return name;

            } 
            else if (p1 == true && !p2){
                var addNewPlayer = {};
                addNewPlayer['/player2'] = name;
                database.ref("/players").update(addNewPlayer);
                $(".name2").html($("<h3>").html(name));
                console.log("Player 2 is logged in! ");
                enterPlayerTwo(name);
                return name;       
            }
    
    });
};

function enterPlayerOne(name1){
    $(".player-one-buttons").show();
    $("#textOne").show();
    database.ref("/textbox1").set({
        playerOneIs: name1
    });
    console.log("did it work?");
};

function enterPlayerTwo(name2){
    $(".player-two-buttons").show();
    $("#textTwo").show();
    database.ref("/textbox2").set({
        playerTwoIs: name2
    });
    console.log("did it work?");
};

database.ref("/players").on("value", function (snapshot) {
    p1 = snapshot.child("player1").exists();
    p2 = snapshot.child("player2").exists();
    if(p1 && p2){
        console.log(p1);
        console.log(p2);
        $(".name1").html($("<h3>").html(snapshot.val().player1));
        $(".name2").html($("<h3>").html(snapshot.val().player2));
    }

    else {
        return false;
    }
});


  //VARIABLES FOR WHEN A R/P/S IS CLICKED ON, PLAYER 1/ PLAYER2 RESPECTIVELY;

//function for player one to go first



$('.weapon1').on('click', function(){
    weaponSelectOne = $(this).attr("data-weapon");
    console.log(weaponSelectOne);
    turnTwo();
});

$('.weapon2').on('click', function(){
    weaponSelectOne = $(this).attr("data-weapon");
    console.log(weaponSelectOne);
    turnTwo();
}); 

$('.weapon3').on('click', function(){
    weaponSelectOne = $(this).attr("data-weapon");
    console.log(weaponSelectOne);
    turnTwo();
});   

function turnOne(){

        weaponSelectOne = $(this).on("click").attr("data-weapon");
        if(weaponSelectOne === "ROCK") {
        $("#player1-weapon").append($("<p>").text("ROCK"));
        audioFour.play();
        console.log(weaponSelectOne);
        database.ref("/player1").set({
        weaponSelectOne: weaponSelectOne
        });
      turnTwo();
        //code for displaying player one choice
}

    else if(weaponSelectOne === "PAPER"){
        $("#player1-weapon").append($("<p>").text("PAPER"));
        audioFour.play();
        console.log(weaponSelectOne);
        database.ref("/player1").set({
        weaponSelectOne: weaponSelectOne
        });
        turnTwo();

        }



    else if(weaponSelectOne === "SISSORS"){
        $("#player1-weapon").append($("<p>").text("SISSORS"));
        audioFour.play();
        console.log(weaponSelectOne);
        database.ref("/player1").set({
        weaponSelectOne: weaponSelectOne
        });
        turnTwo();

        }
    };

//XXXXXXXXXXXXXXXXXXXXXXX

  turnOne();

//XXXXXXXXXXXXXXXXXXXXXXX


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
        database.ref("/player2").set({
        weaponSelectTwo: weaponSelectTwo
    });
      //THE RPS FUCNTION IS CALLED
 rps(weaponSelectOne, weaponSelectTwo);

        //code for displaying player one choice
    }

if($(".weapon5").data("clicked")){
    weaponSelectTwo = $(".weapon5").attr("data-weapon");
    $("#player2-weapon").append($("<p>").text(weaponSelectTwo));
    audioFour.play();
    console.log(weaponSelectTwo);
    database.ref("/player2").set({
    weaponSelectTwo: weaponSelectTwo
      });
            //THE RPS FUCNTION IS CALLED
 rps(weaponSelectOne, weaponSelectTwo);

        //code for displaying player one choice
    }

if($(".weapon6").data("clicked")){
    weaponSelectTwo = $(".weapon6").attr("data-weapon");
    $("#player2-weapon").append($("<p>").text(weaponSelectTwo));
    audioFour.play();
    console.log(weaponSelectTwo);
    database.ref("/player2").set({
    weaponSelectTwo: weaponSelectTwo
      });
            //THE RPS FUCNTION IS CALLED
 rps(weaponSelectOne, weaponSelectTwo);

        //code for displaying player one choice
    }


};  

//INITIAL LOAD

// database.ref().on("value", function(snapshot) {
//         console.log(snapshot.val());
//         console.log(snapshot.val().weaponSelectOne);
//         console.log(snapshot.val().weaponSelectTwo);
//         console.log(snapshot.val().insults);
        
//         $("#").html(snapshot.val().weaponSelectOne);
//         $("#").html(snapshot.val().weaponSelectTwo);
//         $(".").html(snapshot.val().insults);

//       });

//CODE FOR DISPLAYING THE RESULT OF RPS ROUND

function rps(w1, w2){
    if ((w1 === "ROCK") && (w2 === "SISSORS")) {
            playerOneWins++;
            //$("#stage").html($("<p>").html(ranNum));
            $("#stage").append("<h3 class='main-text>Player 1 WINS!</h3>"+"<h4 class='main-text>Player 2 you SUCK!</h3>");
          }
          else if ((w1 === "ROCK") && (w2 === "PAPER")) {
            playerTwoWins++;
            $("#stage").append("<h3 class='main-text>Player 1 WINS!</h3>"+"<h4 class='main-text>Player 2 you SUCK!</h3>");
          }
          else if ((w1 === "SISSORS") && (w2 === "ROCK")) {
            playerTwoWins++;
            $("#stage").append("<h3 class='main-text>Player 1 WINS!</h3>"+"<h4 class='main-text>Player 2 you SUCK!</h3>");
          }
          else if ((w1 === "SISSORS") && (w2 === "PAPER")) {
            playerOneWins++;
            $("#stage").append("<h3 class='main-text>Player 1 WINS!</h3>"+"<h4 class='main-text>Player 2 you SUCK!</h3>");
          }
          else if ((w1 === "PAPER") && (w2 === "ROCK")) {
            playerOneWins++;
            $("#stage").append("<h3 class='main-text>Player 1 WINS!</h3>"+"<h4 class='main-text>Player 2 you SUCK!</h3>");
          }
          else if ((w1 === "PAPER") && (w2 === "SISSORS")) {
            playerTwoWins++;
            $("#stage").append("<h3 class='main-text>Player 1 WINS!</h3>"+"<h4 class='main-text>Player 2 you SUCK!</h3>");
          }
          else if (w1 === w2) {
            ties++;
          }
          //else if((playerOneWins === 3)&&( playerTwoWins == 3)){
              //suddenDeath();
          //}

    };

//TEXT BOX FOR FOUL ABUSIVE SLURS
$("#add-slur1").on('click', function(){
    var txtOne = $("#text-input1").val().trim();
    textBox1(txtOne);
    console.log("player1 sent slur");
});

$("#add-slur2").on('click', function(){
    var txtTwo = $("#text-input2").val().trim();
    textBox2(txtTwo);
    console.log("player2 sent slur");
});

function textBox1(slurOne){
    database.ref("/textbox1").update({
        playerOneSays: slurOne
    });
    $("#text-input1").clear();

};

function textBox2(slurTwo){
    database.ref("/textbox2").update({
        playerTwoSays: slurTwo
    });
    $("#text-input2").clear();


};

database.ref("/textbox1").on("value", function(snapshot) {
    pOne = snapshot.child("playerOneSays").exists();
    if (pOne){
        $("#box").prepend($("<p>").html(snapshot.val().playerOneIs + ": " + snapshot.val().playerOneSays));
        //$("#box").prepend($("<p>").html("Player 2: " + snapshot.val().playerTwoSays));
    }

    else {
        $("#box").prepend($("<p>").html(snapshot.val().playerOneIs + ": HAS ENTERED!"));
    }
});

database.ref("/textbox2").on("value", function(snapshot) {
    pTwo = snapshot.child("playerTwoSays").exists();
    if (pTwo){
        //$("#box").prepend($("<p>").html("Player 1: " + snapshot.val().playerOneSays));
        $("#box").prepend($("<p>").html(snapshot.val().playerTwoIs + ": " + snapshot.val().playerTwoSays));
    }

    else {
        $("#box").prepend($("<p>").html(snapshot.val().playerTwoIs + ": HAS ENTERED!"));
    }
});



//CLOSING TAG FOR DOCUMENT.READY//
});