import type { CheatSheet, Comparison, Rule, SheetGroup } from "@/types";
import { VERIFIED, cite, wcag } from "./citations";
import { craftSheets, e } from "./craft";
import { figmaSheets } from "./figma";
import { getGuidance, guidanceCitation, guidanceRule } from "./guidance";

// Rules that appear on more than one sheet are defined once and reused, so a
// correction lands everywhere.

const touchTargets: Comparison = {
  caption: "Touch target guidance by source",
  note: "Squares are drawn at 1 unit = 1 CSS px. CSS px, pt and dp are each platform's density-independent unit, so the sizes are comparable but not identical on a given device.",
  rows: [
    { sourceId: "wcag", label: "WCAG 2.2 (AA)", value: "24 × 24", unit: "CSS px", qualifier: "Minimum, with spacing and inline exceptions", size: 24, citation: wcag("2.5.8") },
    { sourceId: "wcag", label: "WCAG 2.2 (AAA)", value: "44 × 44", unit: "CSS px", qualifier: "Enhanced", size: 44, citation: wcag("2.5.5") },
    { sourceId: "apple", label: "Apple, iOS and iPadOS", value: "44 × 44", unit: "pt", qualifier: "Default control size. Minimum is 28 × 28 pt", size: 44, citation: cite.appleAccessibility },
    { sourceId: "material", label: "Android / Material", value: "48 × 48", unit: "dp", qualifier: "Recommended, with 8 dp or more between targets", size: 48, citation: cite.androidTargets },
    { sourceId: "sgds", label: "SGDS, Button", value: "Not stated", qualifier: "The Button page gives no minimum touch-target size", citation: cite.sgdsButton },
  ],
  takeaway:
    "Treat 24 × 24 CSS px as the floor that a standard requires, and the platform figures as the size to design to. SGDS states no minimum of its own on its Button page, so for a Singapore government web service the WCAG figure is the one you are held to.",
};

const textContrast: Comparison = {
  caption: "Text contrast guidance by source",
  note: "Apple's Accessibility Inspector uses the WCAG Level AA values as its guide, expressed in points.",
  rows: [
    { sourceId: "wcag", label: "WCAG 2.2 (AA), normal text", value: "4.5:1", qualifier: "Minimum", citation: wcag("1.4.3") },
    { sourceId: "wcag", label: "WCAG 2.2 (AA), large text", value: "3:1", qualifier: "At least 18 point, or 14 point bold", citation: wcag("1.4.3") },
    { sourceId: "apple", label: "Apple, text up to 17 pt", value: "4.5:1", qualifier: "Minimum, all weights", citation: cite.appleAccessibility },
    { sourceId: "apple", label: "Apple, text at 18 pt, or bold at any size", value: "3:1", qualifier: "Minimum", citation: cite.appleAccessibility },
  ],
};

const mandatoryFields: Comparison = {
  caption: "Mandatory and optional fields by source",
  note: "These carry different weight. The Singapore control applies to government services; GOV.UK and SGDS describe their own systems; WCAG is the accessibility standard the others build on.",
  rows: [
    { sourceId: "sgictss", label: "Singapore Government, BD-7", value: "Indicate if input fields are mandatory or optional", qualifier: "Recommends asterisks for mandatory fields, or an optional label when most fields are mandatory", citation: guidanceCitation(getGuidance("bd-7")) },
    { sourceId: "sgds", label: "SGDS, Input", value: "Mark an input as required when the form cannot be completed without a value", qualifier: "Component has a required state", citation: cite.sgdsInput },
    { sourceId: "govuk", label: "GOV.UK, Question pages", value: "Add (optional) to the labels of optional fields", qualifier: "Never mark mandatory fields with asterisks", citation: cite.govukQuestionPages },
    { sourceId: "wcag", label: "WCAG 2.2 (A), SC 3.3.2", value: "Labels or instructions are provided when content requires user input", qualifier: "Does not prescribe how to mark required fields", citation: wcag("3.3.2") },
  ],
  takeaway:
    "The sources disagree on asterisks: Singapore's control recommends them and GOV.UK rules them out. They agree that people must be able to tell which fields can be skipped. Labelling the optional fields in words satisfies all four when most fields are mandatory, and is the safest default. On a Singapore government service, BD-7 is the one that binds.",
};

