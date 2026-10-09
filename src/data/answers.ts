import type { Answer } from "@/types";
import { cite, wcag } from "./citations";
import { getGuidance, guidanceCitation } from "./guidance";

/**
 * The local answer set behind Ask UX. Each answer is written by hand from the
 * cited sources; nothing here is model-generated. A real provider can return
 * the same Answer shape (see src/lib/ask/provider.ts).
 */
export const answers: Answer[] = [
  {
    id: "tooltips-hover",
    question: "Can tooltips only appear on hover?",
    triggers: ["tooltip", "hover"],
    shortAnswer: "No.",
    explanation:
      "Content that appears on hover must also be reachable by keyboard focus, and WCAG requires it to be dismissible, hoverable and persistent. NN/g adds that a tooltip should never hold information that is vital to completing the task, because touch users may not be able to open it at all.",
    checklist: [
      "Appears on keyboard focus as well as hover",
      "Can be dismissed without moving the pointer or focus",
      "Stays open while the pointer moves onto it",
      "Stays visible until dismissed or the trigger loses hover or focus",
      "Contains nothing the user needs to complete the task",
    ],
    citations: [wcag("1.4.13"), wcag("2.1.1"), cite.nngTooltips],
    relatedSheet: "accessibility",
  },
  {
    id: "modal-width",
    question: "How wide should a modal be?",
    triggers: ["modal", "dialog", "wide", "width"],
    shortAnswer: "No tracked guideline sets a width.",
    explanation:
      "None of the sources Shortcut tracks gives a required modal width, so any number you see quoted is a team convention. What is required is that the dialog still works at 320 CSS pixels wide without two-directional scrolling. The more useful question is whether it should be a modal at all: NN/g reserves modals for critical warnings and information needed to continue the current task.",
    checklist: [
      "Works at 320 CSS px wide without horizontal scrolling",
      "Width is set by the content, not by a fixed number",
      "Focus moves into the dialog and can leave it by keyboard",
      "The task genuinely needs to interrupt the user",
    ],
    citations: [wcag("1.4.10"), wcag("2.1.2"), cite.nngModals],
    relatedSheet: "modals",
  },
  {
    id: "wide-tables",
    question: "What should I consider when designing a table with 20 columns?",
    triggers: ["table", "column", "20", "grid", "wide"],
    shortAnswer: "Decide what people do with it, then keep their place for them.",
    explanation:
      "NN/g groups table use into four tasks: finding records, comparing data, editing a row and acting on records. With many columns, comparison is what breaks first, so freeze the header row and identifier column, let people hide and reorder columns, and show clearly when columns are hidden. WCAG's reflow rule exempts content that needs a two-dimensional layout, so horizontal scrolling inside the table is acceptable, but the page around it should still reflow.",
    checklist: [
      "First column is a human-readable identifier, and it is frozen",
      "Header row stays visible while scrolling",
      "Columns can be hidden, reordered and sorted",
      "Hidden-column and sort states are clearly indicated",
      "Row tracking aid: borders, zebra striping or hover highlight",
      "Header and cell relationships are in the markup",
    ],
    citations: [cite.nngTables, wcag("1.4.10"), wcag("1.3.1")],
    relatedSheet: "tables",
  },
  {
    id: "touch-target",
    question: "What is the minimum accessible touch target size?",
    triggers: ["touch", "target", "tap", "size", "minimum", "button"],
    shortAnswer: "24 × 24 CSS px under WCAG 2.2 AA. Platforms recommend more.",
    explanation:
      "WCAG 2.2 sets the minimum at 24 by 24 CSS pixels at Level AA, with exceptions for spacing and inline links, and 44 by 44 at Level AAA. Apple's default control size on iOS is 44 × 44 pt with a 28 × 28 pt minimum. Android guidance recommends 48 × 48 dp with at least 8 dp between targets. These are different rules for different platforms, not competing versions of one rule.",
    checklist: [
      "Never below 24 × 24 CSS px on the web",
      "44 × 44 pt as the default on iOS",
      "48 × 48 dp, 8 dp apart, on Android",
      "Small icons get a larger hit area than their visible size",
    ],
    citations: [wcag("2.5.8"), wcag("2.5.5"), cite.appleAccessibility, cite.androidTargets],
    relatedSheet: "mobile",
  },
  {
    id: "empty-states",
    question: "How should I handle empty states?",
    triggers: ["empty", "state", "blank", "no results", "zero"],
    shortAnswer: "Explain why it is empty, what belongs here and how to fill it.",
    explanation:
      "NN/g gives empty states three jobs: communicate system status, provide learning cues and provide direct pathways for key tasks. A blank area with no explanation leaves people unsure whether the system is loading, broken or simply unused.",
    checklist: [
      "Says why the area is empty",
      "Distinguishes first use from no results from still loading",
      "Explains what will appear here",
      "Offers the action that creates the first item",
    ],
    citations: [cite.nngEmptyStates],
    relatedSheet: "empty-states",
  },
  {
    id: "error-messages",
    question: "How should I write and place form error messages?",
    triggers: ["error", "validation", "message", "form", "invalid"],
    shortAnswer: "Next to the field, in words, saying how to fix it.",
    explanation:
      "WCAG requires the field in error to be identified and the error described in text, with a suggested fix where one is known. GOV.UK's pattern shows the message beside the field and repeats it in a summary at the top of the page, using the same wording in both, and keeps everything the user already typed.",
    checklist: [
      "Error is described in text, not colour alone",
      "Message sits next to the field it belongs to",
      "Says what happened and how to fix it",
      "Summary at the top links to each field",
      "No fields are cleared",
    ],
    citations: [wcag("3.3.1"), wcag("3.3.3"), cite.govukErrorMessage, cite.govukErrorSummary],
    relatedSheet: "error-states",
  },
  {
    id: "contrast",
    question: "What contrast ratio does text need?",
    triggers: ["contrast", "ratio", "colour", "color", "text"],
    shortAnswer: "4.5:1 for normal text, 3:1 for large text.",
    explanation:
      "WCAG 2.2 Level AA requires 4.5:1 for text and 3:1 for large-scale text, defined as at least 18 point or 14 point bold. UI components and meaningful parts of graphics need 3:1 against adjacent colours. Apple's guidance uses the same Level AA values.",
    checklist: [
      "Body text at 4.5:1 or higher",
      "Large text at 3:1 or higher",
      "Borders, icons and focus rings at 3:1 or higher",
      "Checked in both light and dark appearances",
    ],
    citations: [wcag("1.4.3"), wcag("1.4.11"), cite.appleAccessibility],
    relatedSheet: "accessibility",
  },
  {
    id: "authentication",
    question: "Can I block paste on a password field?",
    triggers: ["password", "paste", "login", "sign in", "authentication", "captcha"],
    shortAnswer: "No.",
    explanation:
      "WCAG 2.2 says no step of authentication may rely on a cognitive function test, such as remembering a password, unless there is an alternative or a mechanism to help. Password managers and paste are that mechanism, so blocking them fails the criterion.",
    checklist: [
      "Paste works in every authentication field",
      "Password managers can fill the form",
      "Any puzzle or memory test has an alternative",
    ],
    citations: [wcag("3.3.8")],
    relatedSheet: "forms",
  },
  {
    id: "sg-government-form",
    question: "I'm designing a government service in Singapore. What should I consider for my form?",
    context: "sg",
    triggers: ["form", "field", "mandatory", "optional", "required", "input", "consider"],
    shortAnswer: "Mark every field as mandatory or optional, then build on SGDS and WCAG.",
    explanation:
      "One Singapore control speaks to forms directly: BD-7. The Singapore Government Design System gives you a component that meets it, and WCAG, which the Digital Service Standards adopt at Levels A and AA, covers labels and errors. They carry different weight, so they are listed separately below.",
    sections: [
      {
        citation: guidanceCitation(getGuidance("bd-7")),
        points: [
          "Indicate if input fields are mandatory or optional.",
          "Recommended: consistent indicators such as asterisks, or an optional label when most fields are mandatory.",
          "Recommended: make the indicator accessible to screen readers.",
          "Not required on login pages asking for username and password.",
        ],
      },
      {
        citation: cite.sgdsInput,
        points: [
          "Always pair the input with a visible label.",
          "Do not rely on placeholder text as the only label.",
          "Mark an input as required when the form cannot be completed without it.",
          "Show error styling and a feedback message when the input is invalid.",
        ],
      },
      {
        citation: wcag("3.3.2"),
        points: ["Labels or instructions are provided when content requires user input."],
      },
      {
        citation: wcag("3.3.1"),
        points: ["When an error is detected, identify the field and describe the error in text."],
      },
    ],
    checklist: [
      "Every field shows whether it is mandatory or optional, the same way throughout",
      "The indicator is announced by screen readers, not only shown as a symbol",
      "Every field has a visible label and, where format matters, hint text",
      "Errors appear at the field, in words",
      "After login, the user's name or identifier is shown (BD-8)",
    ],
    citations: [guidanceCitation(getGuidance("bd-7")), cite.sgdsInput, wcag("3.3.2"), wcag("3.3.1")],
    relatedSheet: "forms",
  },
  {
    id: "sg-website-baseline",
    question: "What does a Singapore government website need to include?",
    context: "sg",
    triggers: ["website", "web", "baseline", "include", "need", "requirement", "search", "language", "contact", "control"],
    shortAnswer: "Nine baseline controls, BD-1 to BD-9.",
    explanation:
      "Singapore's Digital Service Standards set nine Baseline Design Practices that government agencies and their industry partners are expected to apply. Some have exceptions, noted below. The standards also adopt WCAG Levels A and AA, in separate control families.",
    sections: [
      {
        citation: {
          sourceId: "sgictss",
          label: "Digital Service Standards, Baseline Design Practices",
          url: "https://info.standards.tech.gov.sg/control-catalog/dss/bd/",
          datePublished: "2026-03-05",
          dateVerified: getGuidance("bd-1").dateVerified,
        },
        points: [
          "BD-1: responsive web design.",
          "BD-2: site search on multi-page websites (not for transactional services or mobile apps).",
          "BD-3: content in multiple languages.",
          "BD-4: clear and concise content.",
          "BD-5: search engine optimisation (not for restricted-access or beta services).",
          "BD-6: a design system or style guide, such as SGDS.",
          "BD-7: mandatory and optional fields indicated.",
          "BD-8: the logged-in user's name or identifier displayed.",
          "BD-9: at least one contact channel for help.",
        ],
      },
    ],
    checklist: [
      "Layout works from 320 px upward",
      "Search is on every page of a multi-page site",
      "Language choice is offered at the entry points",
      "One design system is named and followed",
      "A help or contact route is reachable from every page",
    ],
    citations: [guidanceCitation(getGuidance("bd-1")), guidanceCitation(getGuidance("dss-wcag"))],
  },
  {
    id: "sg-tokens",
    question: "Which SGDS token should I use?",
    context: "sg",
    triggers: ["token", "sgds", "semantic", "primitive", "variable"],
    shortAnswer: "A simplified semantic token, unless the context needs a scoped one.",
    explanation:
      "SGDS has five token layers. Its own advice is to start with simplified semantic tokens when the UI role is clear, and to reach for granular semantic tokens when a context like forms, actions or feedback needs a scoped variant.",
    checklist: [
      "Start with a simplified semantic token",
      "Move to a granular semantic token only for forms, actions or feedback variants",
      "Use component-specific tokens only to adjust one component",
      "Never reference raw values or primitive tokens directly in a screen",
    ],
    citations: [cite.sgdsTokens],
  },
  // --- Ask a Design Director ---------------------------------------------
  // Practical, review-style answers. They are Shortcut craft guidance: the
  // citations list only what official sources genuinely say on the subject.
  {
    id: "dd-padding",
    question: "How much padding should I use?",
    triggers: ["padding", "much", "card", "inside"],
    shortAnswer: "16–24 px for a standard card. Then stay consistent.",
    explanation:
      "That range gives a desktop product card room to breathe without wasting density. The exact number matters less than using the same one on every card of the same kind, and keeping it on your spacing scale.",
    director: {
      commonPractice: "8–12 px inside compact controls, 16–24 px for standard cards, 24–32 px for large content cards. Tighter on mobile.",
      whenToBreak: "Go tighter in dense tools where people compare many items. Go looser when a card holds one thing people read carefully.",
      readNext: { label: "Padding on the Spacing cheat sheet", href: "/cheat-sheets/spacing#padding" },
    },
    checklist: ["Is the value on your spacing scale?", "Do sibling cards share the same padding?", "Is the padding smaller than or equal to the gap between cards?"],
    citations: [cite.sgdsSpacing, cite.govukSpacing],
  },
  {
    id: "dd-shadow",
    question: "Does this card need a shadow?",
    triggers: ["shadow", "card", "elevation", "need"],
    shortAnswer: "Probably not.",
    explanation:
      "A shadow says this surface is above that one. A card sitting in the page flow is not above anything, so the shadow carries no information and adds visual noise.",
    director: {
      commonPractice: "Most cards sit at level 0, separated by spacing, a 1 px border or a background change. Shadows are kept for menus, popovers, sticky bars and modals.",
      whenToBreak: "Use a subtle shadow when a card overlaps other content, is being dragged, or sits on a busy background such as a map or image.",
      readNext: { label: "Elevation levels", href: "/cheat-sheets/shadows-and-borders#elevation-levels" },
    },
    checklist: ["What is this card physically above?", "Would a border or background change do the same job?", "Are you combining a strong border with a strong shadow?"],
    citations: [cite.sgdsElevation],
  },
  {
    id: "dd-feels-off",
    question: "Why does my UI feel off?",
    triggers: ["feel", "off", "wrong", "why", "ui"],
    shortAnswer: "Usually spacing and alignment, not colour or type.",
    explanation:
      "When a screen feels off but nothing is obviously broken, the cause is nearly always small inconsistencies: gaps that are almost equal, edges that almost line up, sizes that almost match. The eye notices before you can name it.",
    director: {
      commonPractice: "Check in this order: do edges share lines, are gaps on one scale, are related things closer than unrelated things, is there one clear primary action, are there too many styles.",
      whenToBreak: "If all of that is clean and it still feels off, the hierarchy may be wrong: the most prominent thing is not the most important thing.",
      readNext: { label: "Design Checks", href: "/checks" },
    },
    checklist: ["Draw a guide at the left content edge: what misses it?", "List every gap value on the screen", "Squint: is the thing you see first the most important thing?", "Count font sizes, radii and greys"],
    citations: [],
  },
  {
    id: "dd-should-be-card",
    question: "Should this be a card?",
    triggers: ["card", "should", "container", "heavy"],
    shortAnswer: "Only if it is one self-contained object.",
    explanation:
      "A card should mean: this is a single thing, such as a product, a message or a file, that people act on as a whole. Sections of a page are not objects; they are groups, and spacing with a heading shows grouping with less visual weight.",
    director: {
      commonPractice: "Cards for repeated objects in grids and lists. Headings, spacing and dividers for sections of a page.",
      whenToBreak: "Use a container when two surfaces genuinely differ in kind, such as a summary panel beside a form.",
      readNext: { label: "Do I actually need a card?", href: "/cheat-sheets/cards#do-i-need-a-card" },
    },
    checklist: ["Can spacing alone show the relationship?", "Can a section heading solve this?", "Can a divider solve this?", "Is this an independent object?"],
    citations: [],
  },
  {
    id: "dd-radius",
    question: "Is 16px radius too much?",
    triggers: ["radius", "rounded", "16px", "16", "corner", "round"],
    shortAnswer: "On a large surface, no. On buttons and fields, usually yes.",
    explanation:
      "Radius should scale with the size of the thing. 16 px on a modal or sheet reads as soft. On a 40 px button it is close to a pill, and on everything at once it is one of the most recognisable marks of templated UI.",
    director: {
      commonPractice: "6–8 px for buttons, fields and cards in product UI; 12–16 px for large surfaces; full radius for chips and avatars. Two or three values in total.",
      whenToBreak: "A consumer or brand-led product can go rounder throughout, as long as it is a system and nested corners still step down.",
      readNext: { label: "Border radius", href: "/cheat-sheets/radius#border-radius" },
    },
    checklist: ["How many radius values are on the screen?", "Do buttons and fields share a radius?", "Are inner corners smaller than outer ones?"],
    citations: [cite.sgdsBorder, cite.androidTheming],
  },
  {
    id: "dd-ai-dashboard",
    question: "Why does my dashboard look AI-generated?",
    triggers: ["ai", "generated", "dashboard", "look", "generic", "template"],
    shortAnswer: "Too many identical containers, and nothing that leads.",
    explanation:
      "The generated-dashboard look is a row of KPI tiles, a grid of same-sized rounded cards, a chart for decoration and badges everywhere. Every block has equal weight, so the screen has no point of view about what matters.",
    director: {
      commonPractice: "Lead with the one or two things the user acts on. Use a table where content is tabular. Keep containers for genuinely separate objects.",
      whenToBreak: "A monitoring wall that people glance at from a distance can legitimately be a grid of equal tiles.",
      readNext: { label: "AI-look signals", href: "/checks/ai-look" },
    },
    checklist: ["What decision does this dashboard support?", "Which number would the user miss most?", "How many cards could become a heading and spacing?", "Does every chart have a question it answers?"],
    citations: [],
  },
  {
    id: "dd-font-sizes",
    question: "How many font sizes should I use?",
    triggers: ["font", "size", "sizes", "many", "type", "typography"],
    shortAnswer: "Four to six covers most product screens.",
    explanation:
      "Hierarchy comes from clear contrast between a few levels. Sizes one or two pixels apart do not read as levels; they read as mistakes.",
    director: {
      commonPractice: "One family, two or three weights, four to six sizes: caption, body, a larger body or subtitle, section heading, page title.",
      whenToBreak: "Editorial and marketing pages need a wider scale. Dense tools sometimes need two body sizes.",
      readNext: { label: "How many sizes do you need?", href: "/cheat-sheets/typography#type-audit" },
    },
    checklist: ["Count sizes, weights, line heights and text colours", "Can two near-identical sizes merge?", "Have you tried weight, spacing or colour before a new size?"],
    citations: [cite.sgdsTypography, cite.govukTypeScale],
  },
  {
    id: "dd-white",
    question: "Should I use white or off-white?",
    triggers: ["white", "off white", "black", "pure", "background", "grey"],
    shortAnswer: "Either. Decide by what needs to sit on top of it.",
    explanation:
      "Pure white and pure black are valid. Many products soften one of them because large areas at maximum contrast feel harsh, and because an off-white page lets white cards stand out without borders.",
    director: {
      commonPractice: "Off-white page with white surfaces, or white page with bordered surfaces. Dark text slightly softened from pure black.",
      whenToBreak: "Stay with pure white when you need every bit of contrast, such as small text or bright outdoor use.",
      readNext: { label: "Pure white and pure black", href: "/cheat-sheets/colour#pure-white-and-black" },
    },
    checklist: ["Does body text still pass 4.5:1?", "Can you still tell surfaces from the background?", "Is the softened grey doing a job, or following a trend?"],
    citations: [wcag("1.4.3")],
  },
];

export const suggestedQuestions = answers.filter((a) => !a.context && !a.director).slice(0, 5).map((a) => a.question);
export const suggestedDirectorQuestions = answers.filter((a) => a.director).map((a) => a.question);
export const suggestedSgQuestions = answers.filter((a) => a.context === "sg").map((a) => a.question);
