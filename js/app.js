// Enemies our player must avoid
var Enemy = function() {
    this.x = -500;
    this.y = rowSelector();
    this.speed = Math.floor((Math.random() * 200) + 1000);
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

//-----------------------------------------------------------------------------

//The player character
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

//-----------------------------------------------------------------------------

//the gems that pop up throughout the game that the player
//can pick up to gain points, adds 20 points per gem.
var Gem = function() {
    this.y = rowSelector();
    this.x = colSelector();
    this.sprite = "images/Gem Blue.png";
    this.chance = 0.9;
}

Gem.prototype.update = function() {
    if (this.x === player.x && this.y === player.y && this.chance < 0.3) {
      score += 10;
      this.y = rowSelector();
      this.x = colSelector();
      this.chance = Math.random();
    }
    if (score <100) {
      this.sprite = "images/Gem Blue.png";
    }
    if (score >= 100 && score < 200) {
      this.sprite = "images/Gem Green.png";
    }
    if (this.x === player.x && this.y === player.y && this.chance < 0.3 && score >= 100 && score < 200) {
      score += 10;
    }
    if (score >= 200) {
      this.sprite = "images/Gem Orange.png";
    }
    if (this.x === player.x && this.y === player.y && this.chance < 0.3 && score >= 200) {
      score += 10;
    }
}

Gem.prototype.render = function() {
    if (this.chance < 0.3) {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

//Set timer for gem generation
setInterval(function () {
    for (gems in allGems) {
      allGems[gems].chance = Math.random();
      if (allGems[gems].chance <0.05) {
        allGems[gems].chance = Math.random();
        allGems[gems].x = colSelector();
        allGems[gems].y = rowSelector();
      }
    }
  }
  , 5000);

//-----------------------------------------------------------------------------

//The star object pops up not frequently but offers a big point bonus
var Star = function() {
    this.y = rowSelector();
    this.x = colSelector();
    this.sprite = "images/Star.png";
    this.chance = Math.random();
}

Star.prototype.update = function() {
    if (this.x === player.x && this.y === player.y && this.chance < 0.1) {
      score += 30;
      this.y = rowSelector();
      this.x = colSelector();
      this.chance = Math.random();
    }
    for (gems in allGems) {
      if (allGems[gems].x === this.x && allGems[gems].y === this.y) {
        allGems[gems].y = rowSelector();
        allGems[gems].x = colSelector();
      }
    }
}

Star.prototype.render = function() {
    if (this.chance < 0.1) {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

//set timer for star generation
setInterval(function () {
    if (star.chance >= 0.1) {
      star.chance = Math.random();
    }
  }
  , 8000);

//-----------------------------------------------------------------------------

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

//initiates all the objects; enemies, player, gems, stars
// and scoring system
var allEnemies = [];
for (i = 0; i < 6; i++) {
  allEnemies.push(new Enemy());
}
var player = new Player();
var allGems = [];
for (i = 0; i < 6; i++) {
  allGems.push(new Gem());
}
var star = new Star();
var score = 0;

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
// Works with arrow keys and wasd inputs
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        65: 'left',
        38: 'up',
        87: 'up',
        39: 'right',
        68: 'right',
        40: 'down',
        83: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

var hammertime = new Hammer(myElement);
hammertime.on('swipeleft swiperight tap pinch', function(ev) {
    var move;
    if (ev.type === "swipeleft") {
      move = "left";
    } else if (ev.type === "swiperight") {
      move = "right";
    }else if (ev.type === "tap") {
      move = "up";
    }else if (ev.type === "pinch") {
      move = "down";
    }
    player.handleInput(move);
});