const r = {
  contrastNormal: {
    id: "contrast-normal-text",
    title: "Normal text",
    value: "4.5:1",
    body: "Text and images of text need a contrast ratio of at least 4.5:1 against their background. Logos and inactive components are exempt.",
    citations: [wcag("1.4.3")],
  },
  contrastLarge: {
    id: "contrast-large-text",
    title: "Large text",
    value: "3:1",
    body: "Large-scale text needs at least 3:1. WCAG defines large as at least 18 point, or 14 point bold.",
    citations: [wcag("1.4.3")],
  },
  contrastNonText: {
    id: "contrast-ui-and-graphics",
    title: "UI components and graphics",
    value: "3:1",
    body: "The visual information needed to identify a component and its states, and the parts of a graphic needed to understand it, need at least 3:1 against adjacent colours.",
    citations: [wcag("1.4.11")],
  },
  colourAlone: {
    id: "colour-not-alone",
    title: "Colour is never the only signal",
    body: "Do not use colour as the only way to convey information, indicate an action, prompt a response or distinguish an element. Pair it with text, an icon or a pattern.",
    citations: [wcag("1.4.1")],
  },
  targetSize: {
    id: "touch-target-size",
    title: "Touch target size",
    body: "There is no single number. WCAG sets a floor for the web; Apple and Android recommend larger targets for their platforms. Design to the platform you are shipping on, and never below the WCAG minimum.",
    citations: [wcag("2.5.8"), wcag("2.5.5"), cite.appleAccessibility, cite.androidTargets],
    comparison: touchTargets,
    viewportApplicability: ["all"],
    input: ["touch", "pointer"],
  },
  keyboard: {
    id: "keyboard-operable",
    title: "Everything works from a keyboard",
    body: "All functionality must be operable through a keyboard interface, without requiring specific timings for individual keystrokes.",
    citations: [wcag("2.1.1")],
  },
  noTrap: {
    id: "no-keyboard-trap",
    title: "Focus can always leave",
    body: "If keyboard focus can move into a component, it must be possible to move it out again using only the keyboard. If that takes a non-standard key, tell the user.",
    citations: [wcag("2.1.2")],
  },
  focusOrder: {
    id: "focus-order",
    title: "Focus order preserves meaning",
    body: "When a page is navigated sequentially, components receive focus in an order that preserves meaning and operability.",
    citations: [wcag("2.4.3")],
  },
  focusVisible: {
    id: "focus-visible",
    title: "Focus is visible",
    body: "Any keyboard-operable interface has a mode of operation where the keyboard focus indicator is visible.",
    citations: [wcag("2.4.7")],
  },
  focusNotObscured: {
    id: "focus-not-obscured",
    title: "Focus is not hidden behind other content",
    body: "When a component receives keyboard focus, it must not be entirely hidden by author-created content such as sticky headers, footers or cookie banners.",
    citations: [wcag("2.4.11")],
  },
  hoverFocus: {
    id: "content-on-hover-or-focus",
    title: "Content that appears on hover or focus",
    body: "It must be dismissible without moving the pointer or focus, hoverable so the pointer can move onto it without it disappearing, and persistent until the user dismisses it or the trigger is removed.",
    citations: [wcag("1.4.13")],
  },
  reflow: {
    id: "reflow",
    title: "Reflow",
    value: "320 px",
    body: "Content must work at a width equivalent to 320 CSS pixels without scrolling in two directions. Parts that need a two-dimensional layout for usage or meaning are exempt.",
    citations: [wcag("1.4.10")],
    viewportApplicability: ["all"],
  },
  resize: {
    id: "resize-text",
    title: "Text resize",
    value: "200%",
    body: "Text can be resized up to 200 percent without assistive technology and without loss of content or functionality.",
    citations: [wcag("1.4.4")],
  },
  textSpacing: {
    id: "text-spacing",
    title: "Text spacing overrides",
    value: "1.5×",
    body: "Nothing may break when users set line height to 1.5 times the font size, paragraph spacing to 2 times, letter spacing to 0.12 times and word spacing to 0.16 times.",
    citations: [wcag("1.4.12")],
  },
  orientation: {
    id: "orientation",
    title: "Orientation",
    body: "Do not lock content to portrait or landscape unless a specific orientation is essential.",
    citations: [wcag("1.3.4")],
    viewportApplicability: ["all"],
  },
  dragging: {
    id: "dragging-alternative",
    title: "Dragging has a single-pointer alternative",
    body: "Anything operated by dragging must also be achievable with a single pointer without dragging, unless dragging is essential.",
    citations: [wcag("2.5.7")],
  },
  gestures: {
    id: "pointer-gestures",
    title: "Gestures have a simple alternative",
    body: "Anything that uses a multipoint or path-based gesture, such as pinch or swipe, must also work with a single pointer without a path-based gesture.",
    citations: [wcag("2.5.1")],
  },
  auth: {
    id: "accessible-authentication",
    title: "Accessible authentication",
    body: "No step of signing in may require a cognitive function test, such as remembering a password or solving a puzzle, unless there is an alternative method or a mechanism to help, such as allowing password managers and paste.",
    citations: [wcag("3.3.8")],
  },
  labels: {
    id: "labels-or-instructions",
    title: "Labels or instructions",
    body: "Provide labels or instructions whenever content requires user input.",
    citations: [wcag("3.3.2")],
  },
  inputPurpose: {
    id: "identify-input-purpose",
    title: "Input purpose is machine-readable",
    body: "Fields that collect information about the user must expose their purpose programmatically, so browsers can autofill them.",
    citations: [wcag("1.3.5")],
  },
  redundantEntry: {
    id: "redundant-entry",
    title: "Do not ask twice",
    body: "Information the user has already entered in the same process is either auto-populated or available to select, unless re-entering it is essential or needed for security.",
    citations: [wcag("3.3.7")],
  },
  errorId: {
    id: "error-identification",
    title: "Say which field is wrong, in text",
    body: "When an input error is detected automatically, identify the item in error and describe the error to the user in text.",
    citations: [wcag("3.3.1")],
  },
  errorSuggest: {
    id: "error-suggestion",
    title: "Suggest the fix",
    body: "If an input error is detected and a correction is known, provide the suggestion to the user.",
    citations: [wcag("3.3.3")],
  },
  errorPrevent: {
    id: "error-prevention",
    title: "High-stakes submissions can be undone, checked or confirmed",
    body: "For legal commitments, financial transactions and changes to user data, at least one must be true: the submission is reversible, the data is checked and can be corrected, or the user can review and confirm before finalising.",
    citations: [wcag("3.3.4")],
  },
  errorNextToField: {
    id: "error-message-placement",
    title: "Show the message next to the field",
    body: "GOV.UK puts the error message after the question and hint text, in red, with a red border connecting it to the question. Do not clear any fields: keep both passing and failing answers.",
    citations: [cite.govukErrorMessage],
  },
  errorSummary: {
    id: "error-summary",
    title: "Summarise errors at the top",
    body: "GOV.UK always shows an error summary when there is a validation error, even if there is only one. It sits above the h1, links each error to its field, receives keyboard focus, and the page title is prefixed with \"Error: \".",
    citations: [cite.govukErrorSummary],
  },
  errorWriting: {
    id: "error-message-writing",
    title: "Write errors that say what happened and how to fix it",
    body: "Use plain English and get to the point. Be specific to the error type instead of \"An error occurred\". Avoid jargon, and avoid \"please\", \"sorry\", \"valid\" and \"invalid\". Use the same wording next to the field and in the summary.",
    citations: [cite.govukErrorMessage],
  },
  statusMessages: {
    id: "status-messages",
    title: "Status messages reach assistive technology",
    body: "Messages such as \"Saved\" or \"3 results\" must be exposed through a role or property so screen readers announce them without moving focus.",
    citations: [wcag("4.1.3")],
  },
  mandatory: {
    id: "mandatory-and-optional-fields",
    title: "Mandatory and optional fields",
    body: "Every source wants the status of a field to be clear. They differ on how to show it, and on how much weight their advice carries.",
    citations: [guidanceCitation(getGuidance("bd-7")), cite.sgdsInput, cite.govukQuestionPages, wcag("3.3.2")],
    comparison: mandatoryFields,
  },
  tableStructure: {
    id: "table-structure",
    title: "Structure is in the markup",
    body: "Information, structure and relationships conveyed visually, such as which header belongs to which cell, must be programmatically determinable or available in text.",
    citations: [wcag("1.3.1")],
  },
} satisfies Record<string, Rule>;

