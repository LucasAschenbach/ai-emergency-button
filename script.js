const button = document.getElementById('emergencyButton');

// Movement

function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

function getDistance(x, y, targetX1, targetY1, targetWidth, targetHeight) {
  const targetX2 = targetX1 + targetWidth;
  const targetY2 = targetY1 + targetHeight;

  const distanceX = Math.max(
    x < targetX1 ? targetX1 - x : 0,
    x > targetX2 ? x - targetX2 : 0
  );
  const distanceY = Math.max(
    y < targetY1 ? targetY1 - y : 0,
    y > targetY2 ? y - targetY2 : 0
  );

  return Math.max(distanceX, distanceY)
}

function moveButton(e) {
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  const buttonRect = button.getBoundingClientRect();

  const distance = getDistance(mouseX, mouseY, buttonRect.x, buttonRect.y, buttonRect.width, buttonRect.height);
  const tolerance = 10;

  if (distance < tolerance) {
    const safeWidth = window.innerWidth - buttonRect.width;
    const safeHeight = window.innerHeight - buttonRect.height;

    let newX = buttonRect.x;
    let newY = buttonRect.y;
    while (getDistance(mouseX, mouseY, newX, newY, buttonRect.width, buttonRect.height) < tolerance) {
      newX = getRandomNumber(-safeWidth/2, safeWidth/2);
      newY = getRandomNumber(-safeHeight/2, safeHeight/2);
    }

    button.style.transform = `translate(${newX}px, ${newY}px)`;
  }
}

document.addEventListener('mousemove', moveButton);

// Timer

let timerStarted = false;
let startTime;
let timerInterval;

function updateTimer() {
  const timerElement = document.getElementById('timer');
  const elapsedTime = (Date.now() - startTime) / 1000;
  timerElement.textContent = elapsedTime.toFixed(2);
}

function startTimer(e) {
  if (!timerStarted) {
    timerStarted = true;
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 10);
    const timerElement = document.getElementById('timer');
    timerElement.removeAttribute('hidden');
  }
}

function stopTimer() {
  clearInterval(timerInterval);
  document.removeEventListener('mousemove', startTimer);
}

document.addEventListener('mousemove', startTimer);

button.addEventListener('click', () => {
  stopTimer();
});
