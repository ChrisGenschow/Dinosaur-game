import {
  updateCharacter,
  setupCharacter,
  getCharacterRectangles,
  setCharacterDead,
} from "./character.js";
import { updateSoda, setupSoda, getSodaRectangles } from "./soda.js";

let game = document.querySelector(".game");
let character = document.querySelector(".character");
let block = document.querySelector(".block");
console.log;

const scoreElem = document.querySelector("[data-score]");
const startScreenElem = document.querySelector("[data-start-screen]");

// Eventlisteners

/*document.addEventListener("keydown", (event) => {
  //console.log("keyevent triggered",event);
  if (
    event.code === "Space" &&
    !character.classList.contains("animate") &&
    startScreenElem.classList.contains("hide")
  ) {
    console.log("Space pressed");
    jump();
  }
});*/
document.addEventListener("keydown", handleStart, { once: true });
/*Create jump function*/
/*function jump() {
  //Tilføj Jump class fra css til character elementet
  if (character.classList != "animate") {
    character.classList.add("animate");
  }
  //Fjern Jump class fra character efter et delay, så man kan hoppe igen
  setTimeout(function () {
    character.classList.remove("animate");
    console.log("Space Pressed");
  }, 700);
}*/
//Check if your character has collided with the obstacle, if it has then alert the player, that they've died.

/*let checkDead = setInterval(function () {
  let characterTop = parseInt(
    window.getComputedStyle(character).getPropertyValue("top")
  );
  let blockLeft = parseInt(
    window.getComputedStyle(block).getPropertyValue("left")
  );
  if (blockLeft < 30 && blockLeft > 0 && characterTop >= 325) {
    block.style.animation = "none";
    //I stedet for en alert så skal vi have lavet en "You died"-text, som skal komme frem lidt ligesom startScreenElem gør
    alert("You Died");
  }
}, 10);*/

/*This will be replaced at some point, so that the alert won't be a thing, but the gamebox, character and obstacle will all
fade out, and you're left with a black screen.*/
//A red "You Died" text will fade-in and flow up
//A retry button will be created.
//Pressing the retry button makes all elements on the site reset.

//update time, so that we can use it for obstacles and a background if we wanted it.
let lastTime;
let speedScale;
let score;
function update(time) {
  if (lastTime == null) {
    lastTime = time;
    window.requestAnimationFrame(update);
    return;
  }
  const delta = time - lastTime;

  updateCharacter(delta, speedScale);
  updateSoda(delta, speedScale);
  updateScore(delta);
  //console.log(delta);
  if (checkDeath()) return handleLose();

  lastTime = time;
  window.requestAnimationFrame(update);
}

function checkDeath() {
  const characterRectangle = getCharacterRectangles();
  return getSodaRectangles().some((rect) =>
    isCollision(rect, characterRectangle)
  );
}

function isCollision(rect1, rect2) {
  return (
    rect1.left < rect2.right &&
    rect1.top < rect2.bottom &&
    rect1.right > rect2.left &&
    rect1.bottom > rect2.top
  );
}
//Make a function, which updates your score based on the amount of time played.
function updateScore(delta) {
  //Giv spilleren 1 point hvert sekund
  score += delta * 0.001;
  //Undgå decimaler.
  scoreElem.textContent = Math.floor(score);
}
function handleLose() {
  setCharacterDead();
  setTimeout(() => {
    document.addEventListener("keydown", handleStart, { once: true });
    startScreenElem.classList.remove("hide");
  }, 100);
}

//Lav en function, så spillet begynder at køre, når man trykker på en knap.
function handleStart() {
  lastTime = null;
  score = 0;
  speedScale = 1;
  setupCharacter();
  setupSoda();
  startScreenElem.classList.add("hide");
  scoreElem.classList.remove("hide");
  block.classList.remove("hide");
  window.requestAnimationFrame(update);
}
