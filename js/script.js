import Map from "./map.js";
import OnMap from "./onMap.js";

const mapWidth = 1024;
const mapHeight = 768;

const onMapWidth = 60;
const onMapHeight = 60;

const startScreen = document.getElementById('start-screen');

const bgm = new Audio('music/retro.mp3');
const boomSound = new Audio('music/boom.mp3');


const map = new Map(
  document.getElementById('map'),
  0,
  0,
  mapWidth,
  mapHeight,
  0,
  0
);

const map2 = new Map(
  document.getElementById('map2'),
  0,
  -768,
  mapWidth,
  mapHeight,
  0,
  0
);

const map3 = new Map(
  document.getElementById('map3'),
  1024,
  -768,
  mapWidth,
  mapHeight,
  0,
  0
);

const map4 = new Map(
  document.getElementById('map4'),
  1024,
  0,
  mapWidth,
  mapHeight,
  0,
  0
);

const hero = new OnMap(
  document.getElementById('hero'),
  300,
  300,
  onMapWidth,
  onMapHeight,
  6,
  6,
  0,
  0,
  false,
  false
);

const enemy = new OnMap(
  document.getElementById('enemy'),
  100,
  100,
  onMapWidth,
  onMapHeight,
  3.2,
  3.2,
  0,
  0,
  false,
  false
);

const tree = new OnMap(
  document.getElementById('tree'),
  400,
  400,
  onMapWidth,
  onMapHeight,
  0,
  0,
  0,
  0,
  false,
  false
);

const goal = new OnMap(
  document.getElementById('goal'),
  1600,
  -400,
  onMapWidth,
  onMapHeight,
  0,
  0,
  0,
  0,
  false,
  false
);

const whoElse = [
  map,
  map2,
  map3,
  map4,
  enemy,
  tree,
  goal
];

// whoElse: array of movable objects other than hero

const whoElseNumber = whoElse.length;

// whoElseNumber: the number of objects included in whoElse

const npc = [
  enemy,
  tree,
  goal
];

// npc: array of on-map objects other than hero

const npcNumber = npc.length;

// onMapNumber: the number of objects included in onMap

const arrows = {
  ArrowLeft: false,
  ArrowRight: false,
  ArrowUp: false,
  ArrowDown: false
}



function dimension(object){
  object.left = object.x;
  object.top = object.y;
  object.right = object.x + object.width;
  object.bottom = object.y + object.height;
}

/*
   dimension
    calculates the dimension(left,top,right,bottom) of objects

    left, top, right, bottom: used to evaluate the "positional relationship and
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
    run demension for each objects
    targets are on-map obects other than hero
     (who can have contact with hero and also move on the screen)
*/


function position(object){
  object.x = object.x + object.dx;
  object.y = object.y + object.dy;
  // reconfigure the x and y value referring to current position(x,y) and speed

  object.element.style.left = object.x + "px";
  object.element.style.top = object.y + "px";
  /*
     actually moving objects displayed on screen by tweaking css,
      referring to the reconfigured x and y's
  */
}

/*
   position
    used to actually move the objects, depending on dx,dy values
     moves objects by changing css "left, top" values
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
    calculates the actual (on-screen) positions of objects
     uses position
*/

function speedInitializer(object, objectNumber) {
  let i = 0;
  while (objectNumber > i){
    if (object[i] != enemy) {
      object[i].dx = 0;
      object[i].dy = 0;
    }
    else {
      object[i].dx = object[i].speedX;
      object[i].dy = object[i].speedY;
    }
    i++;
  }
}

/*
   speedInitializer
    resets dx and dy of objects each time draw runs,
     so that the objects don't keep accelarating (retained dx,dy everytime)
    for enemy, refers to speedX and speedY of enemy itself
     → enemy automatically moves in contrast to other on-map objects
*/

function chaser(prey, subject){
  if(subject.left > prey.left){
    subject.speedX = Math.abs(subject.speedX) * (-1);
  }
  else {
    subject.speedX = Math.abs(subject.speedX);
  }

  if(subject.top > prey.top){
    subject.speedY = Math.abs(subject.speedY) * (-1);
  }
  else {
    subject.speedY = Math.abs(subject.speedY);
  }
}

