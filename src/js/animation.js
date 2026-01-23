import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initAnimation() {
    const canvas = document.getElementById("hero-canvas");
    if (!canvas) return;
    const context = canvas.getContext("2d");

    // IMPORTANT: Set this to exactly how many images are in your folder
    const frameCount = 121;
    // Number of frames to load before showing the site
    const criticalFrameCount = 30;

    const currentFrame = index => (
        `assets/frames/frame_${index.toString().padStart(3, '0')}.jpg`
    );

    const images = [];
    const airbnb = { frame: 0 };

    // Initialize image array
    for (let i = 0; i < frameCount; i++) {
        images[i] = new Image();
    }

    // --- Loading Logic ---
    let imagesLoadedCount = 0;
    let loadingStarted = false;
    const loaderProgress = document.getElementById('loader-progress');
    const loader = document.getElementById('loader');

    const updateProgress = () => {
        imagesLoadedCount++;
        const totalProgress = Math.min(Math.round((imagesLoadedCount / frameCount) * 100), 100);

        if (loaderProgress) {
            loaderProgress.innerText = `${totalProgress}%`;
        }

        // Transition out as soon as critical frames are ready
        if (imagesLoadedCount >= criticalFrameCount) {
            if (loader && loader.style.display !== 'none') {
                hideLoader();
            }
            // Start the remaining batch once
            if (!loadingStarted) {
                loadingStarted = true;
                loadBatch(criticalFrameCount, frameCount);
            }
        }
    };

    const loadBatch = (startIndex, endIndex) => {
        for (let i = startIndex; i < Math.min(endIndex, frameCount); i++) {
            images[i].onload = () => {
                updateProgress();
                if (i === 0) render(); // Render the first frame as soon as it's ready
            };
            images[i].onerror = () => {
                console.error(`Failed to load frame ${i}`);
                updateProgress();
            };
            images[i].src = currentFrame(i);
        }
    };

    const hideLoader = () => {
        if (loader && loader.style.display !== 'none') {
            gsap.to(loader, {
                opacity: 0,
                duration: 0.8,
                ease: "power2.inOut",
                onComplete: () => {
                    loader.style.display = 'none';
                }
            });
        }
        render();
    };

    // Start loading the first critical batch
    loadBatch(0, criticalFrameCount);

    // Safety timeout: if it's still showing after 5 seconds, hide it anyway
    // This prevents the user from being stuck if some images fail to load
    setTimeout(() => {
        if (loader && loader.style.display !== 'none') {
            console.warn("Loader safety timeout triggered.");
            hideLoader();
            // Also ensure the second batch starts if it hasn't
            if (!loadingStarted) {
                loadingStarted = true;
                loadBatch(criticalFrameCount, frameCount);
            }
        }
    }, 5000);


    // --- Animation Logic ---

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
        y: 50,
        opacity: 0,
        letterSpacing: "1em",
        scrollTrigger: {
            trigger: ".section:first-child",
            start: "top top",
            end: "60% top",
            scrub: true
        }
    });

    // Initial Render is now handled in the loadBatch logic for image 0
    render();

    function render() {
        const frameIndex = Math.min(airbnb.frame, frameCount - 1);
        const img = images[frameIndex];
        // Only draw if image is loaded, otherwise keep previous frame or clear
        if (!img || !img.complete || !img.naturalWidth) return;

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

        // Implementation of 50% horizontal wrap-around shift
        // Part 1: Draw the right half of the image on the left
        context.drawImage(
            img,
            img.width / 2, 0, img.width / 2, img.height,
            offsetX, offsetY, drawWidth / 2, drawHeight
        );

        // Part 2: Draw the left half of the image on the right
        context.drawImage(
            img,
            0, 0, img.width / 2, img.height,
            offsetX + drawWidth / 2, offsetY, drawWidth / 2, drawHeight
        );
    }

    window.addEventListener("resize", render);
}
