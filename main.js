const button = document.getElementById("button");
let clicks = 0;
const clickCounter = document.getElementById("clicks");
const cpsDisplay = document.getElementById("CPS");
const bestCpsDisplay = document.getELementById("bestCPS");
let bestCps = 0;
let cps = 0;

function clickButton (){
  clicks++
  cps++
  clickCounter.innerHTML= clicks;
}

const CPSLoop = setInterval(() => {
  cpsDisplay.innerHTML = cps;
  cps = 0;
}, 1000);
