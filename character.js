import {
  getCustomProperty,
  incrementCustomProperty,
  setCustomProperty,
} from "./updateCustomProperty.js";

const characterElem = document.querySelector("[data-character]");
const JUMP_SPEED = 0.45;
const GRAVITY = 0.0015;

let isJumping;
let yVelocity;

export function setupCharacter() {
  isJumping = false;
  yVelocity = 0;
  setCustomProperty(characterElem, "--bottom", 0);
  document.removeEventListener("keydown", onJump);
  document.addEventListener("keydown", onJump);
}

export function updateCharacter(delta, speedScale) {
  handleJump(delta);
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
