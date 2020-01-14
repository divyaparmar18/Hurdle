var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var runners, runner1, runner2, runner3, runner4;

var track, runner1_img, runner2_img, runner3_img, runner4_img, hurdle, invisibleGround1, invisibleGround2;

function preload() {
    hurdle = loadImage("../images/hurdle.png");
    track = loadImage("../images/pla.jpg");
    runner1_img = loadImage("b.png", "p.png", "y.png");
    runner2_img = loadImage("b.png", "p.png", "y.png");
}

function setup() {
    canvas = createCanvas(displayWidth, window.innerHeight);
    database = firebase.database();
    game = new Game();
    game.getState();
    game.start();
}


function draw() {
    if (playerCount === 2) {
        game.update(1);
    }
    if (gameState === 1) {
        clear();
        game.play();
    }
    if (gameState === 2) {
        game.end();
    }
}