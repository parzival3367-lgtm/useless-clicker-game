const clickCounter = document.getElementById("clicks");
const cpsDisplay = document.getElementById("CPS");
const bestCpsDisplay = document.getElementById("bestCPS");

let clicks = 0;
let cps = 0;
let bestCps = 0;
let bestCpsMult = 1;

function clickButton() {
  clicks++;
  cps++;
  clickCounter.textContent = clicks;
}

const CPSLoop = setInterval(() => {
  cpsDisplay.textContent = cps;

  if (cps > bestCps) {
    bestCps = cps;
    bestCpsMult = 1;
    bestCpsDisplay.textContent = bestCps;
  } else if (cps === bestCps && cps !== 0) {
    bestCpsMult++;
    bestCpsDisplay.textContent = `${bestCps} x ${bestCpsMult}`;
  }

  cps = 0;
}, 1000);
