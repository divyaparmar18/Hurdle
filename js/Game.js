class Game {
    constructor() {

    }

    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function(data) {
            gameState = data.val();
        })
    }

    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }

    async start() {
        if (gameState === 0) {
            player = new Player();
            var playerCountRef = await database.ref('playerCount').once("value");
            if (playerCountRef.exists()) {
                playerCount = playerCountRef.val();
                player.getCount();
            }
            form = new Form()
            form.display();
        }
        runner1 = createSprite(10, 300);
        runner1.scale = 1;
        runner1.setCollider("rectangle", 0, 0)
        runner1.debug = true;
        runner1.addImage("runner1", runner1_img);
        runner2 = createSprite(10, 600);
        runner2.scale = 1;
        runner2.setCollider("rectangle", 0, 0);
        runner2.debug = true;

        runner2.addImage("runner2", runner2_img);
        runners = [runner1, runner2];
    }
    play() {
        form.hide();
        Player.getPlayerInfo();
        spawnObstacles();
        spawnObstacles1();
        // runner1Jump(runner1);



        // Player.getCarsAtEnd();

        if (allPlayers !== undefined) {
            image(track, 0, -20, displayWidth * 5, displayHeight);

            //index of the array
            var index = 0;
            //x and y position of the cars
            var y = 140;
            var x = 50;


            for (var plr in allPlayers) {
                index = index + 1;
                plr.velocityX = 5;

                y = y + 260;
                //use data form the database to display the cars in x direction
                x = 360 - allPlayers[plr].distance;
                runners[index - 1].x = x;
                console.log(runners[index - 1].velocityX)
                runners[index - 1].y = y;
            }




            if (index === player.index) {
                stroke(10);
                fill("red");
                ellipse(x, y, 60, 60);
                runners[index - 1].shapeColor = "red";
                camera.position.x = runners[index - 1].x;
            }


        }



        if (keyIsDown(RIGHT_ARROW) && player.index !== null) {
            player.distance -= 10
            player.update();
        }



        if (player.distance == -9230) {
            gameState = 2;
            player.rank += 1
            Player.updateCarsAtEnd(player.rank)
        }

        drawSprites();
    }

    end() {
        console.log("Game Ended");
        console.log(player.rank);
    }
}

function spawnObstacles() {
    var i = 0;
    if (frameCount % 360 === 0) {
        i = i + 1000
        var obstacle = createSprite(i, 325);

        obstacle.velocityX = -2;
        obstacle.addImage(hurdle);

        obstacle.scale = 0.80;
        obstacle.lifetime = 800;
        obstacle.setCollider("rectangle", -10, 0, 90, 150);
        obstacle.debug = true;
    }
}

function spawnObstacles1() {
    if (frameCount % 360 === 0) {

        var obstacle = createSprite(800, 585);

        obstacle.velocityX = -2;
        obstacle.addImage(hurdle);
        obstacle.scale = 0.80;
        obstacle.lifetime = 800;
        obstacle.setCollider("rectangle", -10, 0, 90, 150);
        obstacle.debug = true;

    }
}