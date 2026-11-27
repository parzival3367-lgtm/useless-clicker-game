const clickCounter = document.getElementById("clicks");
const cpsDisplay = document.getElementById("CPS");
const bestCpsDisplay = document.getElementById("bestCPS");

const usernameInput = document.getElementById('username');
const usernameSpan = document.getElementById('username-span');
const datalist = document.getElementById('saved-usernames');

// Stores users as: { "Username": { bestCps: 10, bestCpsMult: 2 } }
let userStats = JSON.parse(localStorage.getItem('userStats')) || {};
let username = localStorage.getItem('lastUsername') || '';

let clicks = 0;
let cps = 0;
let bestCps = 0;
let bestCpsMult = 1;

function clickButton() {
    clicks++;
    cps++;
    clickCounter.textContent = clicks;
}

function updateBestCpsUI() {
    if (bestCps === 0) {
        bestCpsDisplay.textContent = '0';
    } else if (bestCpsMult > 1) {
        bestCpsDisplay.textContent = `${bestCps} x ${bestCpsMult}`;
    } else {
        bestCpsDisplay.textContent = bestCps;
    }
}

function saveUserStats() {
    if (username) {
        userStats[username] = { bestCps, bestCpsMult };
        localStorage.setItem('userStats', JSON.stringify(userStats));
    }
}

function loadUserStats(name) {
    if (name && userStats[name]) {
        bestCps = userStats[name].bestCps || 0;
        bestCpsMult = userStats[name].bestCpsMult || 1;
    } else {
        bestCps = 0;
        bestCpsMult = 1;
    }
    updateBestCpsUI();
}

function updateDropdown() {
    datalist.innerHTML = '';
    Object.keys(userStats).forEach((name) => {
        const option = document.createElement('option');
        option.value = name;
        datalist.appendChild(option);
    });
}

// Initialize page on load
if (username) {
    usernameSpan.textContent = username;
    usernameInput.value = username;
    loadUserStats(username);
}
updateDropdown();

const CPSLoop = setInterval(() => {
    cpsDisplay.textContent = cps;

    if (cps > bestCps) {
        bestCps = cps;
        bestCpsMult = 1;
        updateBestCpsUI();
        saveUserStats();
    } else if (cps === bestCps && cps !== 0) {
        bestCpsMult++;
        updateBestCpsUI();
        saveUserStats();
    }

    cps = 0;
}, 1000);

function submitUsername() {
    const inputVal = usernameInput.value.trim();

    if (!inputVal) {
        username = '';
        usernameSpan.textContent = 'Guest';
        localStorage.removeItem('lastUsername');
        loadUserStats(''); // Resets displayed best CPS to 0 for Guest
        usernameInput.blur();
        return;
    }

    const existingUser = Object.keys(userStats).find(
        (name) => name.toLowerCase() === inputVal.toLowerCase()
    );

    if (existingUser) {
        username = existingUser;
    } else {
        username = inputVal;
        userStats[username] = { bestCps: 0, bestCpsMult: 1 };
        localStorage.setItem('userStats', JSON.stringify(userStats));
        updateDropdown();
    }

    localStorage.setItem('lastUsername', username);
    usernameSpan.textContent = username;
    usernameInput.value = username;
    loadUserStats(username); // Loads the selected user's saved best CPS
    usernameInput.blur();
}

usernameInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        submitUsername();
    }
});

usernameInput.addEventListener('change', submitUsername);
