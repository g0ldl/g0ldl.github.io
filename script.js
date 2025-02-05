//Loading screen inspired by @juxtopposed
const progressBar = document.getElementById('progress-bar');
const counter = document.getElementById('progress-counter');
const loadingScreen = document.getElementById('loading-screen');
const heroSection = document.querySelector('.hero');

function updateProgress(progress) {
  progressBar.style.width = `${progress}%`;
  counter.textContent = `${progress}%`;
}

updateProgress(0);
document.body.style.overflow = 'hidden';

document.addEventListener('DOMContentLoaded', () => {
  let progress = 0;
  const increment = 5;

  const updateLoop = setInterval(() => {
    if (progress >= 100) {
      clearInterval(updateLoop);
      setTimeout(() => {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.height = '0';
        heroSection.style.opacity = '1';
        setTimeout(() => {
          window.addEventListener('wheel', handleScroll);
          document.body.style.overflowY = 'scroll';
        }, 700);
      }, 0);
    }
    updateProgress(progress);
    progress += increment;
  }, 100);
});

//Custom cursor inspired by Rahul Chaudhary
const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', e => {
    cursor.setAttribute("style", "top: " + (e.pageY - 5) + "px; left: " + (e.pageX - 5) + "px;")
});

document.addEventListener('click', e => {
    cursor.classList.add("expand");
    setTimeout(() => {
        cursor.classList.remove("expand");
    }, 500);
});

//Contact page
const textElements = gsap.utils.toArray('.text');

textElements.forEach(text => {
  gsap.to(text, {
    backgroundSize: '100%',
    ease: 'none',
    scrollTrigger: {
      trigger: text,
      start: 'center 80%',
      end: 'center 20%',
      scrub: true,
    },
  });
});

//Welcome morph
const elts = {
  text1: document.getElementById("morph1"),
  text2: document.getElementById("morph2")
};

const texts = [
  "",
  "",
  "Welcome",
  "to my",
  "website",
  "I hope",
  "my curation",
  "is pleasing",
  "to you."
];

const morphTime = 1;
const cooldownTime = 0.25;

let textIndex = texts.length - 1;
let time = new Date();
let morph = 0;
let cooldown = cooldownTime;

elts.text1.textContent = texts[textIndex % texts.length];
elts.text2.textContent = texts[(textIndex + 1) % texts.length];

function doMorph() {
  morph -= cooldown;
  cooldown = 0;

  let fraction = morph / morphTime;

  if (fraction > 1) {
      cooldown = cooldownTime;
      fraction = 1;
  }

  setMorph(fraction);
}

function setMorph(fraction) {
  elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
  elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

  fraction = 1 - fraction;
  elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
  elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

  elts.text1.textContent = texts[textIndex % texts.length];
  elts.text2.textContent = texts[(textIndex + 1) % texts.length];
}

function doCooldown() {
  morph = 0;

  elts.text2.style.filter = "";
  elts.text2.style.opacity = "100%";

  elts.text1.style.filter = "";
  elts.text1.style.opacity = "0%";
}

function animate() {
  requestAnimationFrame(animate);

  let newTime = new Date();
  let shouldIncrementIndex = cooldown > 0;
  let dt = (newTime - time) / 1000;
  time = newTime;

  cooldown -= dt;

  if (cooldown <= 0) {
      if (shouldIncrementIndex) {
          textIndex++;
      }

      doMorph();
  } else {
      doCooldown();
  }
}

animate();
