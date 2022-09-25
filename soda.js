import {
  getCustomProperty,
  setCustomProperty,
  incrementCustomProperty,
} from "./updateCustomProperty.js";

const SPEED = 0.1;
const SODA_INTERVAL_MIN = 500;
const SODA_INTERVAL_MAX = 2000;
const gameElem = document.querySelector("[data-game]");

let nextSodaTime;
export function setupSoda() {
  nextSodaTime = SODA_INTERVAL_MIN;
  document.querySelectorAll("[data-soda]").forEach((soda) => {
    soda.remove();
  });
}

export function updateSoda(delta, speedScale) {
  document.querySelectorAll("[data-soda]").forEach((soda) => {
    incrementCustomProperty(soda, "--left", delta * speedScale * SPEED * -1);
    if (getCustomProperty(soda, "--left") <= -100) {
      soda.remove();
    }
  });

  if (nextSodaTime <= 0) {
    createSoda();
    nextSodaTime = randomNumberBetween(SODA_INTERVAL_MIN, SODA_INTERVAL_MAX);
  }
  nextSodaTime -= delta;
}

export function getSodaRectangles() {
  return [...document.querySelectorAll("[data-soda]")].map((soda) => {
    return soda.getBoundingClientRect();
  });
}

function createSoda() {
  const soda = document.createElement("img");
  soda.dataset.soda = true;
  soda.src = "assets/Soda.png";
  soda.classList.add("soda");

  setCustomProperty(soda, "--left", 100);
  gameElem.append(soda);
}

function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
