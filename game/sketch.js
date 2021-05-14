
let game, classifier;
let bg;
let bgX1 = 0;
let bgX2;
let options;


function preload() {
    classifier = ml5.soundClassifier('SpeechCommands18w', options, modelReady);
    bg = loadImage('../assets/bg-2.jpg');
}

function setup() {
    createCanvas(800, 400);
    game = new Game();
    options = {
        probabilityThreshold: 0.95,
        scrollSpeed: -5
    };
    game.init();
    bgX2 = width;
}

function restart() {
    console.log('restarting');
    game.init();
    loop();
}

function draw() {
    background(0);
    if(game.playing) {
        image(bg, bgX1, 0, width, height);
        image(bg, bgX2, 0, width, height)
        game.player.show();
        game.player.update();
    }

    if(game.obstacles) {
        for(let i = game.obstacles.length - 1; i >= 0 ; i--) {
            game.obstacles[i].show();
            game.obstacles[i].update();

            if(game.obstacles[i].collides(game.player)) {
                console.log('game over');
                
                game.playing = false;
                noLoop();
                // restart screen
            }

            if(game.obstacles[i].x < 0) {
                game.obstacles.splice(i, 1);
                game.updateScore();
            }
        }
    }
    
    bgX1 += options.scrollSpeed;
    bgX2 += options.scrollSpeed;

    if(bgX1 <= - width) bgX1 = width;
    if(bgX2 <= - width) bgX2 = width;
}

// keyboard input
function keyPressed() {
    if(keyCode === 32) {
        console.log('jump');
        game.player.jump();
    }
    if(keyCode === UP_ARROW) {
        game.obstacles.push(new Obstacle());
    }
}

//model 
function modelReady() {
    isModelReady = true;
    console.log('model ready');
    classifier.classify(gotResult);
}

function gotResult(error, result) {
    if(error) {
        console.error(error)
        return;
    } 
    console.log(`${result[0].label}, confidence: ${result[0].confidence}`);

    if(result[0].label === 'up' ||	result[0].label === 'left') {
        player.jump();
    }	
}
