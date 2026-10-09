import type { Citation, Guidance, Rule } from "@/types";
import { VERIFIED, cite, wcag } from "./citations";

/**
 * Singapore guidance. `officialText`, `officialRecommendation`, `rationale`,
 * `appliesTo` and `exceptions` restate the source, checked on VERIFIED.
 * `summary`, `designerTakeaway`, `accessibilityNotes` and `example` are
 * Shortcut's words and are labelled as such wherever they appear.
 */

const BD_URL = "https://info.standards.tech.gov.sg/control-catalog/dss/bd/";
const DSS_URL = "https://info.standards.tech.gov.sg/control-catalog/dss/";
const BD_UPDATED = "2026-03-05";

const DSS_APPLIES =
  "Government agencies and their industry partners engaged in the design, development or delivery of government digital services.";

type ControlInput = Pick<
  Guidance,
  "controlId" | "title" | "category" | "officialText" | "summary" | "designerTakeaway"
> &
  Partial<Guidance>;

/** A Baseline Design Practices control. Shared fields are filled in once here. */
function control(input: ControlInput): Guidance {
  return {
    id: input.controlId!.toLowerCase(),
    context: "sg",
    jurisdiction: "Singapore",
    organisation: "Singapore Government",
    sourceId: "sgictss",
    sourceType: "government-control",
    contentType: "Control",
    requirementLevel: "requirement",
    appliesTo: DSS_APPLIES,
    dateUpdated: BD_UPDATED,
    dateVerified: VERIFIED,
    sourceUrl: BD_URL,
    ...input,
  };
}

type SgdsInput = Pick<Guidance, "id" | "title" | "contentType" | "officialText" | "summary" | "designerTakeaway" | "sourceUrl"> &
  Partial<Guidance>;

function sgds(input: SgdsInput): Guidance {
  return {
    context: "sg",
    jurisdiction: "Singapore",
    organisation: "GovTech Singapore",
    sourceId: "sgds",
    sourceType: "design-system",
    requirementLevel: "design-system-guidance",
    category: "sgds",
    dateVerified: VERIFIED,
    ...input,
  };
}

