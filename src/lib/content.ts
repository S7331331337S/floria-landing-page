/**
 * Single source of truth for site-wide copy, navigation and catalogue data.
 * Sections and pages read from here so content stays consistent across routes.
 */

export const SITE = {
    name: "La Casa Del Amor",
    tagline: "Architecture of Nature",
    url: "https://lacasadelamor.com",
    email: "hello@lacasadelamor.com",
    phone: "+1 (310) 555-0824",
    phoneHref: "tel:+13105550824",
    address: {
        street: "418 Mateo Street, Studio 3",
        city: "Los Angeles, CA 90013",
    },
    hours: [
        { days: "Tuesday — Friday", time: "9:00 — 18:00" },
        { days: "Saturday", time: "10:00 — 16:00" },
        { days: "Sunday — Monday", time: "By appointment" },
    ],
    social: [
        { label: "Instagram", href: "https://instagram.com" },
        { label: "Pinterest", href: "https://pinterest.com" },
        { label: "Are.na", href: "https://are.na" },
    ],
} as const;

export const NAV_LINKS = [
    { label: "Collections", href: "/collections" },
    { label: "Weddings", href: "/weddings" },
    { label: "Studio", href: "/studio" },
    { label: "Journal", href: "/journal" },
] as const;

/* -------------------------------------------------------------------------- */
/*  Collections                                                               */
/* -------------------------------------------------------------------------- */

export type CollectionCategory =
    | "Arrangements"
    | "Subscriptions"
    | "Preserved"
    | "Installations"
    | "Workshops";

export const COLLECTION_CATEGORIES: CollectionCategory[] = [
    "Arrangements",
    "Subscriptions",
    "Preserved",
    "Installations",
    "Workshops",
];

export interface CollectionItem {
    slug: string;
    title: string;
    category: CollectionCategory;
    price: string;
    lead: string;
    description: string;
    stems: string[];
    image: string;
    aspect: string;
}

export const COLLECTION_ITEMS: CollectionItem[] = [
    {
        slug: "ethereal-greens",
        title: "Ethereal Greens",
        category: "Arrangements",
        price: "$120",
        lead: "Foliage as the subject, not the filler.",
        description:
            "A study in seven greens, built low and wide so it reads as landscape rather than bouquet. Designed for a dining table you actually eat at.",
        stems: ["Ruscus", "Silver dollar eucalyptus", "Bells of Ireland", "Nagi"],
        image: "/bouquet-1.webp",
        aspect: "aspect-[3/4]",
    },
    {
        slug: "midnight-orchid",
        title: "Midnight Orchid",
        category: "Arrangements",
        price: "$185",
        lead: "Our darkest composition, and the one that sells out first.",
        description:
            "Deep-toned phalaenopsis suspended on bare branch structure. Intended for low light — it resolves at dusk and holds its shape for a fortnight.",
        stems: ["Black phalaenopsis", "Smoke bush", "Manzanita", "Hellebore"],
        image: "/bouquet-2.webp",
        aspect: "aspect-square",
    },
    {
        slug: "blush-peony-structura",
        title: "Blush Peony Structura",
        category: "Arrangements",
        price: "$95",
        lead: "Softness held inside a rigid frame.",
        description:
            "Coral charm peonies cut to three deliberate heights over a hidden armature. The negative space is the design; the flowers simply mark it.",
        stems: ["Coral charm peony", "Astrantia", "Sweet pea", "Scabiosa pods"],
        image: "/bouquet-3.webp",
        aspect: "aspect-[4/5]",
    },
    {
        slug: "the-wedding-archive",
        title: "The Wedding Archive",
        category: "Installations",
        price: "From $4,800",
        lead: "Sculptural centrepieces and avant-garde bridal work.",
        description:
            "A full-service commission covering ceremony structure, table architecture and the bridal party. Scoped per venue after a site walk.",
        stems: ["Seasonal", "Sourced to the room", "Locally grown"],
        image: "/collection-1.webp",
        aspect: "aspect-[4/3]",
    },
    {
        slug: "weekly-studio-subscription",
        title: "Weekly Studio Subscription",
        category: "Subscriptions",
        price: "$85 / week",
        lead: "Whatever the growers cut best that week.",
        description:
            "No two deliveries repeat. We design against the market, not a catalogue, which is why this is the closest thing we offer to a house style.",
        stems: ["Grower's choice", "Rotating vessel", "Delivered Wednesdays"],
        image: "/collection-2.webp",
        aspect: "aspect-[4/5]",
    },
    {
        slug: "dried-and-preserved",
        title: "Dried & Preserved",
        category: "Preserved",
        price: "$140",
        lead: "Eternal structures for rooms without water.",
        description:
            "Slow-dried over six weeks in the studio loft, then re-assembled. Holds colour for roughly two years out of direct sun.",
        stems: ["Bleached ruscus", "Palm spear", "Bunny tail", "Preserved fern"],
        image: "/collection-3.webp",
        aspect: "aspect-square",
    },
    {
        slug: "corporate-installations",
        title: "Corporate Installations",
        category: "Installations",
        price: "From $2,200 / mo",
        lead: "Atmospheric work for lobbies, galleries and flagships.",
        description:
            "Monthly rotating installations maintained on site. We handle sourcing, install, upkeep and strike — the space simply changes overnight.",
        stems: ["Site-specific", "Monthly rotation", "Maintained weekly"],
        image: "/collection-4.webp",
        aspect: "aspect-[4/3]",
    },
    {
        slug: "structure-workshops",
        title: "Structure Workshops",
        category: "Workshops",
        price: "$165 / seat",
        lead: "Master the structure of nature.",
        description:
            "Three hours, eight seats, one armature technique per session. You leave with the piece you built and the reasoning behind every cut.",
        stems: ["Eight seats", "Three hours", "Materials included"],
        image: "/collection-5.webp",
        aspect: "aspect-[4/5]",
    },
];

