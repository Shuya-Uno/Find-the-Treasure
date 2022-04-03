import {Map, OnMap} from "./class.js";

const mapWidth = 1024;
const mapHeight = 768;

const onMapWidth = 60;
const onMapHeight = 60;

const heroSpeedX = 6;
const heroSpeedY = 6;

const enemySpeedX = 3.2;
const enemySpeedY = 3.2;

const border = document.getElementById('border');
const startScreen = document.getElementById('start-screen');
const musicButton = document.getElementById('music-button');

const playFromStart = document.getElementById('play-from-start');
const instructionLink = document.getElementById('instruction-link');
const instruction = document.getElementById('instruction-wrapper');
const startBox = document.getElementById('start-box');


const back = document.getElementById('back');
const playFromInstruction = document.getElementById('play-from-instruction');

const bgm = new Audio('music/retro.mp3');
// Creates HTMLAudioElement by new Audio()

bgm.volume = 0;
bgm.loop = true;

const boomSound = new Audio('music/boom.mp3');
boomSound.volume = 0;

const bushSound = new Audio('music/bush.mp3');
bushSound.volume  = 0;

const treasureSound = new Audio('music/treasure.mp3');
treasureSound.volume = 0;

const map = new Map(
  document.getElementById('map'),
  mapWidth,
  mapHeight,
  0,
  0,
  0,
  0
);

const map2 = new Map(
  document.getElementById('map2'),
  mapWidth,
  mapHeight,
  0,
  -mapHeight,
  0,
  0
);

const map3 = new Map(
  document.getElementById('map3'),
  mapWidth,
  mapHeight,
  mapWidth,
  -mapHeight,
  0,
  0
);

const map4 = new Map(
  document.getElementById('map4'),
  mapWidth,
  mapHeight,
  mapWidth,
  0,
  0,
  0
);

const map5 = new Map(
  document.getElementById('map5'),
  mapWidth,
  mapHeight,
  mapWidth,
  mapHeight,
  0,
  0
);

const map6 = new Map(
  document.getElementById('map6'),
  mapWidth,
  mapHeight,
  0,
  mapHeight,
  0,
  0
);

const map7 = new Map(
  document.getElementById('map7'),
  mapWidth,
  mapHeight,
  -mapWidth,
  mapHeight,
  0,
  0
);

const map8 = new Map(
  document.getElementById('map8'),
  mapWidth,
  mapHeight,
  -mapWidth,
  0,
  0,
  0
);

const map9 = new Map(
  document.getElementById('map9'),
  mapWidth,
  mapHeight,
  -mapWidth,
  -mapHeight,
  0,
  0
);

const hero = new OnMap(
  document.getElementById('hero'),
  onMapWidth,
  onMapHeight,
  354,
  226,
  heroSpeedX,
  heroSpeedY,
  0,
  0,
  false
);

const enemy = new OnMap(
  document.getElementById('enemy'),
  onMapWidth,
  onMapHeight,
  -150,
  -150,
  enemySpeedX,
  enemySpeedY,
  0,
  0,
  false
);

const tree = new OnMap(
  document.getElementById('tree'),
  onMapWidth,
  onMapHeight,
  400,
  400,
  0,
  0,
  0,
  0,
  false
);

const goal = new OnMap(
  document.getElementById('goal'),
  onMapWidth,
  onMapHeight,
  1600,
  -400,
  0,
  0,
  0,
  0,
  false
);

const whoElse = [
  map,
  map2,
  map3,
  map4,
  map5,
  map6,
  map7,
  map8,
  map9,
  enemy,
  tree,
  goal
];
// whoElse: Array of movable objects other than hero


const whoElseNumber = whoElse.length;
// whoElseNumber: The number of objects included in whoElse


const npc = [
  enemy,
  tree,
  goal
];
// npc: Array of on-map objects other than hero


const npcNumber = npc.length;
// onMapNumber: The number of objects included in onMap


const direction = {
  ArrowLeft: false,
  ArrowRight: false,
  ArrowUp: false,
  ArrowDown: false,
  a: false,
  d: false,
  w: false,
  s: false
}



function dimension(object){
  object.left = object.x;
  object.top = object.y;
  object.right = object.x + object.width;
  object.bottom = object.y + object.height;
}
/*
   dimension
    Calculates the dimension(left,top,right,bottom) of objects

    left, top, right, bottom: Used to evaluate the "positional relationship and
     contact(whether they are touching each other or not)" of objects
*/


