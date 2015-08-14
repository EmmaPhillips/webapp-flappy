// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };
var score = 0;
var width = 700;
var height = 400;
var gameSpeed = 200;
var gameGravity = 400;
var jumpPower = 200;
var player;
var bird;
var pt1;
var pt2;
var pb1;
var pb2;
var pb3;
var pb4;
var pb5;
var pb6;
var welcome;
var welcome2;
var pipes =[];
var labelScore;
var pipeInterval = 1.75;
var gapSize = 100;
var gapMargin = 50;
var blockHeight = 50;
var pipeEndHeight = 25;
var pipeEndExtraWidth = 10;
var weight =[];
var balloons =[];
var stars =[];
var sUp =[];
var sDown =[];
var beginning = false;
var playerSize = 1;
var min = 1;
var max = 12;
var pipeGreen;
var pipeYellow;
var pipeRed;
var textEasy;
var textMedium;
var textHard;
var pipeColour;
var pipeEndColour;


var game = new Phaser.Game(width, height, Phaser.AUTO, 'game', stateActions);

jQuery("#greeting-form").on("submit", function(event_details){
    var greeting = "Thank You, ";
    var greeting2 = " (";
    var greeting3 = "). Your score is ";
    var name = $("#fullName").val();
    var email = $("#email").val();
    var score = $("#score").val();
    var greeting_message = greeting + name + greeting2 + email + greeting3 + score;
    $("#greeting-form").hide();
    $("#greeting").append("<p>" + greeting_message + "</p><br><br><br><br><br><form><button class='btn btn-default' type='submit'>Ok</button></form>");
});




function preload() {
    game.load.image("playerImg", "../assets/flappy-cropped.png");
    game.load.image("sImg1", "../assets/pipe2-end.png");
    game.load.image("sImg2", "../assets/pipe2-body.png");
    game.load.audio("score", "../assets/point.ogg");
    game.load.image("pipe_g","../assets/pipe.png");
    game.load.image("pipeEnd_g","../assets/pipe-end.png");
    game.load.image("pipe_o","../assets/pipe_orange.png");
    game.load.image("pipeEnd_o","../assets/pipe-end-orange.png");
    game.load.image("pipe_r","../assets/pipe_red.png");
    game.load.image("pipeEnd_r","../assets/pipe-end-red.png");
    game.load.image("pipe_m","../assets/pipe_mint.png");
    game.load.image("pipeEnd_m","../assets/pipe-end-mint.png");
    game.load.image("weight","../assets/weight.png");
    game.load.image("balloons","../assets/balloons.png");
    game.load.image("background","../assets/background.png");
    game.load.image("star","../assets/star.png");
    game.load.image("uparrow","../assets/arrow.png");
    game.load.image("downarrow","../assets/arrow2.png");

}

function easy(sprite, pointer){
    pipeGreen.scale.setTo(1.2, 1.2);
    pipeRed.scale.setTo(1, 1);
    pipeYellow.scale.setTo(1, 1);
    textEasy.visible = true;
    textHard.visible = false;
    textMedium.visible = false;
    dificulty = 1;
    pipeColour = "pipe_m";
    pipeEndColour = "pipeEnd_m";
    gameSpeed = 125;
    pipeInterval = 2.25;
    jumpPower = 175
}
function medium(sprite, pointer){
    pipeGreen.scale.setTo(1, 1);
    pipeRed.scale.setTo(1, 1);
    pipeYellow.scale.setTo(1.2, 1.2);
    textEasy.visible = false;
    textHard.visible = false;
    textMedium.visible = true;
    dificulty = 2;
    pipeColour = "pipe_o";
    pipeEndColour = "pipeEnd_o";
    gameSpeed = 200;
    pipeInterval = 1.75;
}
function hard(sprite, pointer){
    pipeGreen.scale.setTo(1, 1);
    pipeRed.scale.setTo(1.2, 1.2);
    pipeYellow.scale.setTo(1, 1);
    textEasy.visible = false;
    textHard.visible = true;
    textMedium.visible = false;
    dificulty = 3;
    pipeColour = "pipe_r";
    pipeEndColour = "pipeEnd_r";
    gameSpeed = 275;
    pipeInterval = 1.25;
}


