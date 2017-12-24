
$( document ).ready(function(){

//AUDIO FILES

//var audioOne = new Audio("assets/audio/Mortal_Kombat.mp3");

//var audioTwo = new Audio("assets/audio/fireplace.mp3");

var audioThree = new Audio("assets/audio/Creepy_Laugh.mp3");

var audioFour = new Audio("assets/audio/click.wav");

var audioFive = new Audio("assets/audio/click.wav");

//INITIAL VARIABLES

var playerOneWins = 0;

var playerTwoWins = 0;

//PLAY MUSIC WHEN PAGE LOADS

//audioOne.play();

//audioTwo.play();


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

//modal
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
                });
                database.ref("/score").set({
                    score1: 0
                });
                $(".name1").html($("<h3>").html(name));
                console.log("Player 1 is logged in! ");
                enterPlayerOne(name);
                return name;

            } 
            else if (p1 == true && !p2){
                var addNewPlayer = {};
                addNewPlayer['/player2'] = name;
                database.ref("/players").update(addNewPlayer);
                database.ref("/score").update({
                    score2: 0
                });
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

//PLAYER ONE CHOOSES

$('.weapon1').on('click', function(){
    weaponSelectOne = $(this).attr("data-weapon");
    turnOne(weaponSelectOne);
    $(".player-one-buttons").hide();
    audioFour.play();
});

$('.weapon2').on('click', function(){
    weaponSelectOne = $(this).attr("data-weapon");
    turnOne(weaponSelectOne);
    $(".player-one-buttons").hide();
    audioFour.play();
}); 

$('.weapon3').on('click', function(){
    weaponSelectOne = $(this).attr("data-weapon");
    turnOne(weaponSelectOne);
    $(".player-one-buttons").hide();
    audioFour.play();
}); 

function turnOne(weaponForPlayerOne){

        
    if(weaponForPlayerOne === "ROCK") {
        $("#player1-weapon").append($("<p>").text("ROCK"));
        console.log(weaponForPlayerOne);
        database.ref("/playerWeapon").update({
            weaponSelectOne: weaponForPlayerOne
        });
        checkBothWeaponsAreSelected();
    }

    else if(weaponForPlayerOne === "PAPER"){
        $("#player1-weapon").append($("<p>").text("PAPER"));
        console.log(weaponForPlayerOne);
        database.ref("/playerWeapon").update({
            weaponSelectOne: weaponForPlayerOne
        });
        checkBothWeaponsAreSelected();
    }



    else if(weaponForPlayerOne === "SISSORS"){
        $("#player1-weapon").append($("<p>").text("SISSORS"));
        console.log(weaponForPlayerOne);
        database.ref("/playerWeapon").update({
            weaponSelectOne: weaponForPlayerOne
        });
        checkBothWeaponsAreSelected();
    }
};

//PLAYER TWO CHOOSES
    
$('.weapon4').on('click', function(){
    weaponSelectTwo = $(this).attr("data-weapon");
    turnTwo(weaponSelectTwo);
    $(".player-two-buttons").hide();
    audioFour.play();
});

$('.weapon5').on('click', function(){
    weaponSelectTwo = $(this).attr("data-weapon");
    turnTwo(weaponSelectTwo);
    $(".player-two-buttons").hide();
    audioFour.play();
}); 

$('.weapon6').on('click', function(){
    weaponSelectTwo = $(this).attr("data-weapon");
    turnTwo(weaponSelectTwo);
    $(".player-two-buttons").hide();
    audioFour.play();
}); 

function turnTwo(weaponForPlayerTwo){

    if(weaponForPlayerTwo === "ROCK") {
        $("#player2-weapon").append($("<p>").text("ROCK"));
        console.log(weaponForPlayerTwo);
        database.ref("/playerWeapon").update({
            weaponSelectTwo: weaponForPlayerTwo
        });
        checkBothWeaponsAreSelected();
    }

    else if(weaponForPlayerTwo === "PAPER"){
        $("#player2-weapon").append($("<p>").text("PAPER"));
        console.log(weaponForPlayerTwo);
        database.ref("/playerWeapon").update({
            weaponSelectTwo: weaponForPlayerTwo
        });
        checkBothWeaponsAreSelected();
    }

    else if(weaponForPlayerTwo === "SISSORS"){
        $("#player2-weapon").append($("<p>").text("SISSORS"));
        console.log(weaponForPlayerTwo);
        database.ref("/playerWeapon").update({
            weaponSelectTwo: weaponForPlayerTwo
        });
        checkBothWeaponsAreSelected();
    }
};


//XXXXXXXXXXXXXXXXXXXXXXX

//CHECKS TO SEE IF BOTH PLAYERS HAVE PICKED THEIR WEAPONS

function checkBothWeaponsAreSelected(){
    database.ref("/playerWeapon").on("value", function (snapshot) {
        console.log('value', snapshot.val())
        var weapon1 = snapshot.child("weaponSelectOne").exists();
        var weapon2 = snapshot.child("weaponSelectTwo").exists();
        console.log(weapon1);
        console.log(weapon2);

        if (weapon1 == true && weapon2 == true){
        var choiceOne = snapshot.val().weaponSelectOne;
        var choiceTwo = snapshot.val().weaponSelectTwo;
        rps(choiceOne, choiceTwo);
    }

    else {
        return false;
    }
    });
};

//XXXXXXXXXXXXXXXXXXXXXXX

//CODE FOR RPS LOGIC

function rps(w1, w2){
    if ((w1 === "ROCK") && (w2 === "SISSORS")) {
            playerOneWins++;
            $("#stage").append($("<h3>").text("Player 1: ROCK - WINS! Player 2: SISSORS- YOU SUCK!"));
            console.log("player 1 wins!");
            database.ref("/score").update({
                score1: playerOneWins
            });
            database.ref("/score").on("value", function(snapshot) {
                $("#nameScore1").html($("<div>").html(snapshot.val().score1));
                $("#nameScore2").html($("<div>").html(snapshot.val().score2));
            });
            ResetMatch1();
          }
          else if ((w1 === "ROCK") && (w2 === "PAPER")) {
            playerTwoWins++;
            $("#stage").append($("<h3>").text("Player 1: ROCK - WINS! Player 2: PAPER- YOU SUCK!"));
            console.log("player 2 wins!");
            database.ref("/score").update({
                score2: playerTwoWins
            });
            database.ref("/score").on("value", function(snapshot) {
                $("#nameScore1").html($("<div>").html(snapshot.val().score1));
                $("#nameScore2").html($("<div>").html(snapshot.val().score2));
            });
            ResetMatch1();
          }
          else if ((w1 === "SISSORS") && (w2 === "ROCK")) {
            playerTwoWins++;
            $("#stage").append($("<h3>").text("Player 1: SISSORS - WINS! Player 2: ROCK- YOU SUCK!"));
            console.log("player 2 wins!");
            database.ref("/score").update({
                score2: playerTwoWins
            });
            database.ref("/score").on("value", function(snapshot) {
                $("#nameScore1").html($("<div>").html(snapshot.val().score1));
                $("#nameScore2").html($("<div>").html(snapshot.val().score2));
            });
            ResetMatch1();
          }
          else if ((w1 === "SISSORS") && (w2 === "PAPER")) {
            playerOneWins++;
            $("#stage").append($("<h3>").text("Player 1: SISSORS - WINS! Player 2: PAPER- YOU SUCK!"));
            console.log("player 1 wins!");
            database.ref("/score").update({
                score1: playerOneWins
            });
            database.ref("/score").on("value", function(snapshot) {
                $("#nameScore1").html($("<div>").html(snapshot.val().score1));
                $("#nameScore2").html($("<div>").html(snapshot.val().score2));
            });
            ResetMatch1();
          }
          else if ((w1 === "PAPER") && (w2 === "ROCK")) {
            playerOneWins++;
            $("#stage").append($("<h3>").text("Player 1: PAPER - WINS! Player 2: ROCK- YOU SUCK!"));
            console.log("player 1 wins!");
            database.ref("/score").update({
                score1: playerOneWins
            });
            database.ref("/score").on("value", function(snapshot) {
                $("#nameScore1").html($("<div>").html(snapshot.val().score1));
                $("#nameScore2").html($("<div>").html(snapshot.val().score2));
            });
            ResetMatch1();
          }
          else if ((w1 === "PAPER") && (w2 === "SISSORS")) {
            playerTwoWins++;
            $("#stage").append($("<h3>").text("Player 1: PAPER - WINS! Player 2: SISSORS- YOU SUCK!"));
            console.log("player 2 wins!");
            database.ref("/score").update({
                score2: playerTwoWins
            });
            database.ref("/score").on("value", function(snapshot) {
                $("#nameScore1").html($("<div>").html(snapshot.val().score1));
                $("#nameScore2").html($("<div>").html(snapshot.val().score2));
            });
            ResetMatch1();
          }
          else if (w1 === w2) {
            $("#stage").append($('<h3>').text("Player 1: " + w1 + "; Player 2: " + w2 + " TIE!!!"));
            console.log("Tie!");
            ResetMatch1();
            ResetButtons();
          }
    };

//RESET ROUND *************************************//

function ResetMatch1(){
    ResetMatch2();
};


function ResetMatch2(){
    setTimeout(function(){
        
        //RESET HTML BUTTONS AND PICKS 
        $("#player1-weapon").html($("<p>").html(""));
        $("#player2-weapon").html($("<p>").html(""));
        $("#stage").html($("<p>").html(""));
        $("#myModal2").modal("show");
        database.ref("/players").on("value", function(snapshot) {
            $("#PP1").html($("<h3>").html(snapshot.val().player1));
            $("#PP2").html($("<h3>").html(snapshot.val().player2));
            
        });
    }, 4000);
};

function ResetButtons(){
    database.ref("/playerWeapon").update({
            weaponSelectOne: "",
            weaponSelectTwo: ""
        });
}

//MODAL 2*************************//

$("#PP1").on('click', function(){
    $(".player-one-buttons").show();
    $("#myModal2").modal("hide");
});

$("#PP2").on('click', function(){
    $(".player-two-buttons").show();
    $("#myModal2").modal("hide");
});
//***************************** */


//TEXT BOX FOR FOUL ABUSIVE SLURS
$("#add-slur1").on('click', function(){
    audioFive.play();
    var txtOne = $("#text-input1").val().trim();
    textBox1(txtOne);
    console.log("player1 sent slur");
});

$("#add-slur2").on('click', function(){
    audioFive.play();
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