/* -------------------------------------------------------------------------- */
/*  Weddings                                                                  */
/* -------------------------------------------------------------------------- */

export const WEDDING_PACKAGES = [
    {
        name: "The Elopement",
        price: "From $1,400",
        summary: "Two people, a registrar and flowers that photograph honestly.",
        includes: [
            "Bridal bouquet and one buttonhole",
            "Single ceremony arrangement",
            "Studio consultation",
            "Delivery within Los Angeles County",
        ],
    },
    {
        name: "The Ceremony",
        price: "From $4,800",
        summary: "Our most requested scope, for 60 to 120 guests.",
        includes: [
            "Full bridal party florals",
            "Ceremony structure or arch",
            "Up to twelve table compositions",
            "Site walk, install and same-night strike",
        ],
        featured: true,
    },
    {
        name: "The Commission",
        price: "From $12,000",
        summary: "Multi-day, multi-room, treated as a site-specific installation.",
        includes: [
            "Concept deck and material studies",
            "Suspended and structural installations",
            "Welcome dinner through to brunch",
            "Dedicated on-site design team",
        ],
    },
] as const;

export const WEDDING_TIMELINE = [
    {
        when: "9 — 12 months out",
        title: "First conversation",
        desc: "We talk venue, light and season before we talk flowers. Most decisions are made by the room.",
    },
    {
        when: "6 months out",
        title: "Concept and material study",
        desc: "You receive a deck: palette, structure references and the specific stems we intend to chase.",
    },
    {
        when: "8 weeks out",
        title: "Site walk and final scope",
        desc: "We measure, photograph the light at your ceremony hour, and lock the install plan.",
    },
    {
        when: "Week of",
        title: "Sourcing and build",
        desc: "Stems are cut to order. The studio builds, conditions and installs, then strikes the same night.",
    },
] as const;

/* -------------------------------------------------------------------------- */
/*  Studio                                                                    */
/* -------------------------------------------------------------------------- */

