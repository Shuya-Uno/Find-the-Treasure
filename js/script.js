import {
  dimension
} from "dimension";

import * as GameObject from "gameObject";

import * as Keyboard from "keyboard";

import {
  move
} from "move";

import * as Music from "music";

import {
  position
} from "position";

import {
  touch
} from "touch";

import * as Speed from "speed";

/*
  Using Namespace import to make the source module of the imported scripts apparent inside code
  For objects that are the only ones imported from source, 
    and the sources are already apparent by its object name, using Named imports
*/

const border = document.getElementById('border');
const startScreen = document.getElementById('start-screen');

const instructionLink = document.getElementById('instruction-link');
const instruction = document.getElementById('instruction-wrapper');
const startBox = document.getElementById('start-box');

const back = document.getElementById('back');

const playButton = document.getElementsByClassName('play-button');

const whoElse = [
  GameObject.maps.center,
  GameObject.maps.top,
  GameObject.maps.topRight,
  GameObject.maps.right,
  GameObject.maps.bottomRight,
  GameObject.maps.bottom,
  GameObject.maps.bottomLeft,
  GameObject.maps.left,
  GameObject.maps.topLeft,
  GameObject.enemy,
  GameObject.tree,
  GameObject.goal
];
// whoElse: Array of movable objects other than hero

const npc = [
  GameObject.enemy,
  GameObject.tree,
  GameObject.goal
];
// npc: Array of on-map objects other than hero


function animate(){

  Speed.speedInitializer(whoElse);

  Speed.chaser(GameObject.hero, GameObject.enemy);
  move.mover(whoElse, Keyboard.direction, GameObject.hero);

  dimension.set(npc);
  position.set(whoElse);
  touch.checker(GameObject.hero, npc);

  touch.crash(GameObject.hero, 'green', 'red');
  touch.gameOver(GameObject.enemy, 'yellow', 'blue', Music.soundEffect.boom, 'defeat', Music.soundEffect.boom.paused, Music.soundEffect.treasure.paused);
  touch.bush(GameObject.tree, 'yellow', 'green', Music.soundEffect.bush);
  touch.gameOver(GameObject.goal, 'yellow', 'orange', Music.soundEffect.treasure, 'clear', Music.soundEffect.boom.paused, Music.soundEffect.treasure.paused);

  requestAnimationFrame(animate);
}

function start(){

  document.removeEventListener('click', start);

  startScreen.remove();

  border.style.cursor = "none";

  Music.bgm.play();

  animate();

}
/*
   Gets rid of no longer necessary things(start screen, cursor)
    and start the game (starts off Music.bgm and the "animate" loop)
   Removing done by remove() method
*/


function shiftScreen(instructionDisplay, startBoxDisplay){
  instruction.style.display = instructionDisplay;
  startBox.style.display = startBoxDisplay;
}


// start main code

window.addEventListener('keydown', Keyboard.press);
window.addEventListener('keyup', Keyboard.release);

Music.button.element.addEventListener('click', Music.button.on);

instructionLink.addEventListener('click', () => shiftScreen("flex", "none"));

back.addEventListener('click', () => shiftScreen("none", "flex"));

for (const playBtn of playButton){
  playBtn.addEventListener('click', start);
}

// end main code
