// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    //adding changes

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
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

//**creating the Survivor class and stating initial position @ 200, 410 */
class Survivor {
    constructor() {
        this.x = 200;
        this.y = 410;
        this.sprite = 'images/char-pink-girl.png';
        this.horizontalMove = 101;
        this.verticalMove = 83;
        }
    //**Draw the Survivor/player on the board - similar to Enemy method - render method*/
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        }

    //**this handles the movement of the Survivor - handleInput method*/
    //**this also restricts the movement of the Survivor on the board*/    
    handleInput(input){
        switch(input) {
            case 'left':
                if (this.x > 0) {
                    this.x -= this.horizontalMove;
                };
            break;

            case 'up':
                if (this.y > 0){
                    this.y -= this.verticalMove;
                };
            break;

            case 'right':
                if (this.x < this.horizontalMove * 3) {
                    this.x += this.horizontalMove;
                }
            break;

            case 'down':
                if (this.y < this.verticalMove * 4) {
                    this.y += this.verticalMove;
                }
            break;
        }
    }
}


// Now instantiate your objects.
//**this insatiates the player base off the Survivor class */
const player = new Survivor();


// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player




const allEnemies = [];

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
