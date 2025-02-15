const canvas = document.getElementById("confettiCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

export function showLetter() {
  document.getElementById("player").src = "https://www.youtube.com/embed/sElE_BfQ67s?autoplay=1";

  const modalHTML = document.getElementById("running-modal");

  modalHTML.style.display = "none";
  createConfetti();
  bounceLetter();
}

function createConfetti() {
  const colors = ["#FF6B6B", "#FFD93D", "#6BCB77", "#4A90E2", "#F06292"];
  const confettiParticles = [];

  for (let i = 0; i < 400; i++) {
    confettiParticles.push({
      x: canvas.width / 2,
      y: canvas.height * 0.3,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 10 + 5,
      velocityX: Math.random() * 6 - 3,
      velocityY: Math.random() * 6 - 4.5,
    });
  }

  animateConfetti(confettiParticles);
}

function animateConfetti(particles) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle, index) => {
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, 2 * Math.PI);
    ctx.fillStyle = particle.color;
    ctx.fill();

    particle.x += particle.velocityX;
    particle.y += particle.velocityY;
    particle.velocityY += 0.05;

    if (particle.y > canvas.height + 100 || particle.y < -100 || particle.x > canvas.width + 100 || particle.x < -100) {
      particles.splice(index, 1);
    }
  });

  if (particles.length > 0) {
    requestAnimationFrame(() => animateConfetti(particles));
  }
}

function bounceLetter() {
  const letterHTML = document.getElementById("letter");
  let posY = -1500;
  let velocity = 0;
  let gravity = 0.98;
  let bounceFactor = 0.7;
  let isBouncing = true;

  function animate() {
    if (isBouncing) {
      velocity += gravity;
      posY += velocity;

      if (posY + letterHTML.clientHeight >= window.innerHeight) {
        posY = window.innerHeight - letterHTML.clientHeight;
        velocity *= -bounceFactor;

        if (Math.abs(velocity) < 1) {
          isBouncing = false;
          velocity = 0;
        }
      }

      letterHTML.style.top = posY + "px";

      requestAnimationFrame(animate);
    } else {
      letterHTML.setAttribute("done", "");
      letterHTML.setAttribute("style", `top: ${window.innerHeight * 0.04}px`);

      setTimeout(() => {
        letterHTML.children[0].style.opacity = 1;
      }, 1500);
    }
  }

  setTimeout(() => {
    animate();
  }, 750);
}
