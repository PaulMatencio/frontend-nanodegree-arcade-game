frontend-nanodegree-arcade-game
===============================

loading the index.html will start the game immediately.

Use arrows to move the player(boy) around grass and stone tiles.

Goal:

The goal is to reach the water or the Key or a Star on the other side of the playground without hitting the bugs. The game has three level. Stars will appear after the  level 2. The player has 3 lives before the game restart and load the  first level.
The player wins when he completed the level 3 : bugs will disappear and princess will appear over the key. The player is left where he is. The objective for the player is to be as close as possible to the princess. When all bugs are gone, the player can move closer to the princess.

Player:

-If the player reachs the water at the other side, he will collect 50 point. He can collect 150 poinst if he reaches the key and 100 points if he reaches a Star.
It should be noted that Star(s) will appear only at the third level.
-When the player is  hit by a bug (collision), he loses 100 points and one life.
-When the player gets 300 points, he goes to the next level of the game( i.e level+1)
-A few Rocks will replace stones at level 2 and 3.
-Rocks are obtacle for the player. Player can't cross rock.

WIN:
-When a player gets 900 points, he wins the game then

	1) A princess will be placed over the key and the player where he was left. The objective of the player is to be as close as possible to the princess.
	2) All the bugs are gone


BUGS

-The number of bugs = 5  +  game level
-The bugs will initailly be placed one per each lane. When all free lanes are occupied, the next selected free lane will start with the first lane.
-The bugs run on freelanes and their speed will depend on the number of free lanes.
-When a bug goes beyond its primary lane, it will goes to the next lane.
-When it goes beyond the last free lane, it will start on a random lane number (1: freelane)
-The bugs can cross the rock.



Not yet implemented :

- The player can select the speed of the bugs ( very slow, slow, medium, fast and very fast)


For this project, I was inspired by:
http://devrob.github.io/Udacity-WebDev-project3
