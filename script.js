let character = document.getElementsByClassName("character");
let block = document.getElementsByClassName("block");
/*Create jump function*/
function jump() {
  /*Tilføj Jump class fra css til character elementet*/
  character.classList.add("animate");
  /*Fjern Jump class fra character efter et delay, så man kan hoppe igen*/
  setTimeout(function () {
    character.classList.remove("animate");
  }, 500);
}
