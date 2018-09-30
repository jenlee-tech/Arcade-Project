// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    //adding changes
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    this.x = 0;
    this.y = y + 55;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
    this.horizontalMove = 101;
    this.offCanvas = this.horizontalMove *5;
    
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    //** this makes the bug move across the screen*/
    if (this.x < this.offCanvas) {
        this.x += this.speed * dt;
    }
    else { //**this part makes bug re-appear on screen */
        this.x=0;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

//**creating the Survivor class and stating initial position  */
class Survivor {
    constructor() {
        this.sprite = 'images/char-pink-girl.png';
        this.horizontalMove = 101;
        this.verticalMove = 83;
        this.initX = this.horizontalMove * 2; //**initialized the x position of Survivor */
        this.initY = (this.verticalMove * 4)  + 55; //**initialized the Y position of Survivor */
        this.x = this.initX;
        this.y = this.initY;
        this.win = false;    
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
                if (this.x < this.horizontalMove * 4) {
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
//**update method */
    update() {
        for(let enemy of allEnemies) {
         
            if (this.y === enemy.y &&  //**the Survivor's y axis is equal to the enemy's y axis?*/ 
                ( (enemy.x + enemy.horizontalMove/2) > this.x) && //**the sum of the enemy's x axis and 101 - is more than survivor's x axis?*/
                (enemy.x < (this.x + this.horizontalMove/2) ) //**the enemy's x axis is less than the sum of the Survivor's x axis and 101? */
                ) {
                this.reset();
                }
                
        }
        if (this.y === 55) {
            //**alert("you won the game!!!");
            this.win = true;
            document.getElementById("modal").style.display = "block";
        }
    }
    //**when the survivor wins, modal shows by changing the style*/
    showModal() {
        document.getElementById("modal").style.display = "block";
    }

    reset() { //**reset the Survivor back on the initial points. */
        alert("You got caught by a bug - you gotta go back")
        this.y = this.initY;
        this.x = this.initX;
    }
}
// Now instantiate your objects.

// Place the player object in a variable called player
//**this insatiates the player base off the Survivor class */
const player = new Survivor();
const bugOne = new Enemy(-101, 0, 50);
const bugTwo = new Enemy(-101, 83, 200);
const bugThree = new Enemy((-101*2), 83, 100);
const bugFour = new Enemy(-101, 166, 150);
const allEnemies = [];
// Place all enemy objects in an array called allEnemies

allEnemies.push(bugOne, bugTwo, bugThree, bugFour);
//**console.log(allEnemies);




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




