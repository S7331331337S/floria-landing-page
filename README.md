# La Casa Del Amor · the story site

A cinematic, scroll-driven walk through Heather Close's greenhouse studio in
Albany, New York. Every chapter is told in Heather's own voice, layered with
leaves, moss, mist and dew, and it ends at the shop.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

## The journey

| # | Chapter | What happens on scroll |
|---|---------|------------------------|
| 0 | **Discovery** (hero) | Jungle fades up, the name rises. Leaves part, and we push through the heart of the wreath into the greenhouse door. |
| I | **The Door** | Same shot: Heather says hello over the greenhouse photo. |
| II | **Hands in the Soil** | Scrolling turns sideways into a horizontal walk through Gather → Wrap → Bind → Wait. |
| III | **Living Sculptures** | Daylight. Her statement lights up word by word while plants float past at different depths. |
| IV | **The Studio** | A doorway-shaped window opens until the studio fills the screen. |
| V | **Moments** | Evening. Three arrangements fan out like cards; cut-out bouquets drift in. |
| VI | **The Garden** | Golden hour. We pull back from one flower bed to the whole garden, then flip through snapshots. |
| ∞ | **Stay a While** | Leaves close back around the wreath. *Explore More* and *Shop the Collections*. |

Leafy "canopies" sweep past the camera at the seams between chapters.

## Editing together: where things live

| I want to change… | Edit |
|---|---|
| **Any words, links or photos** | `src/content/story.ts` (the only file you need for copy) |
| Shop / Explore button destinations | `site.shopUrl`, `site.exploreUrl` in `src/content/story.ts` |
| Chapter order | `src/app/page.tsx` |
| One chapter's layout or choreography | `src/components/story/chapters/<Chapter>.tsx` |
| The leaves in a scene | the `FAR` / `MID` / `NEAR` / `FRAME` / `LEAVES` arrays at the top of each chapter |
| Leaves between chapters | `src/components/story/seams.ts` |
| Colours | CSS variables at the top of `src/app/globals.css` |
| The overall feel (easing, smoothing) | `src/lib/motion.ts` |

### Leaves

All foliage is procedural vector art (`src/components/story/flora/`):
`monstera`, `alocasia`, `anthurium`, `banana`, `calathea`, `palm`, `fern`.
It stays crisp at any size and is recoloured from props. A placement looks like:

```ts
{ kind: "monstera", x: -13, y: 38, w: 34, wm: 62, r: -52, shade: 0.3, dew: 6, exit: "left", sway: true }
```

- `x`, `y`: position in % of the scene · `w` / `wm`: width in vw on desktop / phone · `r`: rotation
- `shade`: 0 is vivid and close, 1 is a dark far-away silhouette · `blur`: depth of field in px
- `dew`: number of water droplets · `sway`: gentle idle movement
- `exit`: which way it parts in the hero · `speed`: parallax (+ rushes past, − lags behind)
- `seed`: change it for a differently shaped leaf of the same kind · `mobile: false` hides it on phones

### Photos

Web-ready photos live in `public/story/`. To add or replace one, drop the
original into `assets-src/` (same file name to replace; the originals come
from the `lacasadelamor` repo's `public/studio` and `public/products`) and run:

```bash
npm run images
```

That resizes and converts everything to WebP and regenerates the moss, mist
and paper textures.

## Stack

Next.js 16 · React 19 · Tailwind CSS 4 · GSAP 3 (ScrollTrigger, SplitText) ·
Lenis smooth scroll. Visitors who turn on "reduce motion" get a calm, static
version without pinned scenes or smooth scrolling.
