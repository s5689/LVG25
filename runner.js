import { origin, position } from "./states";

const div = document.getElementById("running-modal");
const moveSpeed = 0.4;
const detectionDistance = 300;

let targetX = parseFloat(div.style.left) || window.innerWidth / 2 - div.offsetWidth / 2;
let targetY = parseFloat(div.style.top) || window.innerHeight * 0.3 - div.offsetHeight / 2;

export function centerDiv() {
  const centerX = window.innerWidth / 2 - div.offsetWidth / 2;
  const centerY = window.innerHeight * 0.3 - div.offsetHeight / 2;
  div.style.left = `${centerX}px`;
  div.style.top = `${centerY}px`;

  // Inicializar position
  position.prevX = div.style.left;
  position.prevY = div.style.top;
  origin.x = centerX;
  origin.y = centerY;
}

function moveDivAway(event) {
  const divRect = div.getBoundingClientRect();
  const divX = divRect.left + divRect.width / 2;
  const divY = divRect.top + divRect.height / 2;

  const mouseX = event.clientX;
  const mouseY = event.clientY;

  const deltaX = mouseX - divX;
  const deltaY = mouseY - divY;

  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

  if (distance < detectionDistance) {
    const moveX = (deltaX / distance) * moveSpeed * (detectionDistance - distance);
    const moveY = (deltaY / distance) * moveSpeed * (detectionDistance - distance);

    targetX = div.offsetLeft - moveX;
    targetY = div.offsetTop - moveY;
  }

  div.style.left = `${div.offsetLeft + (targetX - div.offsetLeft) * 0.2}px`;
  div.style.top = `${div.offsetTop + (targetY - div.offsetTop) * 0.2}px`;

  if (div.offsetLeft + div.offsetWidth < 0) {
    div.style.left = `${Math.min(0, window.innerWidth / 2 - div.offsetWidth / 2)}px`;
  } else if (div.offsetLeft > window.innerWidth) {
    div.style.left = `${Math.max(window.innerWidth - div.offsetWidth, window.innerWidth / 2 - div.offsetWidth / 2)}px`;
  }

  if (div.offsetTop + div.offsetHeight < 0) {
    div.style.top = `${Math.min(0, window.innerHeight * 0.3 - div.offsetHeight / 2)}px`;
  } else if (div.offsetTop > window.innerHeight) {
    div.style.top = `${Math.max(window.innerHeight - div.offsetHeight, window.innerHeight * 0.3 - div.offsetHeight / 2)}px`;
  }
}

window.addEventListener("resize", (e) => {
  if (origin.runnerState) {
    centerDiv();
  }
});

document.addEventListener("mousemove", (e) => {
  if (origin.runnerState) {
    moveDivAway(e);
  }
});

centerDiv();
