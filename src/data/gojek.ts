import type { Citation } from "@/types";
import type { SystemProfile } from "./systems";

/**
 * Gojek: a brand and product design reference.
 *
 * Everything under `sections`, `gojekComponents` and `gojekAreas` restates
 * gojek.design, read on READ. The site shows its brand and names its
 * components, but publishes almost no usage guidance, so Shortcut records
 * what is absent as carefully as what is there. No colour value, spacing
 * value or rationale is filled in.
 */
const READ = "2026-10-09";

const gojek = (label: string, path: string): Citation => ({ sourceId: "gojek", label: `Gojek Design, ${label}`, url: `https://www.gojek.design${path}`, dateVerified: READ });

export const gojekCite = {
  home: gojek("Home", "/"),
  system: gojek("Design System", "/design-system"),
  motion: gojek("Motion", "/motion-design"),
  tone: gojek("Tone & Voice", "/tonevoice"),
  illustration: gojek("Illustration", "/illustration"),
  typography: gojek("Typography", "/typography"),
  colors: gojek("Colors", "/colors"),
};

export const gojekProfile: SystemProfile = {
  id: "gojek",
  knownFor: ["Voice by audience", "Named motion curves", "A cast of illustrated characters"],
  name: "Gojek Design",
  organisation: "Gojek",
  type: "Brand and product design reference",
  usedFor: "A Southeast Asian reference for brand expression in a product",
  summary: "Gojek's design site shows its brand: illustration, motion, tone of voice, typography and a list of design system components. It names the components but publishes no usage guidance for them, so Shortcut treats it as a brand reference, not a design system.",
  status: "profiled",
  officialUrl: "https://www.gojek.design/",
  dateVerified: READ,
  caveat: "The site is a showcase more than documentation. Several pages are mostly images, which Shortcut cannot read as text, and it does not describe what the images show. The footer is dated 2025; no page gives a publication date.",
  interesting: [
    "Tone of voice is split by who is reading: customers, drivers, merchants and corporate clients each get their own.",
    "Motion has named curves and stated principles, which is more than most brand sites publish.",
    "Illustration is built around recurring named characters, not a style alone.",
    "It allows humour in places such as release notes, and says so on purpose.",
  ],
  learn: [
    "How to write one brand voice for several audiences without sounding like several companies.",
    "How to give motion a vocabulary a team can share, before any timing value exists.",
    "What a brand site leaves out. Names without usage rules are an inventory, not guidance.",
  ],
  sections: [
    {
      title: "Tone and voice",
      body: "Gojek describes its tone of voice as clear, casual, witty and empathetic.",
      points: [
        "It sets out different voices for different users: Gojek customers, drivers, merchants and GoCorp.",
        "It describes giving whimsy in a mostly serious place, and shows app release notes as the example.",
        "The page shows examples. It does not publish a word list, a reading level or rules for error messages.",
      ],
      citation: gojekCite.tone,
    },
    {
      title: "Motion",
      body: "The motion page is titled Move with Purpose, and describes Gojek's motion as functional, not flashy.",
      points: [
        "Four principles: purposeful, delightful, responsive and expressive.",
        "Four named curves: Move-In, Move-Out, Flair-In and Linear.",
        "It mentions Lottie for delivering animation.",
        "No duration or easing values are given on the page.",
      ],
      citation: gojekCite.motion,
    },
    {
      title: "Illustration",
      body: "Gojek presents an Illustration Universe: a cast of around twenty named characters, such as Jek and Mita, who recur across the product.",
      points: ["The page introduces the characters. It does not publish rules for when to use illustration, or how to draw new ones."],
      citation: gojekCite.illustration,
    },
    {
      title: "Typography",
      body: "The typography page names Maison Neue as the typeface.",
      points: ["No type scale, sizes, weights or line heights were readable on the page."],
      citation: gojekCite.typography,
    },
  ],
};

/** Component names listed on Gojek's Design System page. Names only: none links to a guidance page. */
export const gojekComponents = [
  "Action", "Backdrop card", "Badge ribbon", "Bottom bar", "Bottom sheet", "Button", "Checkbox", "Chips", "Circular button", "Content switcher", "Date picker", "Dropdown", "Empty state", "File uploader", "Flag floating", "Floating tab", "Gopay bar", "Group toggle", "Input field", "Page control", "Pagination", "Progress bar", "Radio button", "Slider", "Spinner", "Suffle card", "Swipe button", "Tabs", "Time picker", "Toggle", "Tooltip", "Wizard",
];

/** What Shortcut looked for and did not find. Each is an absence on the pages read, not a claim that it does not exist inside Gojek. */
export const gojekNotFound: { topic: string; note: string }[] = [
  { topic: "Component usage guidance", note: "Component names are listed. No page says when to use one, or how it behaves." },
  { topic: "Colour values", note: "The Colors page names a green, but its values were inconsistent between formats when read, so Shortcut publishes none." },
  { topic: "Spacing and layout", note: "No spacing scale, grid or breakpoints." },
  { topic: "Corner radius and elevation", note: "Nothing published." },
  { topic: "Accessibility", note: "No contrast, target size or assistive technology guidance." },
  { topic: "Responsive and device guidance", note: "Nothing on viewports, tablets or foldables." },
  { topic: "Brandmark and photography", note: "Both pages exist but were images only, with no text to read." },
  { topic: "Iconography", note: "One descriptive sentence. No sizes, grid or usage rules." },
  { topic: "Motion timing", note: "Curves are named. No durations or easing values." },
  { topic: "A dated announcement", note: "Shortcut found no dated post about this site or a rebrand, so nothing appears in Updates." },
];

/** Shortcut's reading. Editorial. */
export const gojekReading: { title: string; text: string }[] = [
  { title: "Voice per audience is the idea worth taking", text: "A driver mid-shift and a customer ordering dinner read differently and want different things. Naming the audiences is the first step; most products never do it." },
  { title: "Name things before you measure them", text: "\"Move-In\" and \"Flair-In\" give a team words to argue with. A product with no motion spec can start here and add values later." },
  { title: "Do not mistake a showcase for a system", text: "Nothing here tells you how a Gojek button behaves when disabled. If you need that, read a system that documents it." },
];

/** Southeast Asian references on Shortcut. Three examples, not a survey of the region. */
export const seaReferences: { name: string; kind: string; what: string; href: string }[] = [
  { name: "Singapore Government Design System", kind: "Public design system", what: "Documented components, tokens and patterns for government services.", href: "/explorer" },
  { name: "Grab", kind: "Product design reference", what: "Articles on designing for patchy networks, many languages and field research.", href: "/systems/grab" },
  { name: "Gojek", kind: "Brand and product design reference", what: "Brand expression: voice by audience, motion principles, illustrated characters.", href: "/systems/gojek" },
];
