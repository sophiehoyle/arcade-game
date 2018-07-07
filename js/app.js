//Points function
var points = 0;

function gamePoints() {
	document.getElementById('points').innerHTML = "Points: " + points;
}
// Enemies the player must avoid
var Enemy = function(x, y, speed) {
	// Variables applied to each of our instances go here,
	// we've provided one for you to get started
	// The image/sprite for our enemies, this uses
	// a helper we've provided to easily load images
	this.sprite = 'images/enemy.png';
	this.x = x;
	this.y = y;
	this.width = 55;
	this.height = 55;
	this.speed = speed;
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
	// You should multiply any movement by the dt parameter
	// which will ensure the game runs at the same speed for
	// all computers.
	if (this.x > 600) {
		this.x = -101;
		this.x += this.speed * dt;
	} else {
		this.x += this.speed * dt + 1;
	}
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
	this.sprite = 'images/char-princess-girl.png';
	this.x = x || 200;
	this.y = y || 400;
	this.width = 55;
	this.height = 55;
};
Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.update = function() {
	var allEnemiesLength = allEnemies.length;
	if (this.y < 10) {
		this.x = 200;
		this.y = 400;
		points += 10;
		gamePoints();
	}
	for (var i = 0; i < allEnemiesLength; i++) {
		var enemy = allEnemies[i];
		if (this.x < enemy.x + enemy.width && this.x + this.width > enemy.x && this.y < enemy.y + enemy.height && this.height + this.y > enemy.y) {
			this.x = 200;
			this.y = 400;
			points -= 10;
			gamePoints();
		}
	}
};
Player.prototype.handleInput = function(key) {
  if (key === 'up' && this.y > 10) {
    this.y -= 85;
  }
  if (key === 'down' && this.y < 300) {
    this.y += 85;
  }
	if (key === 'right' && this.x < 400) {
		this.x += 100;
	}
	if (key === 'left' && this.x > 10) {
		this.x -= 100;
	}
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemy1 = new Enemy(-100, 55, 280);
var enemy2 = new Enemy(-100, 140, 300);
var enemy3 = new Enemy(-100, 225, 370);
var allEnemies = [enemy1, enemy2, enemy3];
var player = new Player();
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
	var allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};
	player.handleInput(allowedKeys[e.keyCode]);
});
//Stop arrows from controlling browser
window.addEventListener("keydown", function(e) {
	// space and arrow keys
	if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
		e.preventDefault();
	}
}, false);
