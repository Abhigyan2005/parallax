let horse = document.querySelector(".horse");
let grass = document.querySelector(".grass");
let desert = document.querySelector(".desert");
let sun = document.querySelector(".sun");
let heading = document.querySelector(".heading");
let sky = document.querySelector(".one");
let starsContainer = document.querySelector(".stars-container");

document.addEventListener('click', function() {
  const audio = document.getElementById('backgroundAudio');
  audio.play().catch(error => {
    console.error("Error playing audio:", error);
  });
});



window.addEventListener("scroll", () => {
  let value = window.scrollY;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const starStopPoint = maxScroll * 0.6;

  const sunStopPoint = maxScroll * 0.29; 
  const desertStopPoint = maxScroll * 0.3; 
  const grassStopPoint = maxScroll * 0.4; 
  const horseStopPoint = maxScroll * 1.9; 

  
  heading.style.marginTop = Math.min(value * 1.5, maxScroll) + "px";
  sun.style.marginTop = Math.min(value * 3.5, sunStopPoint) + "px";
  desert.style.marginTop = Math.max(value * -1.5, -desertStopPoint) + "px";
  grass.style.marginTop = Math.max(value * -1.5, -grassStopPoint) + "px";
  horse.style.marginRight = Math.min(value * 4.5, horseStopPoint) + "px";

  const scrollPercentage = (value / maxScroll) * 4;
  const clampedPercentage = Math.min(Math.max(scrollPercentage, 0), 1);

  const sunsetColors = {
    start: { r: 255, g: 126, b: 95 },
    end: { r: 212, g: 45, b: 15 },
  };

  const nightColors = {
    start: { r: 26, g: 35, b: 47 },
    end: { r: 10, g: 15, b: 30 },
  };

  const interpolateColor = (startColor, endColor, percentage) => {
    const r = Math.round(
      startColor.r + (endColor.r - startColor.r) * percentage
    );
    const g = Math.round(
      startColor.g + (endColor.g - startColor.g) * percentage
    );
    const b = Math.round(
      startColor.b + (endColor.b - startColor.b) * percentage
    );
    return `rgb(${r}, ${g}, ${b})`;
  };

  const gradientStart = interpolateColor(
    sunsetColors.start,
    nightColors.start,
    clampedPercentage
  );
  const gradientEnd = interpolateColor(
    sunsetColors.end,
    nightColors.end,
    clampedPercentage
  );

  sky.style.background = `linear-gradient(to top, ${gradientStart}, ${gradientEnd})`;

  if (value <= starStopPoint) {
    createStars(clampedPercentage);
  } else {
   
    starsContainer.innerHTML = ''; 
  }
});

function createStars(scrollPercentage) {

  const numStars = Math.floor(scrollPercentage * 100);
  starsContainer.innerHTML = '';

  for (let i = 0; i < numStars; i++) {
    const star = document.createElement('div');
    star.classList.add('star');

    const size = Math.random() * 3 + 1;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${Math.random() * 100}vw`;
    star.style.top = `${Math.random() * 100}vh`;

    const duration = Math.random() * 1.5 + 1;
    star.style.animationDuration = `${duration}s`;

    starsContainer.appendChild(star);
  }
}
