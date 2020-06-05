
class Obstacle {
	constructor() {
		this.width = 30;
		this.height = 30;
		this.x = width; // canvas Width
		this.y = height - this.height;
		this.y -= 50; 	// to look like its on the ground in the bg image
		this.xspeed = -10; // move towards player
	}

	show() {
		fill(222, 4, 52);
		rect(this.x, this.y, this.width, this.height);
	}

	update() {
		this.x += this.xspeed;
	}

	collides(player) {
	if (
		this.x < player.x + player.width &&
		this.x + this.width > player.x &&
		this.y < player.y + player.height &&
		this.y + this.height > player.y
	) {
		return true;
	}
	return false;
	}
}
