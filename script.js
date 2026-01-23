const canvas = document.getElementById("hero-canvas");
const context = canvas.getContext("2d");

// IMPORTANT: Set this to exactly how many images are in your folder
const frameCount = 120; 

const currentFrame = index => (
  `./assets/frames/frame_${(index + 1).toString().padStart(3, '0')}.jpg`
);

const images = [];
const airbnb = { frame: 0 };

// Preload images
for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = currentFrame(i);
  images.push(img);
}

// 1. MASTER ANIMATION: Scrubber for the frames
gsap.to(airbnb, {
  frame: frameCount - 1,
  snap: "frame",
  ease: "none",
  scrollTrigger: {
    scrub: 0.5,
    trigger: "#main-content",
    start: "top top",
    end: "bottom bottom",
  },
  onUpdate: render 
});

// 2. LOGO FADE: Fixes the disappearing logo issue
// We only target the FIRST content box (the logo)
// gsap.to(".section:first-child .content-box", {
//     opacity: 0,
//     y: -100,
//     scale: 0.9,
//     scrollTrigger: {
//         trigger: ".section:first-child",
//         start: "top top",
//         end: "80% top",
//         scrub: true
//     }
// });

// // 3. CONTENT BOXES: General fade-in for other sections
// gsap.utils.toArray(".section:not(:first-child) .content-box").forEach((box) => {
//     gsap.fromTo(box, 
//         { opacity: 0, y: 50 }, 
//         { 
//             opacity: 1, 
//             y: 0, 
//             scrollTrigger: {
//                 trigger: box,
//                 start: "top 90%",
//                 end: "top 40%",
//                 scrub: true
//             }
//         }
//     );
// });
// Enhanced Logo + Tagline Exit
gsap.to(".section:first-child .content-box img", {
    y: -50,
    opacity: 0,
    scrollTrigger: {
        trigger: ".section:first-child",
        start: "top top",
        end: "60% top",
        scrub: true
    }
});

gsap.to(".section:first-child .content-box p, .section:first-child .content-box div", {
    y: 50, // The tagline moves DOWN while the logo moves UP
    opacity: 0,
    letterSpacing: "1em", // The letters physically drift apart as you scroll
    scrollTrigger: {
        trigger: ".section:first-child",
        start: "top top",
        end: "60% top",
        scrub: true
    }
});

// Initial Render
images[0].onload = render;

function render() {
    const frameIndex = Math.min(airbnb.frame, frameCount - 1);
    const img = images[frameIndex];
    if (!img || !img.complete) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const imgRatio = img.width / img.height;
    const canvasRatio = canvas.width / canvas.height;
    let drawWidth, drawHeight, offsetX, offsetY;

    if (canvasRatio > imgRatio) {
        drawWidth = canvas.width;
        drawHeight = canvas.width / imgRatio;
        offsetX = 0;
        offsetY = (canvas.height - drawHeight) / 2;
    } else {
        drawWidth = canvas.height * imgRatio;
        drawHeight = canvas.height;
        offsetX = (canvas.width - drawWidth) / 2;
        offsetY = 0;
    }

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
}

window.addEventListener("resize", render);
window.addEventListener('load', () => {
    document.getElementById('loader').style.display = 'none';
    render(); // Ensure first frame shows immediately
});