export const guidance: Guidance[] = [
  control({
    controlId: "BD-1",
    title: "Responsive Web Design",
    category: "responsive-design",
    officialText:
      "Adopt Responsive Web Design for web-based digital services. If specific content is deemed unsuitable for mobile devices, disable mobile device access, and clearly explain why the content or service is disabled and how it can be accessed.",
    officialRecommendation:
      "Implement Responsive Web Design techniques to ensure web-based digital services are optimised for various devices and screen sizes.",
    rationale:
      "A significant amount of web traffic comes from mobile devices. Responsive Web Design allows for optimised browsing experience on devices with different screen sizes.",
    summary:
      "Web services should adapt to the screen they are on. If something truly cannot work on a phone, block it there on purpose and tell people why and where to go instead.",
    designerTakeaway:
      "Design the small-screen layout first. For anything you decide not to offer on mobile, design the explanation screen too: it is part of the control, not an edge case.",
    accessibilityNotes:
      "WCAG's reflow rule sets the testable floor: content must work at 320 CSS pixels wide without scrolling in two directions.",
    example: "A dense reporting table that is disabled on phones shows a message naming the reason and pointing to the desktop version.",
    related: [wcag("1.4.10")],
    keywords: "mobile breakpoint adaptive",
  }),
  control({
    controlId: "BD-2",
    title: "Site Search",
    category: "navigation",
    officialText: "Provide a site search function for multi-page websites.",
    officialRecommendation:
      "Implement a site search function like SearchSG. Make it easily accessible and discoverable. Regularly review search analytics to optimise the search functionality based on user behaviour and needs.",
    exceptions: "Not required for mobile applications, transactional services, or websites where search is the service.",
    rationale: "Search is a known and effective alternative to navigation for users who know what they are looking for.",
    summary: "Any website with more than one page needs a search that people can find easily.",
    designerTakeaway:
      "Put search where people expect it, on every page. Ask for the search logs: the terms people type show what your navigation fails to surface.",
    accessibilityNotes: "Search also satisfies WCAG's requirement to offer more than one way to reach a page.",
    related: [wcag("2.4.5")],
    keywords: "searchsg website find",
  }),
  control({
    controlId: "BD-3",
    title: "Support multiple languages",
    category: "content",
    officialText: "Provide content in multiple languages to accommodate language preferences.",
    officialRecommendation:
      "Implement language selection mechanisms at key entry points, such as login or homepage, or select language based on device setting.",
    rationale:
      "Allowing end users to select their preferred language enhances usability and inclusivity, allowing broader access and understanding.",
    summary: "Offer content in more than one language, and let people choose early.",
    designerTakeaway:
      "Place the language switch at the entry points, not buried in a footer. Design every layout to survive longer and shorter translated text.",
    example: "A language selector on the homepage and the login page, with the choice remembered across the service.",
    keywords: "multilingual translation language selector localisation website",
  }),
  control({
    controlId: "BD-4",
    title: "Clear and Concise Content",
    category: "content",
    officialText:
      "Write in a clear and concise manner that is easy to read and understand; Choose simple words that most people can understand.",
    officialRecommendation:
      "Conduct user testing to validate that content is clear and accessible to your target audience. Readability formulas such as Flesch Reading Ease or Flesch-Kincaid grade level provide an indication of the difficulty of text and identify areas for simplification.",
    rationale:
      "Writing in a simple and concise manner allows more users with different backgrounds and language proficiency to understand your content.",
    summary: "Use plain, short wording, and check it with real users instead of assuming it is clear.",
    designerTakeaway:
      "Treat copy as part of the design review. Run a readability score to find the hardest passages, then test those passages with users.",
    keywords: "plain language writing readability copy ux writing",
  }),
  control({
    controlId: "BD-5",
    title: "Search Engine Optimisation",
    category: "government-digital-services",
    officialText:
      "Implement Search Engine Optimisation (SEO) best practices to improve website search engine rankings and results.",
    officialRecommendation:
      "Fill out all metadata fields and optimise your website's meta tags. Check that information presented on the search engine results page such as page titles and abstracts are informative and relevant.",
    exceptions: "Not required for restricted-access services and experimental or beta services.",
    rationale:
      "SEO increases the findability and reach of web content by helping search platforms effectively crawl your content and optimising the content displayed in search listings.",
    summary: "Public pages should be findable through search engines, with titles and descriptions that make sense in a results list.",
    designerTakeaway:
      "Write the page title and description as part of each page design. They are the first screen most people see of your service.",
    keywords: "seo metadata page title",
  }),
  control({
    controlId: "BD-6",
    title: "Consistent UI Design",
    category: "design-systems",
    officialText:
      "Use a design system or style guide to maintain a consistent user interface design throughout the entire service.",
    officialRecommendation: "Use a design system such as the Singapore Government Design System (SGDS).",
    rationale:
      "Consistent design and placement of interface components improves usability by allowing end users to quickly learn interface patterns. Design systems or style guides help with consistency and scalability.",
    summary: "Build the whole service from one design system or style guide. SGDS is the suggested one, not the only one allowed.",
    designerTakeaway:
      "Name the system your service follows at the start of the project, and record any place you depart from it and why.",
    keywords: "design system style guide consistency sgds",
  }),
  control({
    controlId: "BD-7",
    title: "Mandatory and Optional Fields",
    category: "forms",
    officialText: "Indicate if input fields are mandatory or optional.",
    officialRecommendation:
      "Use consistent visual indicators, such as asterisks (*) for mandatory fields. Providing an 'optional' label for optional fields is a good alternative if majority of the fields are mandatory. Ensure these indicators are accessible to screen readers.",
    exceptions: "Not required for login pages requesting username and password.",
    rationale:
      "Reduces completion time by allowing end users to skip unnecessary fields and increases completion rates by helping end users understand the effort required.",
    summary: "Every form field should show whether it has to be filled in. Pick one way of showing it and use it everywhere.",
    designerTakeaway:
      "If most fields are mandatory, label the optional ones instead of adding an asterisk to nearly every field. Whichever you choose, put the status in text a screen reader announces.",
    accessibilityNotes:
      "An asterisk alone is a visual symbol. Pair it with a programmatic required state or the word in the label, so the indicator is not conveyed by appearance only.",
    example: "A form where 8 of 10 fields are needed marks only the two others as \"Email (optional)\" and \"Company (optional)\".",
    related: [wcag("3.3.2"), wcag("1.3.1")],
    keywords: "required asterisk form requirements",
  }),
  control({
    controlId: "BD-8",
    title: "Log-in Indication",
    category: "government-digital-services",
    officialText: "Prominently display the name or identifier of the individual associated with the account after login.",
    officialRecommendation:
      "Display the end user's name or identifier in a clear, accessible location, such as the header or near the top of the page.",
    rationale:
      "Provides a clear indication that the end user is logged into the right account. This is especially important for shared devices.",
    summary: "Once someone has logged in, show whose account it is, where they will see it.",
    designerTakeaway:
      "Keep the name or identifier in the header on every signed-in page, next to the way to log out. Decide how it truncates on small screens.",
    keywords: "login signed in account header singpass",
  }),
  control({
    controlId: "BD-9",
    title: "Contact Channels",
    category: "government-digital-services",
    officialText: "Provide at least one contact channel for help or assistance.",
    officialRecommendation: "Implement contact channels such as phone numbers, email, contact forms, live chat.",
    rationale:
      "Allow end users to contact the relevant parties if they require help or assistance. Reassures users by providing a clear method to acquire information or resolve issues.",
    summary: "People must always have at least one way to reach a human or get help.",
    designerTakeaway:
      "Put the help route in the same place on every page, and make sure it is reachable from error and dead-end screens.",
    accessibilityNotes: "WCAG asks that help mechanisms repeated across pages keep the same relative position.",
    related: [wcag("3.2.6")],
    keywords: "help support contact us",
  }),
  {
    id: "dss-wcag",
    title: "Digital Service Standards adopt WCAG Levels A and AA",
    context: "sg",
    jurisdiction: "Singapore",
    organisation: "Singapore Government",
    sourceId: "sgictss",
    sourceType: "government-control",
    contentType: "Guideline",
    category: "accessibility",
    requirementLevel: "requirement",
    officialText:
      "The Digital Service Standards incorporate Web Content Accessibility Guidelines (WCAG) Levels A and AA, organised into four control families: WCAG: Perceivable (WP), Operable (WO), Understandable (WU) and Robust (WR).",
    appliesTo: DSS_APPLIES,
    summary:
      "For Singapore government services, accessibility is defined by WCAG at Levels A and AA, carried into the standards as their own control families.",
    designerTakeaway:
      "Use Shortcut's WCAG-based cheat sheets as your working reference, then check the matching control in the official catalogue before sign-off.",
    keywords: "singapore accessibility a11y wcag government",
    dateUpdated: "2026-03-26",
    dateVerified: VERIFIED,
    sourceUrl: DSS_URL,
  },
  sgds({
    id: "sgds-tokens",
    title: "Token architecture",
    contentType: "Foundation",
    officialText:
      "SGDS organises tokens into five types: raw values, primitive tokens, simplified semantic tokens, granular semantic tokens and component-specific tokens. \"Start with simplified semantic tokens when the UI role is clear. Reach for granular semantic tokens when a context like forms, actions, or feedback needs a scoped variant.\"",
    summary: "Five layers, from hard-coded values up to tokens scoped to one component. Day-to-day design work happens in the two semantic layers.",
    designerTakeaway:
      "Reach for a simplified semantic token first. Go more specific only when a form, action or feedback context needs its own variant.",
    keywords: "design tokens primitive semantic variables",
    sourceUrl: cite.sgdsTokens.url,
  }),
  sgds({
    id: "sgds-breakpoints",
    title: "Breakpoints",
    contentType: "Foundation",
    category: "responsive-design",
    officialText:
      "Six breakpoint tokens: xs 320 to 511, sm 512 to 767, md 768 to 1023, lg 1024 to 1279, xl 1280 to 1439 and 2-xl 1440 and above. \"Designers should create outputs for at least three key sizes: mobile (320px), tablet (768px), and desktop (1440px) for development.\"",
    summary: "SGDS names six width ranges and asks designers to deliver at least three sizes.",
    designerTakeaway: "Hand off at 320, 768 and 1440 pixels as a minimum, and say what happens between them.",
    keywords: "responsive grid layout screen sizes",
    sourceUrl: cite.sgdsBreakpoint.url,
  }),
  sgds({
    id: "sgds-colour",
    title: "Colour",
    contentType: "Foundation",
    officialText:
      "\"Choose colour combinations with enough contrast for text, icons, and controls.\" \"Skip at least one step in the colour scale when pairing foreground and background colours.\" \"Use the same colour for the same role across the interface.\" Colour tokens are organised as primitive colours and semantic colours.",
    summary: "SGDS gives working rules for pairing colours but, on this page, no contrast ratio of its own.",
    designerTakeaway: "Use the semantic colour tokens for their stated role, and check pairings against the WCAG ratios.",
    accessibilityNotes: "The ratios to test against come from WCAG: 4.5:1 for text, 3:1 for large text and for UI components.",
    related: [wcag("1.4.3"), wcag("1.4.11")],
    keywords: "color palette contrast",
    sourceUrl: cite.sgdsColour.url,
  }),
  sgds({
    id: "sgds-button",
    title: "Button",
    contentType: "Component",
    officialText:
      "Three variants: Primary action, Outline and Ghost. Four tones: Brand (default), Neutral, Danger and Fixed light. Four sizes: Extra small, Small, Medium (default) and Large. \"Use a clear action label.\" \"Do not use button for navigation when a link would be clearer.\"",
    summary: "Variant sets the hierarchy, tone sets the meaning, and medium is the size for most actions.",
    designerTakeaway: "Use one primary-variant button for the main action, and a link, not a button, when the result is navigation.",
    accessibilityNotes: "The Button page does not state a minimum touch-target size. Use the WCAG minimum as the floor.",
    related: [wcag("2.5.8")],
    keywords: "cta action",
    sourceUrl: cite.sgdsButton.url,
  }),
  sgds({
    id: "sgds-input",
    title: "Input",
    contentType: "Component",
    category: "forms",
    officialText:
      "\"Always pair the input with a visible label so users know what to enter, even after they have typed.\" \"Do not rely on placeholder text as the only label.\" \"Use hint text to clarify the expected value.\" \"Mark an input as required when the form cannot be completed without a value.\" \"Show error styling and a feedback message when the input is invalid.\"",
    summary: "A visible label always, hint text for format, a required state where needed, and a message alongside the error styling.",
    designerTakeaway: "Specify label, hint, required state and error message for every field in the design, not only the default state.",
    related: [wcag("3.3.2"), wcag("3.3.1")],
    keywords: "text field form validation error message required",
    sourceUrl: cite.sgdsInput.url,
  }),
];

