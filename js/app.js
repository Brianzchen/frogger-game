// Enemies our player must avoid
var Enemy = function() {
    this.x = -500;
    this.y = rowSelector();
    this.speed = Math.floor((Math.random() * 500) + 200);
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if ((this.x <= player.x+50 && this.x >= player.x-50) && this.y === player.y) {
      player.x = 200;
      player.y = 300;
      for (enemies in allEnemies) {
        allEnemies[enemies].x = -250;
      }
    }
    this.x += this.speed * dt;
    if (this.x > 505) {
      this.speed = Math.floor((Math.random() * 100) + 100);
      this.x = -20;
      this.y = rowSelector();
    }
    if (this.x < -100 && this.x > -150) {
      this.speed = Math.floor((Math.random() * 100) + 100);
    }
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

var rowSelector = function() {
    var row = Math.floor(Math.random()*3);
    var y;
    if (row === 2) {
      y = 60;
    } else if (row === 1) {
      y = 140;
    } else if (row === 0) {
      y = 220;
    }
    return y;
}

var Player = function() {
    this.sprite = "images/char-boy.png";
    this.x = 200;
    this.y = 300;
}

Player.prototype.update = function() {
    if (player.x < 0) {
      player.x = player.x + 100;
    }
    if (player.x > 400) {
      player.x = player.x - 100;
    }
    if (player.y > 400) {

      player.y = player.y - 80;
    }
    if (player.y < 60) {
      for (enemies in allEnemies) {
        allEnemies[enemies].x = -250;
        allEnemies[enemies].speed = Math.floor((Math.random() * 100) + 100);
        allEnemies[enemies].y = rowSelector();
      }
      player.y = 300;
      player.x = 200;
    }
}

Player.prototype.render = function() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(key) {
    if (key === "up") {
      player.y += -80;
    }
    if (key === "down") {
      player.y += 80;
    }
    if (key === "left") {
      player.x += -100;
    }
    if (key === "right") {
      player.x += 100;
    }
}
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var allEnemies = [];
var enemy1 = new Enemy();
var enemy2 = new Enemy();
var enemy3 = new Enemy();
var enemy4 = new Enemy();
var enemy5 = new Enemy();
var enemy6 = new Enemy();
allEnemies.push(enemy1);
allEnemies.push(enemy2);
allEnemies.push(enemy3);
allEnemies.push(enemy4);
allEnemies.push(enemy5);
allEnemies.push(enemy6);
var player = new Player();
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



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
