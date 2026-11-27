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
const datalist = document.getElementById('saved-usernames');

let savedUsernames = JSON.parse(localStorage.getItem('usernames')) || [];
let username = localStorage.getItem('lastUsername') || '';

function updateDropdown() {
  datalist.innerHTML = '';
  savedUsernames.forEach((name) => {
    const option = document.createElement('option');
    option.value = name;
    datalist.appendChild(option);
  });
}

if (username) {
  usernameSpan.textContent = username;
  usernameInput.value = username;
}
updateDropdown();

function submitUsername() {
  const inputVal = usernameInput.value.trim();

  if (!inputVal) {
    username = '';
    usernameSpan.textContent = 'Guest';
    localStorage.removeItem('lastUsername');
    usernameInput.blur();
    return;
  }

  const existingUser = savedUsernames.find(
    (name) => name.toLowerCase() === inputVal.toLowerCase()
  );

  if (existingUser) {
    username = existingUser;
  } else {
    username = inputVal;
    savedUsernames.push(username);
    localStorage.setItem('usernames', JSON.stringify(savedUsernames));
    updateDropdown(); // Refresh dropdown with the new name
  }

  localStorage.setItem('lastUsername', username);
  usernameSpan.textContent = username;
  usernameInput.value = username;
  usernameInput.blur();
}

usernameInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    submitUsername();
  }
});

usernameInput.addEventListener('change', submitUsername);
