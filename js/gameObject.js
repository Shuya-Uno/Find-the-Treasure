import {
  Map,
  OnMapFixed,
  OnMapMovables
} from "class";

const mapWidth = 1024;
const mapHeight = 768;

const onMapWidth = 60;
const onMapHeight = 60;

const heroSpeedX = 6;
const heroSpeedY = 6;

const enemySpeedX = 3.2;
const enemySpeedY = 3.2;

const map1 = new Map(
  document.getElementById('map1'),
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

const maps = {
  center: map1,
  top: map2,
  topRight: map3,
  right: map4,
  bottomRight: map5,
  bottom: map6,
  bottomLeft: map7,
  left: map8,
  topLeft: map9
}
  
const hero = new OnMapMovables(
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

const enemy = new OnMapMovables(
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

const tree = new OnMapFixed(
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

const goal = new OnMapFixed(
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

export {
  maps,
  hero,
  enemy,
  tree,
  goal
}