/*
   chaser
    reconfigure the direction of enemy's movement to chase (get closer to) the prey
     calculation according to the positional relationship with prey
*/

function getKeysDown(e){
  if(arrows[e.key]===false){
    arrows[e.key] = true;
  }
}
/*
   reflects the key pressed to internal manageable data
    (which is saved as object properties)
*/

function getKeysUp(e){
  if(arrows[e.key]===true){
    arrows[e.key] = false;
  }
}
// resets the internal data of the key pressed when each arrow key is released

function moveRight(object, objectNumber) {
  let i = 0;
  while (objectNumber > i) {
    object[i].dx -= hero.speedX;
    i++;
  }
}

function moveLeft(object, objectNumber) {
  let i = 0;
  while (objectNumber > i) {
    object[i].dx += hero.speedX;
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

function moveHero(target, targetNumber){
  if(arrows.ArrowRight){
    moveRight(target, targetNumber);
  }

  if(arrows.ArrowLeft){
    moveLeft(target, targetNumber);
  }

  if (arrows.ArrowUp){
    moveUp(target, targetNumber);
  }

  if (arrows.ArrowDown){
    moveDown(target, targetNumber);
  }
}
/*
   reflects the movement of hero by moving all the objects other than hero to
    the opposite direction from the key pressed
*/

function touch(subject, object){
  console.log('touching');
  subject.touching = true;
  object.touching = true;
}

function touching(subject, objectOne, objectTwo, objectThree){
  if(
    !(objectOne.right < subject.left ||
      subject.right < objectOne.left ||
      subject.bottom < objectOne.top ||
      objectOne.bottom < subject.top
    )
  ){
    touch(subject,objectOne);
  }

  else if(
    !(
      objectTwo.right < subject.left ||
      subject.right < objectTwo.left ||
      subject.bottom < objectTwo.top ||
      objectTwo.bottom < subject.top
    )
  ){
    touch(subject, objectTwo);
  }

  else if(
    !(objectThree.right < subject.left ||
      subject.right < objectThree.left ||
      subject.bottom < objectThree.top ||
      objectThree.bottom < subject.top
    )
  ){
    touch(subject, objectThree)
  }

  else {
    subject.touching = false;
    objectOne.touching = false;
    objectTwo.touching = false;
    objectThree.touching = false
  }
}

function colorOn(target, color){
  target.element.style.backgroundColor = color;
  target.isColored = true;
}

function colorOff(target, color){
  target.element.style.backgroundColor = color;
  target.isColored = false;
}

function jump(location){
  boomSound.removeEventListener('ended', jump);
  window.location.href = location + ".html";
}

function gameOver(target, changeColor, color, location){
  if (target.touching && !target.isColored){
    colorOn(target, changeColor);
    // boomSound.addEventListener('ended',() => jump(location));
    // boomSound.play();
  }
  else if(!target.touching && target.isColored){
    colorOff(target, color);
  }
}

function boom(target, changeColor, color){
  if (target.touching && !target.isColored){
    colorOn(target,changeColor);
    // boomSound.play();
  }
  else if(!target.touching && target.isColored){
    colorOff(target, color);
  }
}

function crash(target, changeColor, color){
  if (target.touching && !target.isColored){
    colorOn(target, changeColor);
  }
  else if(!target.touching && target.isColored){
    colorOff(target, color);
  }
}

function draw(){

  speedInitializer(whoElse, whoElseNumber);

  chaser(hero, enemy);
  moveHero(whoElse, whoElseNumber);

  setDimension(npc, npcNumber);
  setPosition(whoElse, whoElseNumber);
  touching(hero, enemy, tree, goal);

  crash(hero,'green', 'red');
  gameOver(enemy, 'yellow', 'blue', 'defeat');
  boom(tree, 'yellow', 'green');
  gameOver(goal, 'yellow', 'orange', 'clear');

  setTimeout(draw,18);
}

function start(){

  document.removeEventListener('click', start);

  startScreen.remove();

  // bgm.play();

  draw();

}

// start main code

window.addEventListener('keydown',getKeysDown);
window.addEventListener('keyup',getKeysUp);

document.addEventListener('click', start);
// end main code