export const STUDIO_VALUES = [
    {
        title: "Fifty miles, no exceptions",
        desc: "Every stem is grown inside a fifty-mile radius. If it cannot be grown here this season, we design without it.",
    },
    {
        title: "Foam-free since day one",
        desc: "No floral foam has ever entered the studio. We build on armature, pin and mechanics that compost or get reused.",
    },
    {
        title: "Structure before colour",
        desc: "We resolve the silhouette first. Colour is the last decision made, and often the smallest one.",
    },
    {
        title: "Nothing is thrown out",
        desc: "Off-cuts go to the drying loft, the compost programme, or back to the growers who cut them.",
    },
] as const;

export const STUDIO_TEAM = [
    {
        name: "Marisol Vega",
        role: "Founder & Principal Designer",
        bio: "Trained in landscape architecture before floristry. Founded the studio in 2016 after a decade designing public gardens.",
        since: "2016",
    },
    {
        name: "Theo Lindqvist",
        role: "Head of Installations",
        bio: "Builds the armatures nobody sees. Previously a scenic fabricator for touring stage productions.",
        since: "2019",
    },
    {
        name: "Nadia Boateng",
        role: "Sourcing & Grower Relations",
        bio: "Spends three mornings a week at the flower market and the rest on farms in Ventura and Carpinteria.",
        since: "2021",
    },
] as const;

export const STUDIO_STATS = [
    { value: "2016", label: "Studio founded" },
    { value: "50mi", label: "Sourcing radius" },
    { value: "340+", label: "Commissions delivered" },
    { value: "0", label: "Grams of floral foam" },
] as const;

/* -------------------------------------------------------------------------- */
/*  Journal                                                                   */
/* -------------------------------------------------------------------------- */

export interface JournalPost {
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    displayDate: string;
    readingTime: string;
    category: string;
    image: string;
    body: string[];
}

