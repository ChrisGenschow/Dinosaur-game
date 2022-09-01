let game = document.querySelector(".game");
let character = document.querySelector(".character");
let block = document.querySelector(".block");
console.log;

// Eventlisteners
document.addEventListener('keyup', event => {
  console.log("keyevent triggered",event);
  if (event.code === 'Space') {
    console.log('Space pressed');
    jump();
  }
})

/*Create jump function*/
function jump() {
  /*Tilføj Jump class fra css til character elementet*/
  character.classList.add("animate");
  /*Fjern Jump class fra character efter et delay, så man kan hoppe igen*/
  setTimeout(function () {
    character.classList.remove("animate");
  }, 500);
}
