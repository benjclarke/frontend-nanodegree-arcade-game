// Enemies our player must avoid

var title_width = 101;
var tile_height = 83;
var Enemy = function(x, y) {

    this.x = x;
    this.y = y;
    speed = Math.random() * 100 + 150;
    this.speed = speed;
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 505) {
    this.x += this.speed * dt;
    } else { 
        this.x = -10;
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
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-cat-girl.png';

};

Player.prototype.restart = function() {
    this.x = 200;
    this.y = 400;
};


Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);


};

// checks to make sure the player is on the playable space - if so executes the input handler for each of 4 keys

Player.prototype.handleInput = function(key) {
    if(key == 'left'){
        if (this.x > 20){
            this.x -=title_width;
        }
    }
    else if(key == 'right'){
        if(this.x < 320){
            this.x +=title_width;
        }
    }
    else if(key == 'up'){
        if (this.y > 50){
            this.y -=tile_height;
        }
        }
    else if(key == 'down'){
        if(this.y < 320){
            this.y +=tile_height;
        }
    }
};

// taken from moz tutorial on 2D collision https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
// added some padding to width and height of player and enemy object to guesstimate their size 


Player.prototype.collision = function() {
    allEnemies.forEach(function(enemy) {
    if(enemy.x < player.x + 30 && enemy.x + 60 > player.x && enemy.y < player.y + 60 && enemy.y + 40 > player.y) {
        player.restart();
    }
    });
}

// can't get this to work perfectly - the distance between player's last Y position and the reset requirement Y position is less than one incremental move - so the check is met and the player resetes
Player.prototype.update = function(dt) {
    if (this.y < 55 ) {
        alert("you made it to the end");
        this.restart();
    }
    player.collision();

};

var player = new Player(200, 400);

var enemy1 = new Enemy(100, 150);
var enemy2 = new Enemy(200, 220);
var enemy3 = new Enemy(80, 60);
var enemy4 = new Enemy(160, 60);


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
allEnemies = [enemy1, enemy2, enemy3, enemy4];


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