export const JOURNAL_POSTS: JournalPost[] = [
    {
        slug: "against-the-generic-bouquet",
        title: "Against the generic bouquet",
        excerpt:
            "The round, symmetrical bouquet is a shipping constraint that became an aesthetic. It is worth asking who it was designed for.",
        date: "2026-07-14",
        displayDate: "14 July 2026",
        readingTime: "6 min",
        category: "Manifesto",
        image: "/bouquet-2.webp",
        body: [
            "The round bouquet did not emerge from any tradition of looking. It emerged from logistics. A sphere is the most efficient shape to wrap, box, stack and ship without bruising the outer petals, and once the wholesale trade settled on it, the shape quietly became the definition of what flowers are supposed to look like.",
            "We are not against symmetry. We are against inheriting a shape without asking what produced it. A composition should answer to the room it enters — its light, its ceiling height, the distance a person stands from it — and none of those variables are round.",
            "Practically, this means we start every commission with the silhouette. Before a single stem is chosen we decide how the piece occupies space: whether it spreads low across a horizontal, rises on a single vertical axis, or leans asymmetrically into the negative space beside it. Only then do we source.",
            "The result reads as intentional because it is. A guest may not be able to name why an arrangement holds their attention, but they register the difference between a shape that was decided and a shape that was defaulted to.",
        ],
    },
    {
        slug: "sourcing-within-fifty-miles",
        title: "What fifty miles actually costs",
        excerpt:
            "Local sourcing is easy to claim and expensive to keep. A candid accounting of what the radius removes from our catalogue.",
        date: "2026-06-02",
        displayDate: "2 June 2026",
        readingTime: "8 min",
        category: "Sourcing",
        image: "/collection-2.webp",
        body: [
            "Every studio says it sources locally. Fewer publish what that rules out. Our fifty-mile radius means no imported roses in January, no year-round ranunculus, and no guarantee that the stem you saw on our feed in April will exist in August.",
            "It also means a standing relationship with eleven growers, three of whom farm under two acres. We commit to volumes before the season starts, which transfers some of the risk of a bad cut from them to us. In a wet spring, that is a real cost.",
            "What we get in return is stem quality that cannot be bought at any price through a distributor. A dahlia cut at dawn in Carpinteria and conditioned in our cooler by ten is a structurally different object from one that has spent four days in transit.",
            "The honest summary: the radius makes us slower, narrows the palette, and occasionally forces us to redesign a concept a fortnight out. We keep it because the alternative is a catalogue that looks the same in every city, which is precisely the thing we set out not to make.",
        ],
    },
    {
        slug: "designing-for-low-light",
        title: "Designing for the hour the room is actually used",
        excerpt:
            "Most arrangements are photographed at noon and lived with at eight in the evening. We design for the second one.",
        date: "2026-04-21",
        displayDate: "21 April 2026",
        readingTime: "5 min",
        category: "Method",
        image: "/collection-3.webp",
        body: [
            "There is a gap between the conditions an arrangement is sold in and the conditions it lives in. Showrooms and photographs favour bright, even, overhead light. Dining rooms at eight in the evening offer none of that.",
            "Low light flattens colour before it flattens form. Saturated reds go to brown, pale pinks go to grey, and anything relying on a subtle gradient stops reading entirely. What survives is silhouette, texture and contrast in value.",
            "So for pieces destined for evening rooms we push value contrast hard — near-black against pale — and we let texture carry the interest that colour cannot. Smoke bush, seed pods and bare branch do more work at dusk than any bloom.",
            "Before a site install we photograph the room at the hour of the event, not the hour of the site walk. It is a small discipline that changes the material list more often than any other single input.",
        ],
    },
    {
        slug: "the-case-for-drying",
        title: "The case for letting things dry",
        excerpt:
            "Preservation is usually framed as a compromise. Treated as a design decision from the start, it is closer to the opposite.",
        date: "2026-02-09",
        displayDate: "9 February 2026",
        readingTime: "4 min",
        category: "Method",
        image: "/collection-5.webp",
        body: [
            "Dried flowers carry a reputation problem, largely earned in the 1980s. The dust-coloured basket arrangement did lasting damage to a technique that is, on its own terms, a rigorous one.",
            "The failure was not drying. It was drying as an afterthought — taking a composition designed for fresh stems and simply letting it desiccate in place. Structure collapses, colour dulls unevenly, and the result reads as neglect.",
            "Designed for from the start, it behaves differently. We select stems for how they will hold at eighty per cent moisture loss, build on armature that tightens rather than slackens as it dries, and finish the piece six weeks after it is first assembled.",
            "The appeal is not only longevity. A dried composition has a matte, absorbent surface that fresh material never offers, and it sits in a room the way a textile does rather than the way a cut flower does. That is a distinct effect, not a lesser one.",
        ],
    },
];

export function getJournalPost(slug: string): JournalPost | undefined {
    return JOURNAL_POSTS.find((post) => post.slug === slug);
}

/* -------------------------------------------------------------------------- */
/*  Contact                                                                   */
/* -------------------------------------------------------------------------- */

export const ENQUIRY_TYPES = [
    "Wedding or event",
    "Corporate installation",
    "Subscription",
    "Workshop booking",
    "Something else",
] as const;

export const FAQS = [
    {
        q: "How far ahead should we enquire?",
        a: "For weddings, nine to twelve months is comfortable and six is workable. Installations need eight weeks. Arrangements and subscriptions can usually start the following week.",
    },
    {
        q: "Do you deliver outside Los Angeles?",
        a: "We deliver across Los Angeles County as standard, and travel statewide for full commissions. Anything beyond that is quoted per project.",
    },
    {
        q: "Can we request specific flowers?",
        a: "You can, and we will tell you honestly whether the season supports it. We would rather redirect you to something at its peak than import a compromised version of what you asked for.",
    },
    {
        q: "What happens to the flowers afterwards?",
        a: "Event florals are re-homed to a local hospice partner the following morning where the material allows, and everything else goes to the drying loft or the compost programme.",
    },
] as const;
