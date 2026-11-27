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

const usernameInput = document.getElementById('username');
const usernameSpan = document.getElementById('username-span');

let username = '';

function submitUsername() {
  username = usernameInput.value.trim();
  usernameSpan.textContent = username || 'Guest';
  usernameInput.blur();
}

usernameInput.addEventListener('input', () => {
  username = usernameInput.value.trim();
  usernameSpan.textContent = username || 'Guest';
});

usernameInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    submitUsername();
  }
});

window.addEventListener('keydown', (e) => {
  if (
    (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'i') ||
    (e.metaKey && e.altKey && e.key.toLowerCase() === 'i')
  ) {
    e.preventDefault();
  }
});
