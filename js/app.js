
function build_playground(playground) {
    /* Loop through the number of rows and columns of the playground defined in entities.js
    * and, using the rowImages array, draw the correct image for that
    * portion of the "grid"
    */
    for (row = 0; row < playground.numRows; row++) {
        for (col = 0; col < playground.numCols; col++) {

            /* The drawImage function of the canvas' context element
            * requires 3 parameters: the image to draw, the x coordinate
            * to start drawing and the y coordinate to start drawing.
            * We're using our Resources helpers to refer to our images
            * so that we get the benefits of caching these images, since
            * we're using them over and over.
            */

           var image_url = images[playground.layout[row * playground.numCols + col]];
           ctx.drawImage(Resources.get(image_url), col * playground.square.pixelWidth, row * playground.square.pixelHeight);
        }
    }
}

function draw(element){                                      //Draw the elements on canvas placing them of the middle of tiles

    var x = Resources.square.pixelWidth;                       //also calculate the offset if the element is scaled.
        y = Resources.square.pixelHeight;
        p = [element.position[0],element.position[1]];
        s = element.scale;

    function offset(element, scale) {
        if (scale !== 1) {
            return ((element - element * scale) / 2) * s;   //
        } else {
            return 0;
        }
    };

    ctx.scale(element.scale, element.scale);
    ctx.drawImage(Resources.get(element.sprite), p[0] * x / s + offset(x, s) , p[1] * y / s - y / 3  + 2 * offset(y, s));
    ctx.scale(1/element.scale, 1/element.scale);
}


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function scoring() {
    var string1 = "My score : %data";
    var string2 = "Game level : %data";
    var string3 = "Level score: %data";
    var string4 = "My lifes: %data";
    document.querySelector("#scoring").innerHTML = string1.replace("%data",game.player.score.toString())+ "   " +
    string4.replace("%data",game.player.lives.toString()) + "   " +
    string2.replace("%data",game.level.toString()) + "   " +
    string3.replace("%data",game.level_score.toString()) ;
}

var images = {}                                       // images Object  (or hashmap)
images['s']      = 'images/stone-block.png';
images['w']      = 'images/water-block.png';
images["g"]      = 'images/grass-block.png';
images["r"]      = 'images/Rock.png';
images["S"]      = 'images/Star.png';
images["k"]      = 'images/Key.png';
images["player"] = 'images/char-boy.png' ;
images["bug"]    = 'images/enemy-bug.png' ;
images["princess"]      = 'images/char-princess-girl.png';

var playLayouts = [                           // Playout Arrays. Each Array element is an array
    ['w', 'w', 'w', 'k', 'w',                 //  Level 1   playground layout
     's', 's', 's', 's', 's',                 // w : water
     's', 's', 's', 's', 's',                 // g : grass
     's', 's', 's', 's', 's',                 // s : stone
     's', 's', 's', 's', 's',
     'g', 'g', 'g', 'g', 'g',
     'g', 'g', 'g', 'g', 'g'],

     ['w', 'k', 'w', 'w', 'w',                  // Level 2  playround layout
      's', 's', 'r', 's', 's',
      's', 's', 's', 's', 's',
      's', 'r', 's', 's', 's',
      's', 's', 's', 's', 's',
      'g', 'g', 'g', 'g', 'g',
      'g', 'g', 'g', 'g', 'g'],

     ['k', 'S', 'w', 'w', 'S',                  // Level 3 playground layout
      's', 's', 'r', 's', 's',
      's', 's', 's', 's', 's',
      's', 'r', 's', 's', 's',
      's', 's', 's', 's', 's',
      's', 's', 's', 's', 'r',
      'g', 'g', 'g', 'g', 'g',
      'g', 'g', 'g', 'g', 'g']
     ] ;

var allPlaygrounds  = [];
var Score_level1 = 300;                           // Level total score
var levelScore = [];

// three levels
for (var i = 0, len =  playLayouts.length; i < len; i++) {
    var playground = new Playground(playLayouts[i], Math.floor(Resources.canvas.width/101));     //this for loop creates enemies and fill up the allEnemies Object.
    this.allPlaygrounds.push(playground);
    this.levelScore.push(Score_level1*(i+1)); // level 1 playgound= 300, level 2 playground= 600 , level 3 playground = 900
}

game = new Game();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    game.player.handleInput(allowedKeys[e.keyCode]);
});


