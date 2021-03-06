function inherit(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype); // delegate to prototype
    subClass.prototype.Constructor = subClass; // update constructor on prototype
}

function Element(sprite) { // Elemnet class is the superclass of the of  Enemy and Player classes
    this.position = []; //   position
    this.sprite = sprite; //   image
    this.exist = true; //   existence
    this.scale = 1; //   scale
};
Element.prototype.render = function() { //render method for elemnst  if they exist
    if (this.exist === true) { //calls the draw function which places the element
        draw(this);
    } //on the canvas, positioned in the middle of
}; //square and deals width scaled actors.

inherit(Enemy, Element);
// Enemy is a subclass of Element
function Enemy(sprite) { //Enemy constructor function. Inherit basic
    Element.call(this, sprite); //properties from Element  and create a random speed
    this.scale = 0.8;
    var freelane = game.freeLanes.length;
    this.speed = (Math.floor(Math.random() * 8 * freelane) + freelane + 1) / Resources.speed;

}


Enemy.prototype.changeSpeed = function changeSpeed(speed) {
    var freelane = game.freeLanes.length; 
    this.speed = (Math.floor(Math.random() * 8 * freelane) + freelane + 1) / speed;
}


Enemy.prototype.update = function update(dt) { //moves enemy across the playground and re-spawns it
    this.position[0] += this.speed * dt; //when it reaches the end of the playground
    if (this.position[0] > playground.numCols) {
        this.position[0] = -1; //   go back to col -1
        this.position[1] += 1; //   go to the next row until it reach grass ("g")
        if (game.playground.layout[this.position[1] * playground.numCols + this.position[0] + 1] === "g") {
            this.position[1] = getRandomInt(1, game.freeLanes.length); //   random row position ( 1: freelanes)
        }
    }
};

// Player classes
inherit(Player, Element); // subclassing Element class

function Player(sprite) { // Player constructor. Inherit basic
    Element.call(this, sprite); //properties and adds lives, score and step
    this.scale = 0.9; // scale the player sprote
    this.lives = 3;
    this.score = 0;
    this.win = false; // is set to true when the player finish the game level 3
    this.step = [0, 0];
}

Player.prototype.Reset = function() {
    if (this.score < game.level_score) { // reset the player to its original position
        this.reset(game.playground);
    } else {
        if (game.level <= playLayouts.length - 1) {
            game.level++; // if the score is higher or equal to the level_score, the player goes to the next level
            game.newLevel(); // next level
        } else {
            // the player has sucessfully completed all the game levels
            game.player.win = true; // tell the engine to stop updating the canvas
            game.playground.layout = playLayouts[playLayouts.length - 1];

            //  console.log(game.playground, game.princess.position);
        }
    }
}

Player.prototype.update = function() {
    var newPos = [this.position[0] + this.step[0], this.position[1] + this.step[1]]; //update player position after checking the boundaries
    var layout_index = newPos[1] * game.playground.numCols + newPos[0];
    // console.log(newPos,layout_index) ;
    var pos = game.playground.layout[layout_index];
    switch (pos) {
        case "w": // water
            this.score += 50;
            this.Reset();
            break;
        case "k": // Key
            this.score += 150;
            this.Reset();
            break;
        case "S": // Star
            this.score += 100;
            this.Reset();
            break;
        case "r": // no change since the boy can't cross rock
            break;
        default:
            if (newPos[0] >= 0 && newPos[0] < game.playground.numCols) { //checking for playground boundaries (left-right)
                this.position[0] = newPos[0];
            }
            if (newPos[1] >= 0 && newPos[1] < game.playground.numRows) { //checking for playground boundaries (top-bottom)
                this.position[1] = newPos[1];
            }
            break;
    }
    this.step = [0, 0];
};

Player.prototype.handleInput = function(key) { //player handle input for moving the player around.

    if (key === 'left')
        this.step[0] = -1;
    if (key === 'up')
        this.step[1] = -1;
    if (key === 'right')
        this.step[0] = 1;
    if (key === 'down')
        this.step[1] = 1;
};

