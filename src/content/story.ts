/**
 * ─────────────────────────────────────────────────────────────────────────
 *  LA CASA DEL AMOR: the story, in Heather's words.
 *
 *  All of the words and photos on the page live in this one file.
 *  Edit a line here and it changes on the site. Nothing else to touch.
 *
 *  Photos live in /public/story. To swap one, drop a new file into
 *  /assets-src with the same name and run `npm run images`, or point a
 *  `src` below at a different file.
 * ─────────────────────────────────────────────────────────────────────────
 */

export const site = {
  name: "La Casa Del Amor",
  owner: "Heather Close",
  place: "Albany, New York",
  /** storefront project, deployed at shop.lacasadelamor.app in production */
  shopUrl: "https://shop.lacasadelamor.app",
  exploreUrl: "https://lacasadelamor.app",
  instagram: "https://instagram.com/",
};

export type Photo = { src: string; alt: string };

// Chapter ids double as #anchors and as labels in the side navigation.
export const chapters = [
  { id: "discovery", label: "The Door" },
  { id: "craft", label: "Hands in Soil" },
  { id: "sculptures", label: "Living Sculptures" },
  { id: "studio", label: "The Studio" },
  { id: "moments", label: "Moments" },
  { id: "garden", label: "The Garden" },
  { id: "invitation", label: "Stay a While" },
] as const;

// ─────────────────────────────────────────────── 0. Hero: the discovery
export const hero = {
  eyebrow: "Albany, New York",
  title: ["La Casa", "Del Amor"],
  whisper: "A house of living things",
  cue: "Scroll to step inside",
  /** appears as the wreath opens and the greenhouse comes into view */
  aside: "Oh, hello. You found us.",
  portal: { src: "/d2.webp", alt: "A living wreath of amaryllis, dahlias and calla lilies" },
  reveal: { src: "/story/exterior.webp", alt: "The cedar greenhouse behind Heather's house, hanging ferns at the door" },
};

// ─────────────────────────────────────────────── I. The door (same scene)
export const threshold = {
  kicker: "I · The Door",
  heading: "Come in, the door's always open.",
  body: [
    "I'm Heather. Everything you're about to see started right here, in the little greenhouse behind my house.",
    "It was meant to keep a few plants alive through an Albany winter. Somewhere along the way, it started keeping me going too.",
  ],
};

// ─────────────────────────────────────────────── II. Hands in the soil
export const craft = {
  kicker: "II · Hands in the Soil",
  heading: "Nothing here is rushed.",
  intro: "Every piece is grown, wrapped and tied by hand. Let me show you how one comes to life.",
  steps: [
    {
      n: "01",
      title: "Gather",
      text: "I start with the plant, never the pot. I wait until it tells me who it wants to be.",
      photo: { src: "/story/product-velvet-anthurium.webp", alt: "A velvet anthurium kokedama hanging in the greenhouse" },
    },
    {
      n: "02",
      title: "Wrap",
      text: "Roots are tucked into soil and sphagnum, then wrapped in living sheet moss. It smells like the forest after rain.",
      photo: { src: "/story/kokedama-portrait.webp", alt: "A begonia kokedama wrapped in moss" },
    },
    {
      n: "03",
      title: "Bind",
      text: "Each moss ball is tied with twine, one loop at a time. No two ever come out the same.",
      photo: { src: "/story/product-kokedama-crown.webp", alt: "A twine-bound moss ball on a wooden stand" },
    },
    {
      n: "04",
      title: "Wait",
      text: "Then the hardest part: patience. A few weeks of mist and light before it's ready for a new home.",
      photo: { src: "/story/product-jewel-orchid.webp", alt: "A jewel orchid resting on a cut log among ferns" },
    },
  ],
};

// ─────────────────────────────────────────────── III. Living sculptures
export const sculptures = {
  kicker: "III · Living Sculptures",
  /** each word lights up as you scroll */
  statement:
    "Every plant here has a name, a temper, and a favorite window. I don't send them off as décor. I send them off as company.",
  /** shown until Shopify is connected (see src/lib/collection.ts), then used to top up */
  plants: [
    { src: "/story/product-pink-princess.webp", alt: "Pink Princess philodendron", name: "Pink Princess" },
    { src: "/story/product-silver-begonia.webp", alt: "Silver begonia on moss", name: "Silver Begonia" },
    { src: "/story/product-string-of-pearls.webp", alt: "String of pearls cascading over a brick wall", name: "String of Pearls" },
    { src: "/story/product-prayer-plant.webp", alt: "Prayer plant in a stone pot", name: "Prayer Plant" },
    { src: "/story/product-variegated-rubber.webp", alt: "Variegated rubber plant", name: "Variegated Rubber" },
  ],
  /** hand-coloured herbarium plates drifting behind the living plants */
  herbarium: [
    { src: "/story/elements/plate-anthurium.webp", caption: "Anthurium · Tab. I" },
    { src: "/story/elements/plate-alocasia.webp", caption: "Alocasia · Tab. II" },
    { src: "/story/elements/plate-monstera.webp", caption: "Monstera · Tab. III" },
    { src: "/story/elements/plate-calathea.webp", caption: "Calathea · Tab. IV" },
  ],
};

// ─────────────────────────────────────────────── IV. The studio
export const studio = {
  kicker: "IV · The Studio",
  heading: "My favorite corner of the world.",
  body: "Inside, it's potting soil, good light and a radio that only gets one station. The shelves change with the seasons: whatever's growing, whatever's blooming, whatever needs a little extra love.",
  photo: { src: "/story/interior.webp", alt: "Inside the greenhouse studio: cedar shelves lined with plants" },
  inset: { src: "/story/plant-wall.webp", alt: "A living wall of begonias and peperomia" },
};

// ─────────────────────────────────────────────── V. Moments
export const moments = {
  kicker: "V · Flowers for the Moments",
  heading: "Some days call for a wedding. Some just call for a Tuesday.",
  body: "I build arrangements the way the garden grows: a little wild, a little uneven, never stiff.",
  bouquets: [
    { src: "/bouquet-1.webp", alt: "Pink peonies in a loose garden arrangement" },
    { src: "/collection-2.webp", alt: "White orchids and black calla lilies" },
    { src: "/bouquet-3.webp", alt: "White lisianthus and fern in a stoneware vase" },
  ],
  cutouts: [
    { src: "/d1.webp", alt: "" },
    { src: "/hero-accent.webp", alt: "" },
  ],
};

// ─────────────────────────────────────────────── VI. The garden
export const garden = {
  kicker: "VI · The Garden",
  heading: "Come sit a while.",
  body: [
    "On summer evenings we open the gate. There's lemonade, long tables, far too many tomatoes, and always someone new to meet.",
    "Garden parties are how this house says thank you.",
  ],
  aerial: { src: "/story/garden-aerial.webp", alt: "The garden from above: a patio ringed with beds and trees" },
  snapshots: [
    { src: "/story/garden-table.webp", alt: "A long cedar table set in the garden", caption: "The long table" },
    { src: "/story/flower-garden.webp", alt: "Zinnias and hostas around a birdbath", caption: "Birdbath beds" },
    { src: "/story/side-garden.webp", alt: "The shade garden beside the greenhouse", caption: "The shade walk" },
  ],
};

// ─────────────────────────────────────────────── Finale: the invitation
export const invitation = {
  kicker: "Until next time",
  heading: "Take a little of the garden home.",
  body: "Thank you for walking through with me. The door stays open, so come back anytime.",
  signature: "With love, Heather",
  explore: "Explore More",
  shop: "Shop the Collections",
};
