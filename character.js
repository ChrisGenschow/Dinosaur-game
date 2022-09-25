import {
  incrementCustomProperty,
  setCustomProperty,
  getCustomProperty,
} from "./updateCustomProperty.js";

const characterElem = document.querySelector("[data-character]");
const JUMP_SPEED = 0.65;
const GRAVITY = 0.0025;

let isJumping;
let yVelocity;

export function setupCharacter() {
  isJumping = false;
  yVelocity = 0;
  characterElem.src = "assets/player-character.png";
  setCustomProperty(characterElem, "--bottom", 0);
  document.removeEventListener("keydown", onJump);
  document.addEventListener("keydown", onJump);
}

export function updateCharacter(delta, speedScale) {
  handleJump(delta);
}

export function getCharacterRectangles() {
  return characterElem.getBoundingClientRect();
}

export function setCharacterDead() {
  characterElem.src = "assets/player-character-broken.png";
}

function handleJump(delta) {
  if (!isJumping) return;

  incrementCustomProperty(characterElem, "--bottom", yVelocity * delta);

  if (getCustomProperty(characterElem, "--bottom") <= 0) {
    setCustomProperty(characterElem, "--bottom", 0);
    isJumping = false;
  }

  yVelocity -= GRAVITY * delta;
}

function onJump(e) {
  if (e.code !== "Space" || isJumping) return;

  yVelocity = JUMP_SPEED;
  isJumping = true;
}
