frontend-nanodegree-arcade-game
===============================

loading the index.html will start the game immediately.

Use arrows to move the player(boy) around grass and stone tiles.

Goal:

The goal is to reach the water or the Key or the Star on the other side of the playground without hitting the bugs. The player has 3 lives before the game restart and load the  first level. The game has three level. When the third level is completed, the player win and the game is reloaded

Player:

-When the player reachs the water at the other side, the player will collect 50 points when he reaches the water. He will collect 150 poinst if he gets the key and 100 points if he gets a Star. The Star will appear only at the third level.
-When the player is  hit by a bug, he loses 100 points and one life.
-When the player gets 300 points, he gets the next level ( i.e level+1)
-Rocks replace some stones when with game level 2 and 3.
-The rock is an obtacle for the player. He can't cross it.
-When the player get 900 points, the key will be transformed into a princess

Bugs:

-The number of bugs = 5  +  game level
-The bugs will initailly be placed one per each lane. When all free lanes are occupied, the next selected free lane will start with the first lane.
-The bugs run on freelanes and their speed will depend on the number of free lanes.
-When a bug goes beyond its primary lane, it will goes to the next lane.
-When it goes beyond the last free lane, it will start on a random lane number (1: freelane)
-The bugs can cross the rock.



Not yet implemented :

- The player  can select an sprite to represent the Actor ( list of sprites)

Bug 

- When the player win, the princess should be displayed  at the position of the key


I have been inspired for this project by:
http://devrob.github.io/Udacity-WebDev-project3
