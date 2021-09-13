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
  6,
  6,
  0,
  0
);

const map2 = new Map(
  document.getElementById('map2'),
  0,
  -768,
  mapWidth,
  mapHeight,
  6,
  6,
  0,
  0
);

const map3 = new Map(
  document.getElementById('map3'),
  1024,
  -768,
  mapWidth,
  mapHeight,
  6,
  6,
  0,
  0
);

const map4 = new Map(
  document.getElementById('map4'),
  1024,
  0,
  mapWidth,
  mapHeight,
  6,
  6,
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
  6,
  6,
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
  6,
  6,
  0,
  0,
  false,
  false
);

const material = [
  map,
  map2,
  map3,
  map4,
  hero,
  enemy,
  tree,
  goal
]

const materialNumber = material.length;

const subMaterial = [
  map,
  map2,
  map3,
  map4,
  enemy,
  tree,
  goal
];

const subMaterialNumber = subMaterial.length;

const arrows = {
  ArrowLeft: false,
  ArrowRight: false,
  ArrowUp: false,
  ArrowDown: false
}


function configureDimension(object){
  object.left = object.x;
  object.top = object.y;
  object.right = object.left + object.width;
  object.bottom = object.top + object.height;
}
/*
   left, top, right, bottom: used to evaluate the positional relationship and
    contact of objects
*/

function setInitialDimension(target, targetNumber){
  let i = 0;
  while (targetNumber > i){
    configureDimension(target[i]);
    i++;
  }
}

function calculateDimension(object){
  object.x = object.x + object.dx;
  object.y = object.y + object.dy;
  object.element.style.left = object.x + "px";
  object.element.style.top = object.y + "px";
}
// moving objects by tweaking css style

function calculatePosition(target, targetNumber){
  let i = 0;
  while (targetNumber > i){
    configureDimension(target[i]);
    calculateDimension(target[i]);
    i++;
  }
}

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

function chase(subject, object){
  if(object.top > subject.top){
    object.speedY = Math.abs(object.speedY) * (-1);
  }
  else {
    object.speedY = Math.abs(object.speedY);
  }

  if(object.left > subject.left){
    object.speedX = Math.abs(object.speedX) * (-1);
  }
  else {
    object.speedX = Math.abs(object.speedX);
  }
}
/*
   reconfigure only the direction of enemy's movement
    according to the positional relationship with hero
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

function move(target, targetNumber){
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

function touching(subject, objectOne, objectTwo, objectThree){
  if(
    !(objectOne.right < subject.left ||
      subject.right < objectOne.left ||
      subject.bottom < objectOne.top ||
      objectOne.bottom < subject.top
      )
    ){
    console.log('touching');
    subject.touching = true;
    objectOne.touching = true;
  }

  else if(
    !(objectTwo.right < subject.left ||
      subject.right < objectTwo.left ||
      subject.bottom < objectTwo.top ||
      objectTwo.bottom < subject.top
      )
    ){
    console.log('touching');
    subject.touching = true;
    objectTwo.touching = true;
  }

  else if(
    !(objectThree.right < subject.left ||
      subject.right < objectThree.left ||
      subject.bottom < objectThree.top ||
      objectThree.bottom < subject.top
      )
    ){
    console.log('touching');
    subject.touching = true;
    objectThree.touching = true;
  }

  else {
    subject.touching = false;
    objectOne.touching = false;
    objectTwo.touching = false;
    objectThree.touching = false
  }
}

function colorOn(target, color){
  target.element.style.backgroundColor=color;
  target.isColored = true;
}

function colorOff(target, color){
  target.element.style.backgroundColor=color;
  target.isColored = false;
}

function jump(location){
  boomSound.removeEventListener('ended', jump);
  window.location.href = location + ".html";
}

function gameOver(target, changeColor, color, location){
  if (target.touching && !target.isColored){
    colorOn(target, changeColor);
    boomSound.addEventListener('ended',() => jump(location));
    boomSound.play();
  }
  else if(!target.touching && target.isColored){
    colorOff(target, color);
  }
}

function boom(target, changeColor, color){
  if (target.touching && !target.isColored){
    colorOn(target,changeColor);
    boomSound.play();
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

  speedInitializer(subMaterial, subMaterialNumber);

  chase(hero, enemy);
  move(subMaterial, subMaterialNumber);

  calculatePosition(subMaterial, subMaterialNumber);
  touching(hero, enemy, tree, goal);

  crash(hero,'green', 'red');
  gameOver(enemy, 'yellow', 'blue', 'defeat');
  boom(tree, 'yellow', 'green');
  gameOver(goal, 'yellow', 'orange', 'clear');

  setTimeout(draw,18 /*16*/);
}

function start(){

  document.removeEventListener('click', start);

  startScreen.remove();

  bgm.play();

  draw();

}


// start main code
setInitialDimension(material, materialNumber);

window.addEventListener('keydown',getKeysDown);
window.addEventListener('keyup',getKeysUp);

document.addEventListener('click', start);
// end main code
