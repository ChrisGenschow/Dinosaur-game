let game = document.querySelector(".game");
let character = document.querySelector(".character");
let block = document.querySelector(".block");
console.log;

// Eventlisteners
document.addEventListener("keydown", (event) => {
  //console.log("keyevent triggered",event);
  if (event.code === "Space" && !character.classList.contains("animate")) {
    console.log("Space pressed");
    jump();
  }
});

/*Create jump function*/
function jump() {
  /*Tilføj Jump class fra css til character elementet*/
  if (character.classList != "animate") {
    character.classList.add("animate");
  }
  /*Fjern Jump class fra character efter et delay, så man kan hoppe igen*/
  setTimeout(function () {
    character.classList.remove("animate");
    console.log("Space Pressed");
  }, 700);
}

let checkDead = setInterval(function () {
  let characterTop = parseInt(
    window.getComputedStyle(character).getPropertyValue("top")
  );
  let blockLeft = parseInt(
    window.getComputedStyle(block).getPropertyValue("left")
  );
  if (blockLeft < 60 && blockLeft > 0 && characterTop >= 284) {
    block.style.animation = "none";
    alert("You Died");
  }
}, 10);

let lastTime;
function update(time) {
  if (lastTime == null) {
    lastTime = time;
    window.requestAnimationFrame(update);
    return;
  }
  const delta = time - lastTime;
  console.log(delta);

  lastTime = time;
  window.requestAnimationFrame(update);
}
window.requestAnimationFrame(update);
