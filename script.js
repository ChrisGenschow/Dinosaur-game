let game = document.querySelector(".game");
let character = document.querySelector(".character");
let block = document.querySelector(".block");
console.log;

// Eventlisteners
document.addEventListener("keydown", (event) => {
  //console.log("keyevent triggered",event);
  if (event.code === "Space") {
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
  }, 700);
}

var checkDead = setInterval(function () {
  var characterTop = parseInt(
    window.getComputedStyle(character).getPropertyValue("top")
  );
  var blockLeft = parseInt(
    window.getComputedStyle(block).getPropertyValue("left")
  );
  if (blockLeft < 60 && blockLeft > 0 && characterTop >= 284) {
    block.style.animation = "none";
    alert("You Died");
  }
}, 10);
