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
  /** temporary destination until the Shopify storefront is connected */
  shopUrl: "https://lacasadelamor.app",
  exploreUrl: "https://lacasadelamor.app",
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
  title: ["La Casa", "del Amor"],
  whisper: "A house of living things",
  cue: "Scroll to step inside",
  /** appears as we fall through the moss ball and the greenhouse comes into view */
  aside: "Oh, hello. You found us.",
  portal: { src: "/hanging-kokedama.webp", alt: "A dracaena kokedama hanging on twine, rhipsalis trailing beneath the moss ball" },
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
  intro:
    "Kokedama means \"moss ball\": a Japanese way of growing a plant without a pot that goes back more than 400 years. Every piece here is grown, wrapped and tied by hand. Let me show you how one comes to life.",
  steps: [
    {
      n: "01",
      title: "Gather",
      text: "I start with the plant, never the pot. I wait until it tells me who it wants to be.",
      photo: { src: "/story/real/heather-10.webp", alt: "A red coleus kokedama held up in the garden" },
    },
    {
      n: "02",
      title: "Wrap",
      text: "Roots are tucked into soil and sphagnum, then wrapped in living sheet moss. It smells like the forest after rain.",
      photo: { src: "/story/real/heather-7.webp", alt: "Two heather kokedama wrapped in fresh moss on an olive-wood board" },
    },
    {
      n: "03",
      title: "Bind",
      text: "Each moss ball is tied with twine, one loop at a time. No two ever come out the same.",
      photo: { src: "/story/real/heather-6.webp", alt: "A variegated kokedama bound in string, held in one hand" },
    },
    {
      n: "04",
      title: "Wait",
      text: "Then the hardest part: patience. A few weeks of mist and light before it's ready for a new home.",
      photo: { src: "/story/real/heather-9.webp", alt: "Two dracaena kokedama on a black stand and a white pedestal" },
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
    { src: "/story/real/heather-3.webp", alt: "A dracaena kokedama held in the palm of a hand", name: "Dracaena Kokedama" },
    { src: "/story/real/heather-4.webp", alt: "An orchid, peperomia and alocasia arrangement", name: "Orchid & Alocasia" },
    { src: "/story/real/heather-5.webp", alt: "Three kokedama on black metal stands and a white pedestal", name: "Kokedama on Stands" },
    { src: "/story/product-silver-begonia.webp", alt: "Silver begonia on moss", name: "Silver Begonia" },
    { src: "/story/product-string-of-pearls.webp", alt: "String of pearls cascading over a brick wall", name: "String of Pearls" },
  ],
  /**
   * Hand-painted botanical cutouts drifting through the margins.
   * Add more: drop the image into assets-src/botanicals, run `npm run cutouts`,
   * then list it here with its pixel size.
   */
  herbarium: [
    { src: "/story/botanicals/calathea-spathe.webp", w: 1261, h: 1272, caption: "Calathea · with spathe" },
    { src: "/story/botanicals/lance-aroid.webp", w: 1026, h: 1294, caption: "Anthurium · lance leaf" },
    { src: "/story/botanicals/heart-arum.webp", w: 922, h: 1306, caption: "Philodendron · in bloom" },
    { src: "/story/botanicals/mossy-anthurium.webp", w: 871, h: 1292, caption: "Anthurium · on moss" },
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
  kicker: "V · Living Art for the Moments",
  heading: "Some days call for a celebration. Some just call for a Tuesday.",
  body: "I make each one the way the garden grows: a little wild, a little uneven, never stiff. Living art for a brighter space.",
  pieces: [
    { src: "/story/real/heather-1.webp", alt: "A dieffenbachia kokedama on a white pedestal" },
    { src: "/story/real/heather-8.webp", alt: "Three variegated kokedama on pedestals and a black stand" },
    { src: "/story/real/heather-11.webp", alt: "A group of five kokedama on the garden table" },
  ],
  /** decorative foliage drifting in from the edges: moss, kokedama, staghorn, tillandsia, rhipsalis */
  cutouts: [
    { src: "/foliage-left.webp", w: 800, h: 720 },
    { src: "/foliage-right.webp", w: 760, h: 720 },
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
  /** painted plants rising either side of the invitation */
  botanicals: [
    { src: "/story/botanicals/philodendron.webp", w: 984, h: 1291 },
    { src: "/story/botanicals/mossy-anthurium.webp", w: 871, h: 1292 },
  ],
  explore: "Explore More",
  shop: "Shop the Collections",
};
