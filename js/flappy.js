// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);

/*
 * Loads all resources for the game and gives them names.
 */

var score = -1;
var labelScore;
var topbg;
var bottombg;
var birdie1;
var birdie2;
var birdie3;
var birdie4;
var myText;
var player;
var gapStart = game.rnd.integerInRange(1, 7);
var pipes = [];

function preload() {game.load.image("playerImg", "../assets/flappy.png");
    game.load.image("tunnels-bottom", "../assets/flappy-footer.png");
    game.load.image("tunnels-top", "../assets/flappy-header.png");
    game.load.audio("score", "../assets/point.ogg");
    game.load.image("pipe","../assets/pipe.png");

}
//function spaceHandler(event) {
//    game.sound.play("score");
//    }

function changeScore() {
    score = score + 1
    labelScore.setText(score.toString());
}

/*
 * Initialises the game. This function is only called once.
 */




function create() {
    game.stage.setBackgroundColor("#398990");
    myText = game.add.text(325, 165, "Hit Enter",
        {font: "40px Impact", fill: "#FFFFFF"})
    topbg = game.add.sprite(0,0,"tunnels-top");
    topbg.scale.setTo(0.5,0.5);
    birdie1 = game.add.sprite (10,30,"playerImg");
    birdie1.scale.setTo(1, 1);
    birdie2 = game.add.sprite (740,75,"playerImg");
    birdie2.scale.setTo(1, 1);
    birdie2.anchor.setTo(.5, 1); //so it flips around its middle
    birdie2.scale.x = -1; //flipped
    bottombg = game.add.sprite (0,237,"tunnels-bottom");
    bottombg.scale.setTo(0.5,0.5);
    birdie3 = game.add.sprite (10,345,"playerImg");
    birdie3.scale.setTo(1, 1);
    birdie4 = game.add.sprite (750,390,"playerImg");
    birdie4.scale.setTo(1, 1);
    birdie4.anchor.setTo(.5, 1); //so it flips around its middle
    birdie4.scale.x = -1; //flipped
    //game.input
    //    .keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    //    .onDown.add(spaceHandler);
    labelScore = game.add.text(60,40,"0");
    //game.input
    //    .onDown
    //    .add(changeBackground);
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.input.keyboard.addKey(Phaser.Keyboard.ENTER)
        .onDown.add(changeBackground);

    game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
        .onDown.add(moveRight);
    game.input.keyboard.addKey(Phaser.Keyboard.LEFT)
        .onDown.add(moveLeft);
    game.input.keyboard.addKey(Phaser.Keyboard.UP)
        .onDown.add(moveUp);
    game.input.keyboard.addKey(Phaser.Keyboard.DOWN)
        .onDown.add(moveDown);
    //generatePipe();
    //player = game.add.sprite(100,200,"playerImg")
    //game.physics.arcade.enable(player);
    //player.body.velocity.x = 200;
    //player.body.velocity.y = -50;
    //player.body.gravity.y = 400;
    game.input.keyboard
        .addKey(Phaser.Keyboard.SPACEBAR)
        .onDown.add(playerJump);
    //pipeInterval = 2.2;
    //game.time.events
    //    .loop(pipeInterval * Phaser.Timer.SECOND,
    //generatePipe);
}

function playerJump() {
    player.body.velocity.y = - 150;
}

function generatePipe() {
    var gap = game.rnd.integerInRange(1, 5);
    for (var count = 0; count < 8; count++) {
        if (count != gap && count != gap + 1) {
            addPipeBlock(750, count * 50);
        }
    }
    changeScore();
}

function addPipeBlock(x, y) {
    var pipeBlock = game.add.sprite(x,y,"pipe");
    pipes.push(pipeBlock);
    game.physics.arcade.enable(pipeBlock);
    pipeBlock.body.velocity.x = -200;
}

function moveRight() {
    player.x = player.x + 50
}
function moveLeft() {
    player.x = player.x - 50
}
function moveUp() {
    player.y = player.y - 100
}
function moveDown() {
    player.y = player.y + 50
}
function changeBackground(event) {
    game.stage.setBackgroundColor("#398990");
    topbg.kill();
    bottombg.kill();
    birdie1.kill();
    birdie2.kill();
    birdie3.kill();
    birdie4.kill();
    myText.destroy();
    player = game.add.sprite(100,200,"playerImg")
    game.physics.arcade.enable(player);
    player.body.velocity.x = 10;
    player.body.velocity.y = -100;
    player.body.gravity.y = 400;
    pipeInterval = 2.2;
    game.time.events
        .loop(pipeInterval * Phaser.Timer.SECOND,
    generatePipe);
}


/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {
    game.physics.arcade
        .overlap(player,pipes,
    gameOver);
}
for(var index=0; index<pipes.length; index++){
    game.physics.arcade
        .overlap(player,
    pipes[index],
    gameOver);
}
function gameOver(){
    game.destroy();
}
function gameOver() {
    location.reload();}