import {
  dimension,
  setDimension
} from "dimension";

import {
  maps,
  hero,
  enemy,
  tree,
  goal
} from "gameObject";

import {
  direction,
  press,
  release
} from "keyboard";

import {
  move
} from "move";

import {
  musicButton,
  bgm,
  soundEffect,
  setColor,
  lineThrough,
  musicOn,
  musicOff
} from "music";

import {
  position,
  setPosition
} from "position";

import {
  touchChecker,
  changeColor,
  jump,
  addJump,
  gameOver,
  bush,
  crash
} from "touch";

import {
  speedInitializer,
  chaser
} from "speed";


const border = document.getElementById('border');
const startScreen = document.getElementById('start-screen');

const playFromStart = document.getElementById('play-from-start');
const instructionLink = document.getElementById('instruction-link');
const instruction = document.getElementById('instruction-wrapper');
const startBox = document.getElementById('start-box');


const back = document.getElementById('back');
const playFromInstruction = document.getElementById('play-from-instruction');


const whoElse = [
  maps.center,
  maps.top,
  maps.topRight,
  maps.right,
  maps.bottomRight,
  maps.bottom,
  maps.bottomLeft,
  maps.left,
  maps.topLeft,
  enemy,
  tree,
  goal
];
// whoElse: Array of movable objects other than hero

const npc = [
  enemy,
  tree,
  goal
];
// npc: Array of on-map objects other than hero


function animate(){

  speedInitializer(whoElse);

  chaser(hero, enemy);
  move.mover(whoElse, direction, hero);

  setDimension(npc);
  setPosition(whoElse);
  touchChecker(hero, npc);

  crash(hero, 'green', 'red');
  gameOver(enemy, 'yellow', 'blue', soundEffect.boom, 'defeat', soundEffect.boom.paused, soundEffect.treasure.paused);
  bush(tree, 'yellow', 'green', soundEffect.bush);
  gameOver(goal, 'yellow', 'orange', soundEffect.treasure, 'clear', soundEffect.boom.paused, soundEffect.treasure.paused);

  requestAnimationFrame(animate);
}

function start(){

  document.removeEventListener('click', start);

  startScreen.remove();

  border.style.cursor = "none";

  bgm.play();

  animate();

}
/*
   Gets rid of no longer necessary things(start screen, cursor)
    and start the game (starts off bgm and the "animate" loop)
   Removing done by remove() method
*/


function shiftScreen(instructionDisplay, startBoxDisplay){
  instruction.style.display = instructionDisplay;
  startBox.style.display = startBoxDisplay;
}


// start main code

window.addEventListener('keydown', press);
window.addEventListener('keyup', release);

musicButton.addEventListener('click', musicOn);

instructionLink.addEventListener('click', () => shiftScreen("flex", "none"));
playFromStart.addEventListener('click', start);

back.addEventListener('click', () => shiftScreen("none", "flex"));
playFromInstruction.addEventListener('click', start);

// end main code