function chooseDificulty(){
    welcome.destroy();
    welcome2 = game.add.text(180, 130, "Please choose your difficulty:",{
        font: "30px Narkism", fill: "#CC0000"
    });
    pipeRed.visible = true;
    pipeYellow.visible = true;
    pipeGreen.visible = true;
    textEasy.visible = true;
    pipeRed.anchor.setTo(0.5, 0.5);
    pipeYellow.anchor.setTo(0.5, 0.5);
    pipeGreen.anchor.setTo(0.5, 0.5);
    pipeGreen.scale.setTo(1.2, 1.2);
    easy();

    pipeGreen.inputEnabled = true;
    pipeGreen.events.onInputDown.add(easy, this);

    pipeYellow.inputEnabled = true;
    pipeYellow.events.onInputDown.add(medium, this);

    pipeRed.inputEnabled = true;
    pipeRed.events.onInputDown.add(hard, this);



    game.input.keyboard.addKey(Phaser.Keyboard.ENTER).onDown.remove(chooseDificulty);
    game.input.keyboard.addKey(Phaser.Keyboard.ENTER).onDown.add(begin);
}

function begin(event){
    beginning = true;
    bird.kill();
    pt1.kill();
    pt2.kill();
    pb1.kill();
    pb2.kill();
    pb3.kill();
    pb4.kill();
    pb5.kill();
    pb6.kill();
    pipeGreen.kill();
    pipeYellow.kill();
    pipeRed.kill();
    textEasy.destroy();
    textMedium.destroy();
    textHard.destroy();
    welcome2.destroy();
    player = game.add.sprite(200, 200, "playerImg");
    player.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(player);
    player.body.gravity.y = gameGravity;
    game.time.events.loop(pipeInterval * Phaser.Timer.SECOND, generate);
    game.input.keyboard.addKey(Phaser.Keyboard.ENTER).onDown.remove(begin);
}

function randomFromTo(from, to){
    return Math.floor(Math.random() * (to - from + 1) + from);
}

function generateBalloons(){
    var bonus = game.add.sprite(width, height, "balloons");
    balloons.push(bonus);
    game.physics.arcade.enable(bonus);
    bonus.body.velocity.x = - gameSpeed;
    bonus.body.velocity.y = - game.rnd.integerInRange(60,100);
}

function generateWeight(){
    var bonus = game.add.sprite(width, 0, "weight");
    weight.push(bonus);
    game.physics.arcade.enable(bonus);
    bonus.body.velocity.x = - gameSpeed;
    bonus.body.velocity.y = game.rnd.integerInRange(60,100);
}

function generateUp(){
    var bonus = game.add.sprite(width, randomFromTo(50, height - 50), "uparrow");
    sUp.push(bonus);
    game.physics.arcade.enable(bonus);
    bonus.body.velocity.x = - gameSpeed;
}

function generateDown(){
    var bonus = game.add.sprite(width, randomFromTo(50, height - 50), "downarrow");
    sDown.push(bonus);
    game.physics.arcade.enable(bonus);
    bonus.body.velocity.x = - gameSpeed;
}

function generate(){
    var diceRoll = game.rnd.integerInRange(min, max);
    if(diceRoll == 3){
        generateBalloons();
    }
    else if(diceRoll == 2){
        generateWeight();
    }
    else if(diceRoll == 1){
        generateUp();
    }
    else if(diceRoll == 12){
        generateDown()
    }
    else{
        generatePipe();
    }
}

function playerJump(){
    player.body.velocity.y = -jumpPower;
    game.sound.play("score");
}

function addStar(x, y){
    var points = game.add.sprite(x, y);
    stars.push(points);
    game.physics.arcade.enable(points);
    points.body.velocity.x = - gameSpeed;
}




function generatePipe() {
    var gapStart = game.rnd.integerInRange(gapMargin, height - gapSize - gapMargin);

    for(var y = gapStart; y > 0 ; y -= blockHeight){
        addPipeBlock(width,y - blockHeight);
    }

    addPipeEnd(width-(pipeEndExtraWidth/2), gapStart-pipeEndHeight);
    addStar(width, gapStart + (gapSize / 2));

    for(var y = gapStart + gapSize; y < height; y += blockHeight) {
        addPipeBlock(width, y);
    }
    addPipeEnd(width-(pipeEndExtraWidth/2), gapStart+gapSize);
}

function addPipeBlock(x, y) {
        var block = game.add.sprite(x,y,pipeColour);
    pipes.push(block);
    game.physics.arcade.enable(block);
    block.body.velocity.x = -gameSpeed;
}

function addPipeEnd(x, y){
        var block = game.add.sprite(x,y,pipeEndColour);
    pipes.push(block);
    game.physics.arcade.enable(block);
    block.body.velocity.x = -gameSpeed;
}