function setDimension(target, targetNumber){
  let i = 0;
  while (targetNumber > i){
    dimension(target[i]);
    i++;
  }
}
/*
   setDimension
    Run dimension() for each objects
    Targets are on-map obects other than hero
     (who can have contact with hero and also move on the screen)
*/


function position(object){
  object.x = object.x + object.dx;
  object.y = object.y + object.dy;
  // Reconfigure the x and y value, referring to current position(x,y) and speed

  object.element.style.left = object.x + "px";
  object.element.style.top = object.y + "px";
  /*
     Actually moving objects on screen by tweaking css,
      referring to the reconfigured x and y's
  */
}
/*
   position
    Used to actually move the objects, depending on dx,dy values
    Moves objects by changing css "left, top" values
*/


function setPosition(target, targetNumber){
  let i = 0;
  while (targetNumber > i){
    position(target[i]);
    i++;
  }
}
/*
   setPosition
    Apply position() to every target
*/




function speedInitializer(object, objectNumber) {
  let i = 0;
  while (objectNumber > i){
    if (object[i] == enemy) {
      object[i].dx = object[i].speedX;
      object[i].dy = object[i].speedY;
    }
    else {
      object[i].dx = 0;
      object[i].dy = 0;
    }
    i++;
  }
}
/*
   speedInitializer
    Resets dx and dy of objects each time paint() runs.
    Prevents objects from keeping accelarating (due to retained dx,dy everytime)
    Exclusive for enemy, refers to speedX and speedY (speed and direction) of enemy itself
     (enemy always have its own move, chasing hero)
*/


function chaser(prey, subject){
  if (subject.left > prey.left){
    subject.speedX = Math.abs(subject.speedX) * (-1);
  }
  else {
    subject.speedX = Math.abs(subject.speedX);
  }

  if (subject.top > prey.top){
    subject.speedY = Math.abs(subject.speedY) * (-1);
  }
  else {
    subject.speedY = Math.abs(subject.speedY);
  }
}
/*
   chaser
    (Re)Configure the direction of enemy's movement to chase hero
    direction decided by the positional relationship with hero
*/


function press(e){
  if (!direction[e.key]){
  // Throwing in pressed key value
    direction[e.key] = true;
  }
}
/*
   Reflects the key pressed to internal manageable data
    (which is saved as object properties)
*/


function release(e){
  if (direction[e.key]){
    direction[e.key] = false;
  }
}
// Resets the internal data of the key pressed when each arrow key is released


function moveLeft(object, objectNumber) {
  let i = 0;
  while (objectNumber > i) {
    object[i].dx += hero.speedX;
    i++;
  }
}

function moveRight(object, objectNumber) {
  let i = 0;
  while (objectNumber > i) {
    object[i].dx -= hero.speedX;
    i++;
  }
}

function moveUp(object, objectNumber) {
  let i = 0;
  while (objectNumber > i) {
    object[i].dy += hero.speedY;
    i++;
  }
}

function moveDown(object, objectNumber) {
  let i = 0;
  while (objectNumber > i) {
    object[i].dy -= hero.speedY;
    i++;
  }
}

function move(target, targetNumber){
  if (direction.ArrowLeft || direction.a){
    moveLeft(target, targetNumber);
  }

  if (direction.ArrowRight || direction.d){
    moveRight(target, targetNumber);
  }

  if (direction.ArrowUp || direction.w){
    moveUp(target, targetNumber);
  }

  if (direction.ArrowDown || direction.s){
    moveDown(target, targetNumber);
  }
}
/*
   Reflects the movement of hero by moving all the objects other than hero to
    the opposite direction from the key pressed
*/


function touchChecker(subject, object, objectNumber){
  let i = 0;
  let subjectTouch = 0;

  while (objectNumber > i){
    if (
     subject.left < object[i].right &&
     subject.right > object[i].left &&
     subject.bottom > object[i].top &&
     subject.top < object[i].bottom
   ){
     if (object[i].touching == false){
       object[i].touching = true;
     }

     subjectTouch++;
   }

   else {
     if (object[i].touching){
       object[i].touching = false;
     }
   }

   i++;
  }

  if (subjectTouch > 0){
    if (subject.touching == false){
      subject.touching = true;
    }
  }

  else {
    if (subject.touching){
      subject.touching = false;
    }
  }
}

function changeColor(target, color){
  if (target.element.style.backgroundColor != color){
    target.element.style.backgroundColor = color;
  }
}

function jump(location){
  // boomSound.removeEventListener('ended', jump);
  window.location.href = location + ".html";
}

