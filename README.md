# 🍸 Velvet Pour — Animated Cocktail Landing Page

A modern, motion-driven cocktail landing page built with **React**, **Vite**, **Tailwind CSS**, and **GSAP**. It features a scroll-synced hero video, parallax foliage, animated section reveals, an interactive cocktail menu slider, and a branded preloader.

> Brand: **Velvet Pour** · Hero: **MOJITO**

---

## ✨ Features

- **Branded preloader** — a full-screen intro with a `0 → 100%` counter that waits for the hero video, custom font, and images to load, then slides away to reveal the page. `ScrollTrigger.refresh()` runs on completion so every scroll animation is calibrated against the final layout.
- **Scroll-synced hero video** — the hero video is scrubbed frame-by-frame as you scroll, pinned in place via GSAP ScrollTrigger.
- **SplitText headings** — the hero title and paragraphs animate in character-by-character and line-by-line.
- **Parallax foliage** — decorative leaves drift in opposite directions on scroll across the hero, cocktails, and menu sections.
- **Interactive cocktail menu** — a slider that cycles through recipes with animated transitions on each change.
- **Sticky, blurring navbar** — the nav fades to a translucent blurred bar as you scroll past the hero.
- **Fully responsive** — layouts and animation values adapt for mobile and desktop.

---

## 🛠️ Tech Stack

| Area        | Tools                                                             |
| ----------- | ---------------------------------------------------------------- |
| Framework   | [React 19](https://react.dev/)                                   |
| Build tool  | [Vite](https://vite.dev/)                                        |
| Styling     | [Tailwind CSS v4](https://tailwindcss.com/)                      |
| Animation   | [GSAP 3](https://gsap.com/) — ScrollTrigger, SplitText, `@gsap/react` |
| Responsive  | [react-responsive](https://github.com/contra/react-responsive)  |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/MohamedHafez20/Mojito_Cocktail.git
cd Mojito_Cocktail

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Then open the URL Vite prints (default: `http://localhost:5173`).

### Build

```bash
# Production build
npm run build

# Preview the production build locally
npm run preview
```

---

## 📜 Scripts

| Script            | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the Vite dev server            |
| `npm run build`   | Build for production into `dist/`    |
| `npm run preview` | Serve the production build locally   |
| `npm run lint`    | Run ESLint                           |

---

## 📁 Project Structure

```
Mojito_Cocktail/
├── public/
│   ├── fonts/          # Custom display font (Modern Negra)
│   ├── images/         # Leaves, logos, cocktail art, textures
│   └── videos/         # Hero video (scrubbed on scroll)
├── src/
│   ├── components/
│   │   ├── Preloader.jsx   # Intro loader with % counter
│   │   ├── Navbar.jsx      # Sticky, blurring navigation
│   │   ├── Hero.jsx        # Scroll-scrubbed video + SplitText
│   │   ├── Cocktails.jsx   # Parallax leaves + lists
│   │   ├── About.jsx
│   │   ├── Art.jsx
│   │   ├── Menu.jsx        # Interactive cocktail slider
│   │   └── Contact.jsx
│   ├── constants/      # Nav links, cocktail data
│   ├── App.jsx         # Layout + loading state + ScrollTrigger setup
│   ├── main.jsx        # Entry point
│   └── index.css       # Tailwind theme + component styles
└── index.html
```

---

## 🎬 How the animations work

All GSAP plugins are registered once in `App.jsx`:

```jsx
gsap.registerPlugin(ScrollTrigger, SplitText);
```

- **Hero** pins and scrubs `video.currentTime` from `0` to its full duration across the section's scroll range.
- **Parallax leaves** use a `scrub`ced timeline tied to each section (the trigger must match the section that *contains* the leaves).
- **Menu** re-runs its intro animations whenever the active cocktail index changes.
- **Preloader** locks body scroll while it's up, then calls `ScrollTrigger.refresh()` on reveal to re-measure after the video and images have loaded.

---

## 📝 License

This project is for educational and personal portfolio use.