const byId = new Map(guidance.map((g) => [g.id, g]));

export function getGuidance(id: string): Guidance {
  return byId.get(id)!;
}

/** The citation that points at a guidance record's source. */
export function guidanceCitation(g: Guidance): Citation {
  return {
    sourceId: g.sourceId,
    label: g.controlId ? `Baseline Design Practices, ${g.controlId} ${g.title}` : `SGDS, ${g.title}`,
    url: g.sourceUrl,
    datePublished: g.dateUpdated,
    dateVerified: g.dateVerified,
    requirementLevel: g.requirementLevel,
  };
}

/** A guidance record shaped as a cheat-sheet rule, so it can sit beside global rules. */
export function guidanceRule(id: string): Rule {
  const g = getGuidance(id);
  return {
    id: g.id,
    title: g.title,
    value: g.controlId,
    body: `${g.summary} ${g.designerTakeaway}`,
    citations: [guidanceCitation(g), ...(g.related ?? [])],
    context: g.context,
    guidanceId: g.id,
  };
}

/** Topics on the Singapore UX page, in display order. */
export const sgTopics = [
  { id: "government-digital-services", title: "Government Digital Services", sheet: undefined },
  { id: "accessibility", title: "Accessibility", sheet: "accessibility" },
  { id: "forms", title: "Forms", sheet: "forms" },
  { id: "content", title: "Content", sheet: "ux-writing" },
  { id: "navigation", title: "Navigation", sheet: "navigation" },
  { id: "responsive-design", title: "Responsive Design", sheet: "responsive-design" },
  { id: "design-systems", title: "Design Systems", sheet: undefined },
  { id: "sgds", title: "SGDS", sheet: undefined },
  { id: "service-design", title: "Service Design", sheet: undefined },
] as const;
