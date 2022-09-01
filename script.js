let character = document.getElementsByClassName("character");
let block = document.getElementsByClassName("block");
/*Create jump function*/
function jump() {
  character.classList.add("animate");
  setTimeout(function () {
    character.classList.remove("animate");
  }, 500);
}
