# PIYUSH VISUALS — Portfolio Website

> **Brand:** PIYUSH VISUALS  
> **Tagline:** CRAFTING VISUALS. CREATING IMPACT.  
> **Target Production URL:** [https://piyushvisuals.vercel.app](https://piyushvisuals.vercel.app)

A world-class, production-ready portfolio website engineered for **PIYUSH VISUALS**, an independent video editor and visual director specializing in cinematic commercials, high-retention short-form content, architecture & interior tours, talking-head infotainment, product showcases, and viral culture trends.

---

## 1. Visual Direction & Brand Identity

- **Background:** Minimalist dark charcoal (`#080808`, `#050505`) with film-grade grain overlay.
- **Typography:** White editorial typography (`#F5F5F5`) with custom tracking and optical weight hierarchies.
- **Signature Accent:** Electric lime (`#D6FF48`) for focal accents, badges, hover indicators, and glow states.
- **Cinematic Experience:**
  - Integrated 4K Showreel in the Hero section with custom glassmorphic playback controls.
  - Interactive Project Grid supporting authentic video aspect ratios (9:16 vertical reels, 16:9 widescreen cinematic cuts, 1:1 square edits).
  - Instant hover previews on desktop mouse movement.
  - Immersive modal project viewer with keyboard controls (`Space` to play/pause, `M` to mute, `←`/`→` to scrub, `Esc` to close).
  - Smooth inertia scrolling via Lenis.
  - Magnetic custom cursor with adaptive "WATCH" and "PLAY" modes.

---

## 2. Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router, React 19)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Motion & Interaction:** [Framer Motion](https://www.framer.com/motion/)
- **Smooth Scroll:** [Lenis](https://lenis.darkroom.engineering/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Media Pipeline:** FFmpeg & FFprobe (high-resolution WebP extraction & H.264 web optimization)

---

## 3. Project Structure

```text
PIYUSH VISUALS/
├── app/
│   ├── globals.css         # Custom theme, electric lime styles, grain overlay, scrollbars
│   ├── layout.tsx          # Root layout with SEO metadata, SmoothScroll, CustomCursor
│   └── page.tsx            # Main page assembling Hero, Work, Services, About, Contact
├── components/
│   ├── About.tsx           # Editorial bio, editing philosophy, technical specifications
│   ├── Contact.tsx         # High-conversion inquiry form, WhatsApp, Instagram, Email
│   ├── CustomCursor.tsx    # Desktop spring-physics cursor with hover states
│   ├── Footer.tsx          # Sitemap, live Asia/Kolkata studio clock, copyright
│   ├── GrainOverlay.tsx    # Subtle analog film grain texture
│   ├── Hero.tsx            # Headline ("I MAKE VIDEOS FEEL DIFFERENT"), live showreel player
│   ├── IntroVideoPlayer.tsx# Custom responsive video player for intro.mp4
│   ├── Navbar.tsx          # Navigation, live commission status pill, mobile drawer
│   ├── ProjectCard.tsx     # Aspect-ratio-preserving cards with hover video playback
│   ├── ProjectModal.tsx    # Fullscreen theater player with scrubber, audio toggle, and specs
│   ├── Services.tsx        # 6 core post-production services with deliverable breakdowns
│   ├── SmoothScroll.tsx    # Lenis smooth scrolling integration
│   └── WorkGallery.tsx     # Filterable portfolio grid with dynamic counts
├── data/
│   └── projects.ts         # Centralized typed project catalog (29 verified projects)
├── public/
│   ├── projects_data.json  # Exported JSON catalog of all video specs
│   ├── thumbnails/         # High-resolution WebP posters
│   │   ├── intro-poster.webp
│   │   └── projects/*.webp
│   └── videos/
│       ├── intro.mp4       # Personal showreel / signature video
│       └── projects/*_preview.mp4 # Web-optimized video clips
├── scripts/
│   └── process_assets.py   # Automated FFmpeg pipeline for thumbnail and preview generation
├── tailwind.config.ts      # Tailwind configuration with brand tokens
├── next.config.ts          # Next.js configuration (unoptimized static media, tracing root)
└── package.json
```

---

## 4. How to Run Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)
- [FFmpeg](https://ffmpeg.org/) (optional, only required if processing new source videos)

### Steps
1. Open a terminal in the project directory:
   ```bash
   cd "C:\Users\admin\Documents\MY Documents\Programing\my projects\PIYUSH VISUALS"
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

To run the production build locally:
```bash
npm run build
npm run start
```

---

## 5. How to Add New Videos and Projects

### Step A: Add Source Video
1. Place your new video in the corresponding folder in your edits directory (e.g., `BEST EDITS/01. Talking Head & Infotainment/MY_NEW_VIDEO.mp4`).

### Step B: Run the Asset Processing Script
Run the automated script to generate the optimized WebP thumbnail and lightweight web preview:
```bash
python scripts/process_assets.py
```
This script will:
- Inspect width, height, aspect ratio, and duration using `ffprobe`.
- Extract a crisp frame at timestamp 2–3s and save it to `public/thumbnails/projects/<slug>.webp`.
- Encode a lightweight 720p/1080p preview loop with `faststart` flag to `public/videos/projects/<slug>_preview.mp4`.

### Step C: Register in `data/projects.ts`
Open `data/projects.ts` and add a new entry to the `PROJECTS` array:
```typescript
{
  id: "01_new_project_id",
  title: "Client Name — Project Title",
  category: "01. Talking Head & Infotainment", // Must match one of the 7 exact categories
  filename: "MY_NEW_VIDEO.mp4",
  duration: 45.2,
  width: 1080,
  height: 1920,
  aspectRatio: "9:16", // "9:16", "16:9", "1:1", or "4:5"
  ratioLabel: "Vertical Reel (9:16)",
  thumbnail: "/thumbnails/projects/01_new_project_id.webp",
  previewVideo: "/videos/projects/01_new_project_id_preview.mp4",
  fullVideo: "/videos/projects/01_new_project_id_full.mp4",
  featured: true, // Set to true to display on default featured filter
  clientOrBrand: "Brand Name",
  tags: ["Pacing", "Color Grading", "Sound Design"],
}
```

The gallery will automatically update, calculate the new category counts, and preserve the proper aspect ratio.

---

## 6. Categories Architecture

The portfolio uses the 7 category groupings:
1. `00. Intro Video`
2. `01. Talking Head & Infotainment`
3. `02. Product Demos & Retail`
4. `03. Architecture & Interior Design`
5. `04. Cinematic Commercials (16:9)`
6. `05. Viral Trends & Culture`
7. `06. Real Estate & Event Coverage`

---

## 7. How to Deploy to Vercel

### Target Production URL:
`https://piyushvisuals.vercel.app`

### Deployment Steps:
1. **GitHub Repository**:
   - The repository is already committed and pushed to:
     [https://github.com/piyush805829/-PIYUSH-VISUALS](https://github.com/piyush805829/-PIYUSH-VISUALS)

2. **Connect to Vercel (1-Click Deployment)**:
   - Visit [https://vercel.com/new](https://vercel.com/new).
   - Under **"Import Git Repository"**, select **`piyush805829/-PIYUSH-VISUALS`**.
   - Vercel automatically detects the framework as **Next.js**.
   - Keep default build settings (`npm run build`, output `.next`).
   - Click **Deploy**.

3. **Configure Custom Domain**:
   - Once deployment completes, navigate to **Project Settings > Domains**.
   - Add: `piyushvisuals.vercel.app` (or your custom domain).
   - Vercel automatically issues an SSL certificate.

> **Note on Video Hosting:** The website uses lightweight web previews (~400KB–1MB each) and the 1.6MB intro video directly from `public/videos/`. This fits comfortably within Vercel's static asset limits. If you add 4K feature-length original files (>100MB each), host the full video files on Cloudflare R2, AWS S3, or Vimeo/YouTube unlisted, and update `fullVideo` in `data/projects.ts`.

---

## 8. Contact Configuration

Verified contact endpoints in `components/Contact.tsx` and `components/Footer.tsx`:
- **Email:** `sainipiyush5924@gmail.com`
- **WhatsApp:** `+91 80582 96481`
- **Instagram:** `@piyushvisualss`
- **Budget Pricing:** Primary INR (₹) starting at `₹400 – ₹1,000` with dual USD ($) toggle option.