Player.prototype.reset = function(playground) { //reset player start position after collision
    this.position = [Math.floor(playground.numCols / 2), playground.numRows - 1];
};



inherit(Princess, Element); // subclassing Element class

function Princess(sprite) { // Player constructor. Inherit basic
    Element.call(this, sprite); //properties and adds lives, score and step
    this.scale = 0.9;
    this.position = [0, 0];
}
Princess.prototype.reset = function(playground) { //reset princess start position after collision
    this.position = [0, 0];
};


// Playground classes

function Playground(layout, col) { //Constructor function of playground

    this.layout = layout; //Need 3 arguments: layout(Array that hold the representation of the playground)
    this.numCols = col; //col: number of column on the playground
    this.numRows = this.layout.length / col;
    this.square = Resources.square;
    this.startPosition = [Math.floor(col / 2), this.numRows - 1];
};

Playground.prototype.freeLane = function(playground) { //Checking for rows on the map which built up only from stones
    var freeLanes = []; //this function determine where the enemy can spawn.
    var flag = 0; // enemy can spawn on stone and rock
    for (var row = 0; row < playground.numRows; row++) {
        if (playground.layout[row * playground.numCols] == 's') {
            for (var col = 0; col < playground.numCols; col++) {
                if (playground.layout[row * playground.numCols] != playground.layout[row * playground.numCols + col]) {
                    if (playground.layout[row * playground.numCols + col] != 'r')
                        flag = 1;
                }
            }
            if (flag === 0) {
                freeLanes.push(row);
            }
            flag = 0;
        }
    }
    return freeLanes;
};

Playground.prototype.freePlace = function(playground) { //Checking for free position  of the stone squares
    var squares = []; //where the collectables can spawn.
    for (var row = 0; row < playground.numRows; row++) {
        for (var col = 0; col < playground.numCols; col++) {
            if (playground.layout[row * playground.numCols + col] == 's') {
                squares.push([col, row]);
            }
        }
    }
    return squares;
};

/* Game class   */

function Game() { //   Game Class constructor.
    this.level = 1; //   start with level 1
    this.enemies = 5; //   Level, number of enemies ( freelane)
    this.playground = []; //    multi level playgrond
    this.level_score = levelScore[this.level - 1] //    must score to change level
    this.freeLanes = 0; //    number of free Lanes for enemies
    this.player = new Player(images["player"]);
    this.princess = new Princess(images["princess"]);
};

Game.prototype.newLevel = function() { //This function holds the logic of the game and create enemies
    this.playground = allPlaygrounds[this.level - 1]; //Additional properties : current (playgound/level)
    this.level_score = levelScore[this.level - 1]; // Score of this level
    this.freeLanes = this.playground.freeLane(this.playground); //holds the lanes built up only from stones.
    this.allEnemies = [];
    var enemies = this.enemies + this.level;
    for (var i = 0, len = enemies; i < len; i++) {
        var enemy = new Enemy(images["bug"]); //this for loop creates enemies and fill up the allEnemies Object.
        this.allEnemies.push(enemy);
        this.allEnemies[i].position = [0, this.freeLanes[i % this.freeLanes.length]];
    }
    this.player.reset(this.playground); //reset the player.
};

Game.prototype.checkCollisions = function(element1, element2, area) { //Checking collision between elements
    var x1 = element1.position[0] * playground.square.pixelWidth;
    var y1 = element1.position[1] * playground.square.pixelHeight;
    var x2 = element2.position[0] * playground.square.pixelWidth;
    var y2 = element2.position[1] * playground.square.pixelHeight;
    return (Math.abs(x1 - x2) < area) && (Math.abs(y1 - y2) < area);
};

Game.prototype.eventHandler = function() { //Holds the commands for events in game.
    this.allEnemies.forEach(function(enemy) {
        if (enemy.exist && this.checkCollisions(enemy, this.player, 50)) {
            this.player.score -= 100;
            this.player.lives--;
            // console.log("collision",this.player.lives);
            if (this.player.lives > 0 && this.player.score > 0) {
                this.player.reset(this.playground);
            } else {
                location.reload();
            }
        }
    }, this);
};