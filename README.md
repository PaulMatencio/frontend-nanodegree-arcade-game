frontend-nanodegree-arcade-game
===============================

loading the index.html will start the game immediately.

Use arrows to move the player(BOY) around GRASS , STONE and ROCKS tiles.

The GAME

1) Player can select the speed of the BUGS ( very low to very fast)
2) The goal is reach the score of at least 900 points. When  the player reaches the WATER, he gains 50 points.  The KEY (water side)  will give him 150 points and a STAR (water side) 100 points. 
3) When he wins, a bonus (PRINCESS) will appear over the last KEY and all the BUGS will disappear.
4) If the player is hit by a BUG, he will loose 100 points and one of his 3 lifes. 
5) When the player lose all his 3 life's or his score is below 0, he lose the game and the game is reloaded

6) The game has three levels.
7) The level 1 and 2 have 7 rows ( 2 grasses, 4 stones and 1 water ). The level 3 has 8 rows.

7) A KEY and STARS can replace WATER on the water side. ROCKS can replace STONES on stones lanes.

Every time the player reaches the WATER, the KEY or STAR, he gains the corresponding points and moves to its original position to continue the game. The Game is reloaded when the player life reach 0 or his score is below 0. The player is moved to its original position for a new game


Points

-WATER					-> 	+50 points 
-STAR 					-> 	+100 points
-KEY 					-> 	+150 points
-Hits by a BUG			->	-100 points and 1 life

Scores

-300 points    			 -> level 2
-600 points  			  -> level 3
-900 points    			 -> Win a princess        




The PLAYER:

1) The PLAYER can select the speed of the BUGS ( very slow, slow, medium, fast and very fast). 
2) BUGS move at different speeds.
3) The PLAYER has 3 lifes.
4) The PLAYER win when he completed the level 3 of the game
5) When the PLAYER wins, all the BUGS will disappear and a PRINCESS will appear over the last position of KEY.  
6) When the PLAYER is  hit by a BUG (collision), he loses 100 points and one life.
7) When the PLAYER reach the WATER, KEY or STAR, he gains cooresponding points and moves to its original position
8) When the PLAYER gain  300 or more points, he goes to the next level of the game( i.e level+1)
9) The Player can't cross rock.



The BUGS

-The initial number of BUGS is 5  plus the game level.
-The BUGS  move at different speed
-When the game is loaded or reloaded, the BUGS are orderly placed starting with FREELANE one.
-When a BUG crosses a FREELANE, it moves to the next one. When she crosses the last FREELANE, she is re-placed on a LANE randomly chosen
-The BUGS can cross any rock.


For this project, I was inspired by:
http://devrob.github.io/Udacity-WebDev-project3




