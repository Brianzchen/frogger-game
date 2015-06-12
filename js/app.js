// Enemies our player must avoid
var Enemy = function() {
    this.x = -500;
    this.y = rowSelector();
    this.speed = Math.floor((Math.random() * 200) + 1000);
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
      score += -10;
    }
    this.x += this.speed * dt;
    if (this.x > 505) {
      this.speed = Math.floor((Math.random() * 100) + 100);
      this.x = -100;
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
      player.y = 300;
      player.x = 200;
      score += 10;
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

var Gem = function() {
    this.y = rowSelector();
    this.x = colSelector();
    var gem = Math.floor(Math.random()*3);
    if (gem === 2) {
      this.sprite = "images/Gem Green.png";
    } else if (gem === 1) {
      this.sprite = "images/Gem Blue.png";
    } else if (gem === 0) {
      this.sprite = "images/Gem Orange.png";
    }
    var chance = Math.random();
}

Gem.prototype.update = function() {
    if (this.x === player.x && this.y === player.y) {
      score += 20;
      this.y = rowSelector();
      this.x = colSelector();
    }
}

Gem.prototype.render = function() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// This randomly generates a y value between the 3 row tiles
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

// Randomly gererates an x value for items can sit on the correct tile.
var colSelector = function() {
    var col = Math.floor(Math.random()*5);
    var x;
    if (col === 4) {
      x = 400;
    } else if (col === 3) {
      x = 300;
    } else if (col === 2) {
      x = 200;
    } else if (col === 1) {
      x = 100;
    } else if (col === 0) {
      x = 0;
    }
    return x;
}

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
var allGems = [];
var gem1 = new Gem();
var gem2 = new Gem();
var gem3 = new Gem();
allGems.push(gem1);
allGems.push(gem2);
allGems.push(gem3);
var score = 0;

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
