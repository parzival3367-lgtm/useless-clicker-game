const button = document.getElementById("button")
let clicks = 0;
const clickCounter = document.getElementById("clicks")

function click (){
  clicks++
  clickCounter.innerHTML= clicks;
}
