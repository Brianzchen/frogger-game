// Enemies our player must avoid
var Enemy = function() {
    this.x = -200;
    this.y = rowSelectorBugsLeft();
    this.speed = bugSpeed();
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // If the player comes in contact with a bug
    if ((this.x <= player.x+50 && this.x >= player.x-50) && this.y === player.y) {
      player.x = 200;
      player.y = 380;
      for (var enemies in allEnemies) {
        allEnemies[enemies].x = -300;
        allEnemies[enemies].y = rowSelectorBugsLeft();
        allEnemies[enemies].speed = bugSpeed();
      }
      // Reverting the player to 0 point or lose 10 points if they have
      // less than 0.
      if (score <= 0) {
        score = Number(score)-10;
        localStorage.froggerScore = score;
      } else {
        score = 0;
        localStorage.froggerScore = 0;
      }
    }
    this.x += this.speed;
    // If the bug reaches the end, reset it and give it new speeds and
    // co-ordinates as if it were a new bug.
    if (this.x > 505) {
      this.x = -150;
      this.y = rowSelectorBugsLeft();
      this.speed = bugSpeed();
    }
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//-----------------------------------------------------------------------------

// Enemies our player must avoid except they go opposite direction
var EnemyReverse = function() {
    this.x = 800;
    this.y = rowSelectorBugsRight();
    this.speed = bugSpeed();
    this.sprite = 'images/enemy-bugr.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
EnemyReverse.prototype.update = function(dt) {
    // If the player comes in contact with a bug
    if ((this.x <= player.x+50 && this.x >= player.x-50) && this.y === player.y) {
      player.x = 200;
      player.y = 380;
      for (var enemies in allEnemiesReverse) {
        allEnemiesReverse[enemies].x = 800;
        allEnemiesReverse[enemies].y = rowSelectorBugsRight();
        allEnemiesReverse[enemies].speed = bugSpeed();
      }
      // Reverting the player to 0 point or lose 10 points if they have
      // less than 0.
      if (score <= 0) {
        score = Number(score)-10;
        localStorage.froggerScore = score;
      } else {
        score = 0;
        localStorage.froggerScore = 0;
      }
    }
    this.x -= this.speed;
    // If the bug reaches the end, reset it and give it new speeds and
    // co-ordinates as if it were a new bug.
    if (this.x < -300) {
      this.x = 700;
      this.y = rowSelectorBugsRight();
      this.speed = bugSpeed();
    }
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
EnemyReverse.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//-----------------------------------------------------------------------------

//The player character
var Player = function() {
    this.sprite = "images/char-boy.png";
    this.x = 200;
    this.y = 380;
};

// Stops player from leaving the game border
Player.prototype.update = function() {
    if (this.x < 0) {
      this.x += 100;
    }
    if (this.x > 400) {
      this.x += -100;
    }
    if (this.y > 400) {
      this.y += -80;
    }
    if (this.y < 60) {
      this.y = 380;
      this.x = 200;
      score = Number(score)+25;
      localStorage.froggerScore = score;
      updateGlobalScore();
    }
    // updates the highScore
    if (score > highScore) {
      highScore = score;
      localStorage.froggerHighScore = highScore;

      updateGlobalScore();
    }
};

// Draws the player character
Player.prototype.render = function() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Handle player inputs
Player.prototype.handleInput = function(key) {
    if (key === "up") {
      this.y += -80;
      updateGlobalScore();
    }
    if (key === "down") {
      this.y += 80;
    }
    if (key === "left") {
      this.x += -100;
    }
    if (key === "right") {
      this.x += 100;
    }
};

//-----------------------------------------------------------------------------

//the gems that pop up throughout the game that the player
//can pick up to gain points, adds 20 points per gem.
var Gem = function() {
    this.y = rowSelector();
    this.x = colSelector();
    this.sprite = "images/Gem Blue.png";
    this.chance = 0.9;
};

Gem.prototype.update = function() {
    if (this.x === player.x && this.y === player.y && this.chance < 0.3) {
      score = Number(score)+10;
      localStorage.froggerScore = score;
      updateGlobalScore();
      this.y = rowSelector();
      this.x = colSelector();
      this.chance = Math.random();
    }
    // Sets up which gem to spawn and extra points are awarded if gem is of a
    // certain color.
    if (score <200) {
      this.sprite = "images/Gem Blue.png";
    }
    if (score >= 200 && score < 500) {
      this.sprite = "images/Gem Green.png";
    }
    if (this.x === player.x && this.y === player.y && this.chance < 0.3 && score >= 200 && score < 500) {
      score = Number(score)+10;
      localStorage.froggerScore = score;
    }
    if (score >= 500) {
      this.sprite = "images/Gem Orange.png";
    }
    if (this.x === player.x && this.y === player.y && this.chance < 0.3 && score >= 500) {
      score = Number(score)+5;
      localStorage.froggerScore = score;
    }
};

// Draws the Gem
Gem.prototype.render = function() {
    if (this.chance < 0.3) {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};

//Set timer for gem generation
setInterval(function () {
    for (var gems in allGems) {
      allGems[gems].chance = Math.random();
      if (allGems[gems].chance <0.05) {
        allGems[gems].chance = Math.random();
        allGems[gems].x = colSelector();
        allGems[gems].y = rowSelector();
      }
    }
  },
  5000);

//-----------------------------------------------------------------------------

//The star object pops up not frequently but offers a big point bonus
var Star = function() {
    this.y = 60;
    this.x = colSelector();
    this.sprite = "images/Star.png";
    this.chance = 0.9;
};

// Updates the star if player steps on it.
Star.prototype.update = function() {
    if (this.x === player.x && this.y === player.y && this.chance < 0.1) {
      score = Number(score)+40;
      localStorage.froggerScore = score;
      updateGlobalScore();
      this.x = colSelector();
      this.chance = Math.random();
    }
    // Makes sure the star and gem do not spawn on the same tile
    for (var gems in allGems) {
      if (allGems[gems].x === this.x && allGems[gems].y === this.y) {
        allGems[gems].y = rowSelector();
        allGems[gems].x = colSelector();
      }
    }
};

// Draws the star
Star.prototype.render = function() {
    if (this.chance < 0.1) {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};

//set timer for star generation
setInterval(function () {
    if (star.chance >= 0.1) {
      star.chance = Math.random();
    }
  },
  8000);

//-----------------------------------------------------------------------------
// Allt he functions

// This randomly generates a y value between the 3 row tiles
var rowSelector = function() {
    var row = Math.floor(Math.random()*4);
    var y;
    if (row === 3) {
      y = 60;
    }
    else if (row === 2) {
      y = 140;
    } else if (row === 1) {
      y = 220;
    } else if (row === 0) {
      y = 300;
    }
    return y;
};

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
};

// This randomly generates the lane for bugs on the left side
var rowSelectorBugsLeft = function() {
    var row = Math.floor(Math.random()*2);
    var y;
    if (row === 1) {
      y = 60;
    } else if (row === 0) {
      y = 220;
    }
    return y;
};

// This randomly generates the lane for bugs on the right side
var rowSelectorBugsRight = function() {
    var row = Math.floor(Math.random()*2);
    var y;
    if (row === 1) {
      y = 140;
    } else if (row === 0) {
      y = 300;
    }
    return y;
};

// Sets bugs speed
var bugSpeed = function() {
  return Math.floor((Math.random() * 5)+2);
};

// Checks to see if global high score can be updated
var updateGlobalScore = function() {
  var tempScore = score;
  query.exists("highScore");
  query.first({
    success: function(object) {
      if (tempScore > object.attributes.highScore) {
        object.set("highScore", tempScore);
        object.save();
        globalHighScore = tempScore;
      } else {
        globalHighScore = object.attributes.highScore;
      }
    },
    error: function(error) {
      alert("Error: " + error.code + " " + error.message);
    }
  });
};

//initiates all the objects; enemies, player, gems, stars
// and scoring system
var allEnemies = [];
for (i = 0; i < 4; i++) {
  allEnemies.push(new Enemy());
}
var allEnemiesReverse = [];
for (i = 0; i < 4; i++) {
  allEnemiesReverse.push(new EnemyReverse());
}
var player = new Player();
var allGems = [];
for (i = 0; i < 6; i++) {
  allGems.push(new Gem());
}
var star = new Star();
var score = 0;
var highScore = 0;
var globalHighScore;

// Loads the server stored global high score
Parse.initialize("p45yej86tibQrsfKYCcj6UmNw4o7b6kxtsobZnmA", "fXSkEhDGakCYnVv5OOdAfWDmjAuQvlnFI5KOwIUO");
var GameScore = Parse.Object.extend("GameScore");
var gameScore = new GameScore();
var query = new Parse.Query(GameScore);

query.exists("highScore");
query.first({
  success: function(object) {
    if (object === undefined) {
      globalHighScore = 0;
    } else {
      globalHighScore = object.attributes.highScore;
      console.log(object.attributes.highScore);
    }
  },
  error: function(error) {
    alert("Error: " + error.code + " " + error.message);
  }
});

// Sets the highscore from local storage if available
if (localStorage.froggerHighScore) {
  highScore = localStorage.froggerHighScore;
}

// Sets the score plaer left off with.
// Prevents resets if the player sucks
if (localStorage.froggerScore) {
  score = localStorage.froggerScore;
}

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
