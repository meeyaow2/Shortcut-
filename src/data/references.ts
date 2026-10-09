import type { Citation } from "@/types";
import type { CaseStudy, SystemProfile } from "./systems";

/**
 * Product design references: companies with useful published design material
 * and no public design system that Shortcut could verify.
 *
 * In each breakdown, `problem`, `change` and `stated` restate the company's
 * own article. `principle` and `context` are Shortcut's reading. The two are
 * shown apart.
 */
const READ = "2026-10-08";

const grab = (label: string, url: string, datePublished: string): Citation => ({
  sourceId: "grab",
  label: `Grab, ${label}`,
  url,
  datePublished,
  dateVerified: READ,
});

export const refCite = {
  grabSea: grab("Driving Southeast Asia Forward Through People-Focused Design", "https://engineering.grab.com/driving-sea-forward-through-people-focused-design", "2019-11-05"),
  grabChat: grab("Reshaping Chat Support for Our Users", "https://engineering.grab.com/reshaping-chat-support", "2021-07-07"),
  grabJtbd: grab("Designing products and services based on Jobs to be Done", "https://engineering.grab.com/designing-products-and-services-based-on-jtbd", "2021-10-21"),
  grabAi: grab("How the design team at Grab is redefining creativity with AI", "https://www.grab.com/inside-grab/stories/how-the-design-team-at-grab-is-redefining-creativity-with-ai", "2025-06-12"),
  granola: { sourceId: "granola", label: "Granola, Updates", url: "https://www.granola.ai/updates", dateVerified: READ } as Citation,
};

export interface UxBreakdown {
  id: string;
  title: string;
  /** What user problem the company says it addressed. */
  problem: string;
  /** What changed, as the company describes it. */
  change: string;
  /** The reasoning or result the company states. */
  stated: string;
  /** What a designer can take from it. Shortcut's reading. */
  principle: string;
  /** Why it may suit this company's users. Shortcut's reading. */
  context: string;
  citation: Citation;
}

export const uxBreakdowns: Record<string, UxBreakdown[]> = {
  grab: [
    {
      id: "grab-low-data",
      title: "Designing for patchy networks and small data budgets",
      problem: "Grab says the main challenge for its consumers is finding a reliable network, and that many use prepaid plans and switch data off after a ride.",
      change: "It designs blank, loading, partial and error states alongside the happy path, shows loading skeletons when the app opens, replaced a video tutorial with SVG animation, and turned off autoplay on the home feed.",
      stated: "The article advises keeping screens alive through visual cues, messaging and cached content, and preferring simple animation because elaborate transitions look choppy on older phones.",
      principle: "The non-happy states are the product for people on a poor connection. Design them first, not last.",
      context: "A ride or food order is often placed on the move, on a low-cost phone. A screen that waits for the network is a screen that fails.",
      citation: refCite.grabSea,
    },
    {
      id: "grab-mobile-only",
      title: "Mobile-only users, mixed literacy and many languages",
      problem: "Grab describes the region as mobile-only, not mobile-first, and notes that some consumers are not fully comfortable reading English even when it is their chosen language.",
      change: "Sign-up puts the phone number first and social accounts second. Icons are paired with text. Designs are tested with translated strings and with local date, address and phone formats.",
      stated: "The article recommends designing for small screens first and testing on in-market devices, including ones with cracked screens.",
      principle: "Never let an icon or a colour carry meaning alone, and test with the longest translated strings before the layout is fixed.",
      context: "Across Southeast Asia one product serves several languages and scripts. Pairing icon and label works whichever one the person reads faster.",
      citation: refCite.grabSea,
    },
    {
      id: "grab-chat-support",
      title: "Rebuilding chat support around how agents actually worked",
      problem: "Users needing help had to phone and queue, and chat sessions dropped. Grab also found agents ignored reply templates: 85% of replies were typed freehand because templates felt impersonal.",
      change: "Grab built chat into the app, with file and picture sharing, autocomplete suggestions while agents type, a colour-coded chat timer, prompts when others are waiting, and a queue limit that sends people to another channel when the wait would be too long.",
      stated: "Grab reports the queue limit cut waiting time by about 30%, autocomplete cut average chat time by 12%, and timers and nudges cut it by 22%. The team writes: \"we are not our users.\"",
      principle: "When people work around a feature, study the workaround. Autocomplete kept the speed of templates and the personal tone agents wanted.",
      context: "Shadowing agents revealed the template problem. It would not have shown up in usage numbers alone.",
      citation: refCite.grabChat,
    },
    {
      id: "grab-bundles",
      title: "Food bundles, from a Jobs to be Done study",
      problem: "Grab's study found working parents ordering for a family found choosing many items before checkout stressful.",
      change: "It added bundle creation to the merchant app. An algorithm suggests complementary items, and the merchant creates a bundle with one tap.",
      stated: "Grab says thousands of restaurants added bundles, which removed an obstacle for parents choosing GrabFood.",
      principle: "The fix for a consumer problem can sit in a different product. Here the consumer's anxiety was solved by making something easy for merchants.",
      context: "A marketplace has two sets of users. Lowering effort for one side is sometimes the only way to improve the experience of the other.",
      citation: refCite.grabJtbd,
    },
  ],
};

