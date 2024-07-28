
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
gsap.registerPlugin(ScrollTrigger);

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

//projects carousel
document.addEventListener("DOMContentLoaded", () => {
	const marquee = document.querySelector(".marquee-inner");
	const speed = 1; // Scrolling Speed
	let scrollAmount = 0;
	let isHovered = false;

	// Duplicates the content
	const marqueeContent = marquee.innerHTML;
	marquee.innerHTML += marqueeContent;

	const startScrolling = () => {
		if (!isHovered) {
			scrollAmount -= speed;
			if (Math.abs(scrollAmount) >= marquee.scrollWidth / 2) {
				scrollAmount = 0;
			}
			marquee.style.transform = `translateX(${scrollAmount}px)`;
		}
		requestAnimationFrame(startScrolling);
	};

	marquee.addEventListener("mouseover", () => {
		isHovered = true;
	});

	marquee.addEventListener("mouseout", () => {
		isHovered = false;
	});

	startScrolling();
});
