// LOADING SCREEN

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

//custom cursor by Rahul Chaudhary on CodePen <3
const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', e => {
    cursor.setAttribute("style", "top: " + (e.pageY - 10) + "px; left: " + (e.pageX - 10) + "px;")
});

document.addEventListener('click', e => {
    cursor.classList.add("expand");
    setTimeout(() => {
        cursor.classList.remove("expand");
    }, 500);
});

//for contact page

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




