let horse = document.querySelector(".horse");
let grass = document.querySelector(".grass");
let desert = document.querySelector(".desert");
let sun = document.querySelector(".sun");
let heading = document.querySelector(".heading");
let sky = document.querySelector(".one");
let starsContainer = document.querySelector(".stars-container")

document.addEventListener('click', function() {
    const audio = document.getElementById('backgroundAudio');
    audio.play().catch(error => {
      console.error("Error playing audio:", error);
    });
  });
  
window.addEventListener("scroll", () => {
  let value = window.scrollY;

  heading.style.marginTop = value * 1.5 + "px";
  sun.style.marginTop = value * 3.5 + "px";
  desert.style.marginTop = value * -1.5 + "px";
  grass.style.marginTop = value * -1.5 + "px";
  horse.style.marginRight = value * 4.5 + "px";

   const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

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

   // Create and animate stars based on scroll
  createStars(clampedPercentage);
});


function createStars(scrollPercentage) {
  // Create a certain number of stars based on scroll percentage
  const numStars = Math.floor(scrollPercentage * 100); // Number of stars increases with scroll
  starsContainer.innerHTML = ''; // Clear previous stars

  for (let i = 0; i < numStars; i++) {
    const star = document.createElement('div');
    star.classList.add('star');
    
    // Randomize position
    const size = Math.random() * 3 + 1; // Random size for stars
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${Math.random() * 100}vw`; // Random x position (in viewport width)
    star.style.top = `${Math.random() * 100}vh`; // Random y position (in viewport height)
    
    // Randomize twinkling speed (animation duration)
    const duration = Math.random() * 1.5 + 1; // Duration between 1s and 2.5s
    star.style.animationDuration = `${duration}s`;

    starsContainer.appendChild(star);
  }
}