const sourcedSheets: CheatSheet[] = [
  {
    slug: "accessibility",
    title: "Accessibility",
    description: "The numbers and rules designers reach for most: contrast, targets, keyboard and focus.",
    dateUpdated: VERIFIED,
    sections: [
      {
        id: "colour-contrast",
        title: "Colour contrast",
        rules: [
          r.contrastNormal,
          r.contrastLarge,
          r.contrastNonText,
          {
            id: "contrast-by-source",
            title: "Where sources agree",
            body: "Apple does not set its own ratios. It points to the WCAG Level AA values, restated in points for native text sizes.",
            citations: [wcag("1.4.3"), cite.appleAccessibility],
            comparison: textContrast,
          },
          r.colourAlone,
        ],
      },
      { id: "touch-targets", title: "Touch targets", rules: [r.targetSize] },
      { id: "keyboard", title: "Keyboard navigation", rules: [r.keyboard, r.noTrap, r.focusOrder] },
      { id: "focus", title: "Focus states", rules: [r.focusVisible, r.focusNotObscured] },
      { id: "hover-and-focus", title: "Tooltips and popovers", rules: [r.hoverFocus] },
      { id: "text", title: "Text and zoom", rules: [r.resize, r.reflow, r.textSpacing] },
      { id: "sign-in", title: "Sign-in", rules: [r.auth] },
    ],
  },
  {
    slug: "forms",
    title: "Forms",
    description: "Control height, labels, validation, field states and not asking for the same thing twice.",
    dateUpdated: VERIFIED,
    viewportSensitivity: "partial",
    component: {
      anatomy: ["Label", "Required or optional marker", "Hint text", "Control", "Error message"],
      states: ["Empty", "Filled", "Focus", "Error", "Disabled", "Read-only", "Loading", "Success"],
      edgeCases: ["Very long label", "Long translated error", "Pasted value with spaces", "Autofill styling", "A form abandoned halfway"],
      checklist: ["Every field has a visible label", "Required or optional is shown the same way throughout", "Errors appear at the field, in words", "Nothing typed is lost on error", "The whole form works by keyboard", "Fields and buttons share one height"],
    },
    sections: [
      { id: "layout", title: "Size and layout", rules: [], entries: [e.inputHeight, e.formLayout, e.formStates] },
      { id: "fields", title: "Fields", rules: [r.labels, r.mandatory, guidanceRule("sgds-input"), r.inputPurpose, r.redundantEntry] },
      { id: "validation", title: "Validation", rules: [r.errorId, r.errorSuggest, r.errorNextToField, r.errorSummary] },
      { id: "submitting", title: "Submitting", rules: [r.errorPrevent, r.auth] },
    ],
  },
  {
    slug: "tables",
    title: "Tables",
    description: "Design data tables around what people do with them, then choose a pattern for each viewport.",
    dateUpdated: VERIFIED,
    viewportSensitivity: "high",
    sections: [
      { id: "viewports", title: "Across viewports", rules: [], entries: [e.tablePatterns] },
      {
        id: "tasks",
        title: "Start from the task",
        rules: [
          {
            id: "four-table-tasks",
            title: "Four things people do with a table",
            value: "4 tasks",
            body: "Find records that fit specific criteria. Compare data. View, edit or add a single row's data. Take actions on records. Decide which of these your table has to serve before choosing features.",
            citations: [cite.nngTables],
          },
          {
            id: "table-finding",
            title: "Finding records",
            body: "Put a human-readable record identifier in the first column, order columns by importance to users, and make filters discoverable, quick and powerful.",
            citations: [cite.nngTables],
          },
          {
            id: "table-comparing",
            title: "Comparing data",
            body: "Freeze header rows and columns. Help the eye track rows with borders, zebra striping or hover highlighting. Let people hide, reorder and sort columns, and show clearly when they have.",
            citations: [cite.nngTables],
          },
          {
            id: "table-editing",
            title: "Editing a row",
            body: "Options are edit-in-place, a modal, a nonmodal panel or an accordion. NN/g recommends nonmodal solutions so the rest of the table stays available for reference.",
            citations: [cite.nngTables],
          },
          {
            id: "table-actions",
            title: "Acting on records",
            body: "Inline actions work for one or two options. For more, use checkboxes with batch actions, and include Select all where it applies.",
            citations: [cite.nngTables],
          },
        ],
      },
      { id: "accessibility", title: "Accessibility", rules: [r.tableStructure, r.reflow, r.colourAlone] },
    ],
  },
  {
    slug: "modals",
    title: "Modals",
    description: "When interrupting is justified, how wide to make it at each viewport, and how to keep keyboard users in control.",
    dateUpdated: VERIFIED,
    viewportSensitivity: "high",
    sections: [
      { id: "size", title: "Size and pattern", rules: [], entries: [e.modalWidth, e.overlayChoice] },
      {
        id: "when",
        title: "When to use one",
        rules: [
          {
            id: "modal-use",
            title: "Use a modal for",
            body: "Important warnings that prevent or correct critical errors, and requests for information that is critical to continuing the current process.",
            citations: [cite.nngModals],
          },
          {
            id: "modal-avoid",
            title: "Avoid a modal for",
            body: "Nonessential information unrelated to the current flow, interruptions to high-stakes processes such as checkout, and decisions that need information the modal hides.",
            citations: [cite.nngModals],
          },
          {
            id: "modal-width",
            title: "Width",
            body: "None of the sources Shortcut tracks sets a required modal width. The hard constraint is reflow: the dialog must still work at 320 CSS pixels wide.",
            citations: [wcag("1.4.10")],
          },
        ],
      },
      { id: "keyboard", title: "Keyboard and focus", rules: [r.noTrap, r.focusOrder, r.focusNotObscured] },
    ],
  },
  {
    slug: "navigation",
    title: "Navigation",
    description: "What stays visible at each viewport, plus consistency, wayfinding and keyboard access.",
    dateUpdated: VERIFIED,
    viewportSensitivity: "high",
    sections: [
      { id: "viewports", title: "Across viewports", rules: [], entries: [e.navPatterns] },
      {
        id: "consistency",
        title: "Consistency",
        rules: [
          {
            id: "consistent-navigation",
            title: "Repeated navigation keeps its order",
            body: "Navigation that repeats across pages appears in the same relative order each time, unless the user changes it.",
            citations: [wcag("3.2.3")],
          },
          {
            id: "consistent-help",
            title: "Help stays in the same place",
            body: "If contact details, a contact mechanism or self-help options repeat across pages, they appear in the same order relative to other content.",
            citations: [wcag("3.2.6")],
          },
          guidanceRule("bd-9"),
          guidanceRule("bd-8"),
        ],
      },
      {
        id: "wayfinding",
        title: "Wayfinding",
        rules: [
          {
            id: "multiple-ways",
            title: "More than one way to a page",
            body: "Offer more than one way to locate a page within a set, for example navigation plus search. Steps in a process are exempt.",
            citations: [wcag("2.4.5")],
          },
          guidanceRule("bd-2"),
          {
            id: "bypass-blocks",
            title: "Skip repeated blocks",
            body: "Provide a mechanism, such as a skip link, to bypass blocks of content that repeat on multiple pages.",
            citations: [wcag("2.4.1")],
          },
          {
            id: "link-purpose",
            title: "Links say where they go",
            body: "The purpose of each link can be determined from its text alone, or from the text together with its surrounding context.",
            citations: [wcag("2.4.4")],
          },
        ],
      },
      { id: "keyboard", title: "Keyboard", rules: [r.keyboard, r.focusOrder, r.focusVisible, r.focusNotObscured] },
    ],
  },
  {
    slug: "mobile",
    title: "Mobile",
    description: "Target sizes by platform, gestures and orientation.",
    dateUpdated: VERIFIED,
    viewportSensitivity: "partial",
    sections: [
      { id: "targets", title: "Touch targets", rules: [r.targetSize] },
      { id: "gestures", title: "Gestures", rules: [r.gestures, r.dragging] },
      { id: "layout", title: "Layout", rules: [r.orientation, r.reflow, r.resize, guidanceRule("bd-1")] },
    ],
  },
  {
    slug: "dashboards",
    title: "Dashboards",
    description: "Charts, status colours and dense tables that stay readable.",
    dateUpdated: VERIFIED,
    sections: [
      {
        id: "charts",
        title: "Charts and status",
        rules: [
          r.colourAlone,
          r.contrastNonText,
          r.statusMessages,
        ],
      },
      {
        id: "tables",
        title: "Tables inside dashboards",
        rules: [
          {
            id: "dashboard-tables",
            title: "Keep headers and identifiers in view",
            body: "Freeze header rows and columns, and put a human-readable identifier in the first column, so people can compare values without losing their place.",
            citations: [cite.nngTables],
          },
          r.reflow,
        ],
      },
    ],
  },
  {
    slug: "ux-writing",
    title: "UX Writing",
    description: "Headings, labels, links, errors and tooltips that say what they mean.",
    dateUpdated: VERIFIED,
    sections: [
      {
        id: "labels",
        title: "Headings, labels and links",
        rules: [
          {
            id: "headings-and-labels",
            title: "Headings and labels describe topic or purpose",
            body: "A heading or label should tell the user what the section or field is about without needing the surrounding content.",
            citations: [wcag("2.4.6")],
          },
          {
            id: "label-in-name",
            title: "Visible label matches the accessible name",
            body: "For components with a visible text label, the accessible name contains that text, so speech-input users can say what they see.",
            citations: [wcag("2.5.3")],
          },
          {
            id: "link-text",
            title: "Link text stands on its own",
            body: "The purpose of each link can be determined from the link text, or the text plus its context. \"Read more\" on its own rarely passes.",
            citations: [wcag("2.4.4")],
          },
        ],
      },
      { id: "errors", title: "Errors", rules: [r.errorWriting, r.errorSuggest] },
      { id: "plain-language", title: "Plain language and languages", rules: [guidanceRule("bd-4"), guidanceRule("bd-3")] },
      {
        id: "tooltips",
        title: "Tooltips",
        rules: [
          {
            id: "tooltip-content",
            title: "Brief, helpful and never vital",
            body: "Do not put information that is vital to completing the task in a tooltip. Keep tooltip content brief and helpful.",
            citations: [cite.nngTooltips],
          },
        ],
      },
    ],
  },
  {
    slug: "empty-states",
    title: "Empty States",
    description: "What an empty screen should tell people, teach them and let them do.",
    dateUpdated: VERIFIED,
    sections: [
      {
        id: "guidelines",
        title: "Three jobs of an empty state",
        rules: [
          {
            id: "empty-system-status",
            title: "Communicate system status",
            body: "Say why the area is empty: nothing has been created yet, the content is still loading, or a search or filter returned nothing.",
            citations: [cite.nngEmptyStates],
          },
          {
            id: "empty-learning-cues",
            title: "Provide learning cues",
            body: "Use the space to explain what will appear here and how it gets populated.",
            citations: [cite.nngEmptyStates],
          },
          {
            id: "empty-direct-pathways",
            title: "Provide direct pathways for key tasks",
            body: "Give people the action that fills the space, such as creating the first item.",
            citations: [cite.nngEmptyStates],
          },
        ],
      },
      { id: "accessibility", title: "Accessibility", rules: [r.statusMessages] },
    ],
  },
  {
    slug: "error-states",
    title: "Error States",
    description: "Identify the problem, explain it in words and help people recover.",
    dateUpdated: VERIFIED,
    sections: [
      { id: "identify", title: "Identify", rules: [r.errorId, r.colourAlone, r.errorNextToField, r.errorSummary] },
      { id: "explain", title: "Explain", rules: [r.errorWriting, r.errorSuggest] },
      { id: "prevent", title: "Prevent", rules: [r.errorPrevent] },
    ],
  },
  {
    slug: "ux-research",
    title: "UX Research",
    description: "Choosing a method for the phase you are in, and how many people to test with.",
    dateUpdated: VERIFIED,
    sections: [
      {
        id: "choosing",
        title: "Choosing a method",
        rules: [
          {
            id: "method-dimensions",
            title: "Three questions that place any method",
            value: "3 axes",
            body: "Attitudinal or behavioural: what people say or what they do. Qualitative or quantitative: observed directly or measured indirectly. Context of use: natural, scripted, limited or decontextualised.",
            citations: [cite.nngMethods],
          },
          {
            id: "methods-by-phase",
            title: "Methods by product phase",
            body: "Strategise, to find new directions: field studies, diary studies, interviews, surveys, concept testing. Design, to improve usability: card sorting, tree testing, usability testing. Launch and assess, to measure performance: benchmarking, A/B testing, analytics, surveys.",
            citations: [cite.nngMethods],
          },
        ],
      },
      {
        id: "sample-size",
        title: "How many participants",
        rules: [
          {
            id: "five-users",
            title: "Qualitative usability tests",
            value: "5 users",
            body: "NN/g's long-standing advice is to test with no more than 5 users and run as many small tests as you can afford, for example three studies of 5 instead of one study of 15. With several highly distinct user groups, test 3 to 4 users per group for two groups, or 3 per group for three or more.",
            citations: [cite.nngFiveUsers],
          },
        ],
      },
    ],
  },
  {
    slug: "design-handoff",
    title: "Design Handoff",
    description: "What Figma's Dev Mode gives you for marking, annotating and tracking handoff.",
    dateUpdated: VERIFIED,
    sections: [
      {
        id: "dev-mode",
        title: "Figma Dev Mode",
        rules: [
          {
            id: "ready-for-dev",
            title: "Mark what is ready",
            body: "Frames, components, instances and sections can be marked ready for dev. Developers get a view of everything marked ready in the file, and are notified when a design is marked.",
            citations: [cite.figmaDevMode],
          },
          {
            id: "annotations",
            title: "Annotate what must not be missed",
            body: "Annotations surface important properties and attach text notes directly to the design. Measurements help developers see spacing and sizing.",
            citations: [cite.figmaDevMode],
          },
          {
            id: "compare-changes",
            title: "Show what changed",
            body: "Compare changes shows a frame's version history, and instances can be compared against their main component.",
            citations: [cite.figmaDevMode],
          },
        ],
      },
      { id: "specify", title: "What to specify", rules: [r.focusVisible, r.focusOrder, r.targetSize] },
    ],
  },
  {
    slug: "responsive-design",
    title: "Responsive & Viewports",
    description: "Viewports, breakpoints, fluid layout, touch and pointer, foldables, and the widths a layout has to survive.",
    dateUpdated: "2026-10-09",
    viewportSensitivity: "high",
    sections: [
      { id: "viewports", title: "Viewports and breakpoints", rules: [], entries: [e.viewportVsPixels, e.breakpoints] },
      { id: "fluid", title: "Fluid layout and priority", rules: [], entries: [e.mobileFirst, e.fluidLayout, e.contentPriority] },
      { id: "input", title: "Touch and pointer", rules: [], entries: [e.touchVsPointer] },
      { id: "foldables", title: "Foldables", rules: [], entries: [e.foldables] },
      { id: "reflow", title: "Reflow and zoom", rules: [r.reflow, r.resize, r.textSpacing] },
      { id: "singapore", title: "Singapore government services", rules: [guidanceRule("bd-1"), guidanceRule("sgds-breakpoints")] },
      { id: "orientation", title: "Orientation and input", rules: [r.orientation, r.targetSize] },
    ],
  },
];

// Sourced sheets that describe a component; the rest are patterns and standards.
const componentSheets = new Set(["forms", "tables", "modals", "navigation"]);

/** Every cheat sheet: editorial foundations and components first, then the sourced sheets. */
export const cheatSheets: CheatSheet[] = [
  ...craftSheets,
  ...figmaSheets,
  ...sourcedSheets.map((sheet) => ({
    ...sheet,
    group: (componentSheets.has(sheet.slug) ? "Components" : "Patterns and standards") as SheetGroup,
  })),
];

export const sheetGroups: SheetGroup[] = ["Foundations", "Components", "Patterns and standards", "Figma"];

/** Topics from the brief that are not written yet. Listed so the gap is visible. */
export const plannedSheets: string[] = [];

export function getCheatSheet(slug: string): CheatSheet | undefined {
  return cheatSheets.find((s) => s.slug === slug);
}

/** Slugs shown as quick links on Home, in the order the brief lists them. */
export const popularSheets = [
  "spacing",
  "typography",
  "colour",
  "radius",
  "buttons",
  "forms",
  "cards",
  "tables",
  "accessibility",
  "design-handoff",
];
