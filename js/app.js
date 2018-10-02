// Enemy class (constructor)
var Enemy = function(x, y, speed) {
    this.x = 0;
    this.y = y + 70;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
    this.horizontalMove = 101;
    this.offCanvas = this.horizontalMove *5;
    
};

// this updates the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
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

//**Survivor class (or others may call it a player class) */
class Survivor {
    constructor() {
        this.sprite = 'images/char-pink-girl.png';
        this.horizontalMove = 101;
        this.verticalMove = 83;
        this.initX = this.horizontalMove * 2; //**initialized the x position of Survivor */
        this.initY = (this.verticalMove * 4)  + 70; //**initialized the Y position of Survivor */
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
/*this is the update method 
*it test the following conditions: 
*the Survivor's y axis is equal to the enemy's y axis. vertical plane
*the enemy's x axis is less than the sum of the Survivor's x axis and 101. horizontal plane
*the sum of the enemy's x axis and 101 - is more than survivor's x axis. horizontal plane
*fine tune horizontal plane conditions by dividing it by 2*/
    update() {
        for(let enemy of allEnemies) {
         
            if (this.y === enemy.y &&  
                ( (enemy.x + enemy.horizontalMove/2) > this.x) && 
                (enemy.x < (this.x + this.horizontalMove/2) ) 
                ) {
               alert("You bumped into a bug, you have to start again");
               this.reset();
                }
            }
        if (this.y < 70) {
            this.win = true;
            modalTitle.innerText = "You won the game!";
            starShow.innerHTML = starSymbol + starSymbol + starSymbol;
            this.showModal();
        }
    }
//**Modal shows and closes by changing the style*/
    showModal() {
        document.getElementById("modal").style.display = "block";
    }

    closeModal() {
        document.getElementById("modal").style.display = "none";
    }

//**Resets the Survivor back on the initial points*/
    reset() { 
        this.y = this.initY;
        this.x = this.initX;
    }
}
//**Above this line, Survivor and Enemy classes are established*/

//**Objects instantiated */ 
const player = new Survivor();
const bugOne = new Enemy(-101, 0, 50);
const bugTwo = new Enemy(-101, 83, 200);
const bugThree = new Enemy((-101*2), 83, 100);
const bugFour = new Enemy(-101, 166, 150);

//**All enemy objects in an array called allEnemies*/
const allEnemies = [];
allEnemies.push(bugOne, bugTwo, bugThree, bugFour);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
//Provided by Udacity
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});