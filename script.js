const canvas = document.getElementById("hero-canvas");
const context = canvas.getContext("2d");

canvas.width = 1158;
canvas.height = 770;

const frameCount = 147; // Change to your actual number of images
const currentFrame = index => (
  `./assets/hero_frames/frame_${(index + 1).toString().padStart(3, '0')}.jpg`
);

const images = [];
const airbnb = {
  frame: 0
};

// Preload images
for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = currentFrame(i);
  images.push(img);
}

// Start Animation after images load
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
  onUpdate: render // render newly update frame
});

images[0].onload = render;

// function render() {
//   context.clearRect(0, 0, canvas.width, canvas.height);
//   context.drawImage(images[airbnb.frame], 0, 0);
// }
function render() {
    if (!images[airbnb.frame]) return;

    const img = images[airbnb.frame];
    
    // 1. Set canvas internal resolution to match the window size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // 2. Calculate "Cover" math
    const imgRatio = img.width / img.height;
    const canvasRatio = canvas.width / canvas.height;
    
    let drawWidth, drawHeight, offsetX, offsetY;

    if (canvasRatio > imgRatio) {
        // Window is wider than the image
        drawWidth = canvas.width;
        drawHeight = canvas.width / imgRatio;
        offsetX = 0;
        offsetY = (canvas.height - drawHeight) / 2;
    } else {
        // Window is taller than the image
        drawWidth = canvas.height * imgRatio;
        drawHeight = canvas.height;
        offsetX = (canvas.width - drawWidth) / 2;
        offsetY = 0;
    }

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
}
// 3. Re-render if the user resizes their window
window.addEventListener("resize", render);
// Hide loader
window.addEventListener('load', () => {
    document.getElementById('loader').style.display = 'none';
});

// Fade in the content boxes as they enter the view
gsap.utils.toArray(".content-box").forEach((box) => {
    gsap.fromTo(box, 
        { opacity: 0, y: 50 }, 
        { 
            opacity: 1, 
            y: 0, 
            duration: 1,
            scrollTrigger: {
                trigger: box,
                start: "top 80%", // Starts animation when box is 80% down the screen
                end: "top 50%",
                scrub: true
            }
        }
    );
});