function create() {
    game.stage.setBackgroundColor("#398990");
    var bgVelocity = gameSpeed/10
    var bgSprite = game.add.tileSprite(0, 0, width, height, "background");
    bgSprite.autoScroll(-bgVelocity,0);

    welcome = game.add.text(135, 180, "Welcome to Flappy Bird... press Enter to begin",{
        font: "30px Narkism", fill: "#CC0000"
    });

    textEasy = game.add.text(182, 220, "Easy",{
        font: "20px Narkism", fill: "#000000"
    });
    textEasy.visible = false;
    textHard = game.add.text(530, 220, "Hard",{
        font: "20px Narkism", fill: "#000000"
    });
    textHard.visible = false;
    textMedium = game.add.text(345, 220, "Medium",{
        font: "20px Narkism", fill: "#000000"
    });
    textMedium.visible = false;
    bird = game.add.sprite(20, 180, "playerImg");
    pt1 = game.add.sprite(100, 240, "sImg1");
    pb1 = game.add.sprite(102, 252, "sImg2");
    pb2 = game.add.sprite(102, 302, "sImg2");
    pb3 = game.add.sprite(102, 352, "sImg2");
    pt2 = game.add.sprite(100, 120, "sImg1");
    pb4 = game.add.sprite(102, 70, "sImg2");
    pb5 = game.add.sprite(102, 20, "sImg2");
    pb6 = game.add.sprite(102, -30, "sImg2");
    pipeGreen = game.add.sprite(200, 300, "pipe_m");
    pipeGreen.visible = false;
    pipeRed = game.add.sprite(550, 300, "pipe_r");
    pipeRed.visible = false;
    pipeYellow = game.add.sprite(375, 300, "pipe_o");
    pipeYellow.visible = false;
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.input.keyboard
        .addKey(Phaser.Keyboard.ENTER)
        .onDown.add(chooseDificulty);

    game.input.keyboard
        .addKey(Phaser.Keyboard.SPACEBAR)
        .onDown.add(playerJump);

    labelScore = game.add.text(20, 20, "0");
}

function checkBonus(bonusArray, bonusEffect){
    for(var i=bonusArray.length - 1; i>=0; i--){
        game.physics.arcade.overlap(player,bonusArray[i], function(){
            changeGravity(bonusEffect);
            bonusArray[i].destroy();
            bonusArray.splice(i,1);
        });
    }
}

function checkBonus2(bonusArray, bonusEffect){
    for(var i=bonusArray.length - 1; i>=0; i--){
        game.physics.arcade.overlap(player,bonusArray[i], function(){
            changeScale(bonusEffect);
            bonusArray[i].destroy();
            bonusArray.splice(i,1);
        });
    }
}



function update() {
    for(var index=0; index<pipes.length; index++){
        game.physics.arcade
            .overlap(player,
        pipes[index],
        gameOver);
    }
    checkBonus(balloons, -50);
    checkBonus(weight, 50);
    checkBonus2(sUp, 1.05);
    checkBonus2(sDown, 0.95);

    if(playerSize >=1.25){
        min = 2;
    }
    if(playerSize <=0.75){
        max = 11;
    }



    for(var i=stars.length - 1; i>=0; i--){
        game.physics.arcade.overlap(player,stars[i], function(){
            stars[i].destroy();
            stars.splice(i,1);
            changeScore();
        });
    }
    if(beginning){
        player.rotation = Math.atan(player.body.velocity.y / 200);

        if(player.body.y < 0 || player.body.y > 400){
            gameOver();
        }
    }

}


function changeGravity(g) {
    gameGravity += g;
    player.body.gravity.y = gameGravity;
}

function changeScale(s){
    player.scale.setTo(playerSize*s, playerSize*s);
    playerSize = playerSize*s;
}

function gameOver() {
    gameGravity = 200;
    stars =[];
    game.destroy();
    $("#score").val(score.toString());
    $("#greeting").show();
}



function changeScore() {
    score++;
    labelScore.setText(score.toString());
}

$.get("/score", function(scores){
    scores.sort(function (scoreA, scoreB){
        var difference = scoreB.score - scoreA.score;
        return difference;
    });
    for (var i = 0; i < scores.length; i++) {
        $("#scoreBoard").append(
        "<li>" +
        scores[i].name + ": " + scores[i].score +
        "</li>");
    }
});
