// import { Player } from './player.js';
// import { Obstacle } from './obst.js';

class Game {
    constructor() {
        this.playing = false;    
        
        this.obstacles = [];

        this.classifier;
        // this.options = options;

        this.isModelReady = false;
        this.useSoundInput = true;

        this.refs();
        
    }

    refs() {
        console.log(this.options);
        this.startRef = document.querySelector('.start-btn');
        this.startScreen = document.querySelector('.start-screen');
        this.endScreen = document.querySelector('.game-end-screen');
        this.scoreDiv = document.querySelector('.score');
        this.highScoreDiv = document.getElementById('highScore');
    }

    loadModel() {
        this.classifier = ml5.soundClassifier('SpeechCommands18w', options, modelReady);
    }

    init() {
        // this.loadModel();
        this.playing = false;
        this.player = new Player();
        this.obstacles = [];
        this.score = 0;
        this.setup();
        this.showScore();
    }

    start() {
        this.playing = true;
        if(this.playing) {
            this.startScreen.style.display = 'none';
        } 
    }

    setup() {
        this.startRef.addEventListener('click', () => this.start());
        this.highscore = localStorage.getItem('highscore');
        if(!this.highscore) {
            localStorage.setItem('highscore', 0);
            this.highscore = 0;
        }
        if(!this.playing) {
            this.startScreen.style.display = '';
        }

    }

    updateScore() {
        this.score++;
        if(this.score > this.highscore) {
            localStorage.setItem('highscore', this.score);
            this.highscore = this.score;
        }
        this.showScore();
    }

    showScore() {
        this.scoreDiv.textContent = `Score: ${this.score}`;
        this.highScoreDiv.textContent = `HighScore: ${this.highscore}`;
    }
}