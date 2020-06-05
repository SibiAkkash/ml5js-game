 class Player {
    constructor() {
        this.x = 50;
        this.height = 50;
        this.y = height - this.height;
        this.width = 50;
        this.velocity = 0;
        this.gravity = 0.7; 
        this.thrustVelocity = -11;
    }

    canJump() {
        return this.y == height - this.height - 50;
    }
    
    show() {
        fill(35, 52, 247); 
        rect(this.x, this.y, this.width, this.height);
    }

    update() {
        this.velocity += this.gravity;
        this.y += this.velocity;
        this.y = constrain(this.y, 0, height - this.height - 50);
    }

    jump() {
        if(this.canJump()) {
            this.velocity = this.thrustVelocity;     // upward thrust
        }
    }
}
