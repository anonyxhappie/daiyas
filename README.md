# Daiya's Jagdish Brand

This project uses a modern web stack built with **Vite**, **Tailwind CSS**, and **GSAP**.

## Project Structure
- `public/`: Static assets (images, frames, logos). Served at root.
- `src/`: Source code.
  - `main.js`: Entry point.
  - `style.css`: Tailwind directives and custom styles.
  - `js/animation.js`: Canvas sequence and scrolling logic.
  - `js/ui.js`: Modals and interactions.
- `index.html`: Main HTML template.

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```
   The output will be in the `dist/` directory.

## Features
- **PWA Ready**: Works offline after first visit.
- **Optimized Loading**: Loads first 30 frames to unlock UI, then lazy loads the rest.
- **High Performance**: Uses Vite for bundling and minification.