export const polishExamples: Record<string, { date: string; what: string; lesson: string }[]> = {
  granola: [
    { date: "2026-01-28", what: "Delete specific parts of a transcript while keeping the rest.", lesson: "Fine-grained control over something that was previously all or nothing." },
    { date: "2026-01-16", what: "A refreshed calendar permissions modal.", lesson: "Permission requests are a first impression. Reworking one is polish that affects who gets started at all." },
    { date: "2026-01-08", what: "Attendee cards on mentions.", lesson: "Context shown where the name appears, so nobody leaves the note to look someone up." },
    { date: "2025-12-19", what: "Connecting your calendar made easier.", lesson: "Setup steps are worth returning to after launch." },
    { date: "2025-12-12", what: "A cleaner workspace switcher.", lesson: "Navigation people use many times a day repays small improvements." },
    { date: "2025-03-06", what: "Press back during a meeting to see other notes; transcription continues.", lesson: "Removing a mode. People no longer choose between recording and looking something up." },
    { date: "2024-11-29", what: "Dark mode.", lesson: "A whole second theme, shipped as a single line in the changelog." },
    { date: "2024-11-04", what: "Drop or paste images directly into notes.", lesson: "Supporting what people already try to do in an editor." },
  ],
};

export const referenceProfiles: SystemProfile[] = [
  {
    id: "grab",
    name: "Grab product design",
    organisation: "Grab",
    type: "Product design reference",
    usedFor: "A Southeast Asian reference for product design practice",
    summary: "Grab publishes articles on how its designers and researchers work. Shortcut found no public Grab design system, so this is a reference to its published practice, not to a system.",
    status: "profiled",
    officialUrl: "https://engineering.grab.com/categories/design/",
    dateVerified: READ,
    caveat: "Three of the four articles used here date from 2019 to 2021. The product has changed since; the reasoning is what is worth reading.",
    interesting: [
      "It designs for conditions most design writing ignores: cracked screens, prepaid data, patchy networks.",
      "Its articles give the reasoning and the measured result, not only the outcome.",
      "It is a regional example. The constraints are the ones designers in Singapore and Southeast Asia actually meet.",
    ],
    learn: [
      "How to treat loading, partial and error states as primary design work.",
      "How to design for several languages and mixed literacy at once.",
      "How field research changes a design in ways usage data would not.",
    ],
    caseStudyIds: ["grab-genai"],
  },
  {
    id: "granola",
    name: "Granola product design",
    organisation: "Granola",
    type: "Product design reference",
    usedFor: "An example of product polish through small changes",
    summary: "Granola publishes dated product updates. Shortcut found no public Granola design system, so this is a reference to its release notes, not to a system.",
    status: "profiled",
    officialUrl: "https://www.granola.ai/updates",
    dateVerified: READ,
    caveat: "Only refinements that Granola's own updates page describes are listed. It does not go into detail on keyboard behaviour, text wrapping or icons, so none of that is claimed here.",
    interesting: [
      "Small refinements are announced alongside large features, in the same changelog.",
      "Several updates remove a step or a mode instead of adding a feature.",
    ],
    learn: [
      "Not every useful design change is a redesign.",
      "A changelog is a record of design decisions. Reading a product's own is a quick way to see what its team thinks matters.",
      "Setup, permissions and navigation are worth revisiting after launch.",
    ],
  },
];

export const referenceCaseStudies: CaseStudy[] = [
  {
    id: "grab-genai",
    systemId: "grab",
    title: "Grab: how its design team is using generative AI",
    facts: [
      "Grab's Head of Design describes a deliberate, hybrid approach: a vision set from the top and experimentation from the bottom, with teams given specific design challenges to solve with AI.",
      "It built Mosaic, an internal image generator trained on Grab's visual identity. Grab says an illustration that took a day now takes about 15 seconds, and that it produces around 800 a day.",
      "Illustrators now spend their time writing detailed prompts and refining outputs.",
      "Designers use agentic coding tools to build prototypes with working logic, navigation, form validation and mock data.",
      "Other tools generate usability-test scripts and flag usability issues.",
      "The article stresses human oversight, and notes that models trained on past data are weaker at predicting future trends or reactions to new technology.",
    ],
    lesson:
      "A regional example of AI being folded into an existing design practice instead of set up as a separate discipline. Two details are worth copying: the tool was trained on the company's own visual language, which is why its output is usable, and the designer's job moved toward judging output, not away from design. The article is from June 2025 and comes from the team itself, so read the figures as its own account.",
    citation: refCite.grabAi,
  },
];