function addJump(soundEffect, location){
  if (
    boomSound.paused &&
    treasureSound.paused
  ){
    soundEffect.addEventListener('ended', () => jump(location));
    soundEffect.play();
  }
}
/*
   Add event listener and play sound effect
    only when boomSound or treasureSound is not playing...
     = If the player reached the goal, or is caught by enemy
      the first time
   → Earlier thing the user touched (goal, enemy)
      decides game clear or not
*/

function gameOver(target, touchingColor, baseColor,soundEffect, location){
  if (target.touching){
    changeColor(target, touchingColor);
    addJump(soundEffect, location);
  }
  else {
    changeColor(target, baseColor);
  }
}

function bush(target, touchingColor, baseColor){
  if (target.touching){
    changeColor(target,touchingColor);
    bushSound.play();
  }
  else {
    changeColor(target, baseColor);
  }
}

function crash(target, touchingColor, baseColor){
  if (target.touching){
    changeColor(target, touchingColor);
  }
  else {
    changeColor(target, baseColor);
  }
}

function paint(){

  speedInitializer(whoElse, whoElseNumber);

  chaser(hero, enemy);
  move(whoElse, whoElseNumber);

  setDimension(npc, npcNumber);
  setPosition(whoElse, whoElseNumber);
  touchChecker(hero, npc, npcNumber);

  crash(hero,'green', 'red');
  gameOver(enemy, 'yellow', 'blue', boomSound, 'defeat');
  bush(tree, 'yellow', 'green');
  gameOver(goal, 'yellow', 'orange', treasureSound, 'clear');

  requestAnimationFrame(paint);
}

function start(){

  document.removeEventListener('click', start);

  startScreen.remove();

  border.style.cursor = "none";

  bgm.play();

  paint();

}
/*
   Gets rid of no longer necessary things(start screen, cursor)
    and start the game (starts off bgm and the "paint" animation loop)
   Removing done by remove() method
*/


function setColor(color){
  musicButton.style.color = color;
}

function lineSet(condition){
  musicButton.style.textDecoration = condition;
}

function musicOn(){
  bgm.volume = 0.5;
  boomSound.volume = 1;
  bushSound.volume = 1;
  treasureSound.volume = 1;

  musicButton.style.color = "blue";
  musicButton.style.textDecoration = "none";

  musicButton.removeEventListener('click', musicOn);
  musicButton.addEventListener('click', musicOff);

  musicButton.removeEventListener('mouseover', () => setColor('blue'));
  musicButton.removeEventListener('mouseout', () => setColor('#fff'));
  musicButton.addEventListener('mouseover', () => setColor('#fff'));
  musicButton.addEventListener('mouseout', () => setColor('blue'));

  musicButton.removeEventListener('mouseover', () => lineSet('none'));
  musicButton.removeEventListener('mouseout', () => lineSet('line-through'));
  musicButton.addEventListener('mouseover', () => lineSet('line-through'));
  musicButton.addEventListener('mouseout', () => lineSet('none'));
}

function musicOff(){
  bgm.volume = 0;
  boomSound.volume = 0;
  bushSound.volume = 0;
  treasureSound.volume = 0;

  musicButton.style.color = "#fff";
  musicButton.style.textDecoration = "line-through";

  musicButton.removeEventListener('click', musicOff);
  musicButton.addEventListener('click', musicOn);

  musicButton.removeEventListener('mouseover', () => setColor('#fff'));
  musicButton.removeEventListener('mouseout', () => setColor('blue'));
  musicButton.addEventListener('mouseover', () => setColor('blue'));
  musicButton.addEventListener('mouseout', () => setColor('#fff'));

  musicButton.removeEventListener('mouseover', () => lineSet('line-through'));
  musicButton.removeEventListener('mouseout', () => lineSet('none'));
  musicButton.addEventListener('mouseover', () => lineSet('none'));
  musicButton.addEventListener('mouseout', () => lineSet('line-through'));
}

function toInstruction(){
  instruction.style.display = "flex";
  startBox.style.display = "none";
}

function backTitle(){
  instruction.style.display = "none";
  startBox.style.display = "flex";
}

// start main code

window.addEventListener('keydown',press);
window.addEventListener('keyup',release);

musicButton.addEventListener('click', musicOn);

instructionLink.addEventListener('click', toInstruction)
playFromStart.addEventListener('click', start);

back.addEventListener('click', backTitle);
playFromInstruction.addEventListener('click', start);

// end main code
