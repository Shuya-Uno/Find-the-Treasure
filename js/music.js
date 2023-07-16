const musicButton = document.getElementById('music-button');

const bgm = new Audio('music/retro.mp3');
/*
   Creates HTMLAudioElement by new Audio(),
    that is controllable in many aspects with properties
*/

bgm.volume = 0;
bgm.loop = true;

const soundEffect = {
    boom: new Audio('music/boom.mp3'),
    bush: new Audio('music/bush.mp3'),
    treasure: new Audio('music/treasure.mp3')
}

soundEffect.boom.volume = 0;
soundEffect.bush.volume = 0;
soundEffect.treasure.volume = 0;


function setColor(color){
  musicButton.style.color = color;
}

function lineThrough(condition){
  musicButton.style.textDecoration = condition;
}

function musicOn(){
  bgm.volume = 0.5;
  soundEffect.boom.volume = 1;
  soundEffect.bush.volume = 1;
  soundEffect.treasure.volume = 1;

  musicButton.style.color = "blue";
  musicButton.style.textDecoration = "none";

  musicButton.removeEventListener('click', musicOn);
  musicButton.addEventListener('click', musicOff);

  musicButton.removeEventListener('mouseover', () => setColor('blue'));
  musicButton.removeEventListener('mouseout', () => setColor('#fff'));
  musicButton.addEventListener('mouseover', () => setColor('#fff'));
  musicButton.addEventListener('mouseout', () => setColor('blue'));

  musicButton.removeEventListener('mouseover', () => lineThrough('none'));
  musicButton.removeEventListener('mouseout', () => lineThrough('line-through'));
  musicButton.addEventListener('mouseover', () => lineThrough('line-through'));
  musicButton.addEventListener('mouseout', () => lineThrough('none'));
}

function musicOff(){
  bgm.volume = 0;
  soundEffect.boom.volume = 0;
  soundEffect.bush.volume = 0;
  soundEffect.treasure.volume = 0;

  musicButton.style.color = "#fff";
  musicButton.style.textDecoration = "line-through";

  musicButton.removeEventListener('click', musicOff);
  musicButton.addEventListener('click', musicOn);

  musicButton.removeEventListener('mouseover', () => setColor('#fff'));
  musicButton.removeEventListener('mouseout', () => setColor('blue'));
  musicButton.addEventListener('mouseover', () => setColor('blue'));
  musicButton.addEventListener('mouseout', () => setColor('#fff'));

  musicButton.removeEventListener('mouseover', () => lineThrough('line-through'));
  musicButton.removeEventListener('mouseout', () => lineThrough('none'));
  musicButton.addEventListener('mouseover', () => lineThrough('none'));
  musicButton.addEventListener('mouseout', () => lineThrough('line-through'));
}


export {
  musicButton,
  bgm,
  soundEffect,
  setColor,
  lineThrough,
  musicOn,
  musicOff
}