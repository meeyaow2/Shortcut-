import type { Citation } from "@/types";

/**
 * The day the claims in this folder were last checked against the live pages.
 * Bump it only after re-checking; the freshness labels are computed from it.
 */
export const VERIFIED = "2026-10-07";

// WCAG 2.2, W3C Recommendation, 12 December 2024 edition.
const WCAG_PUBLISHED = "2024-12-12";

const criteria = {
  "1.3.1": ["Info and Relationships", "info-and-relationships"],
  "1.3.4": ["Orientation", "orientation"],
  "1.3.5": ["Identify Input Purpose", "identify-input-purpose"],
  "1.4.1": ["Use of Color", "use-of-color"],
  "1.4.3": ["Contrast (Minimum)", "contrast-minimum"],
  "1.4.4": ["Resize Text", "resize-text"],
  "1.4.10": ["Reflow", "reflow"],
  "1.4.11": ["Non-text Contrast", "non-text-contrast"],
  "1.4.12": ["Text Spacing", "text-spacing"],
  "1.4.13": ["Content on Hover or Focus", "content-on-hover-or-focus"],
  "2.1.1": ["Keyboard", "keyboard"],
  "2.1.2": ["No Keyboard Trap", "no-keyboard-trap"],
  "2.4.1": ["Bypass Blocks", "bypass-blocks"],
  "2.4.3": ["Focus Order", "focus-order"],
  "2.4.4": ["Link Purpose (In Context)", "link-purpose-in-context"],
  "2.4.5": ["Multiple Ways", "multiple-ways"],
  "2.4.6": ["Headings and Labels", "headings-and-labels"],
  "2.4.7": ["Focus Visible", "focus-visible"],
  "2.4.11": ["Focus Not Obscured (Minimum)", "focus-not-obscured-minimum"],
  "2.5.1": ["Pointer Gestures", "pointer-gestures"],
  "2.5.3": ["Label in Name", "label-in-name"],
  "2.5.5": ["Target Size (Enhanced)", "target-size-enhanced"],
  "2.5.7": ["Dragging Movements", "dragging-movements"],
  "2.5.8": ["Target Size (Minimum)", "target-size-minimum"],
  "3.2.3": ["Consistent Navigation", "consistent-navigation"],
  "3.2.6": ["Consistent Help", "consistent-help"],
  "3.3.1": ["Error Identification", "error-identification"],
  "3.3.2": ["Labels or Instructions", "labels-or-instructions"],
  "3.3.3": ["Error Suggestion", "error-suggestion"],
  "3.3.4": ["Error Prevention (Legal, Financial, Data)", "error-prevention-legal-financial-data"],
  "3.3.7": ["Redundant Entry", "redundant-entry"],
  "3.3.8": ["Accessible Authentication (Minimum)", "accessible-authentication-minimum"],
  "4.1.3": ["Status Messages", "status-messages"],
} as const;

export type Criterion = keyof typeof criteria;

/** Citation for a WCAG 2.2 success criterion. */
export function wcag(sc: Criterion): Citation {
  const [title, anchor] = criteria[sc];
  return {
    sourceId: "wcag",
    label: `WCAG 2.2, SC ${sc} ${title}`,
    url: `https://www.w3.org/TR/WCAG22/#${anchor}`,
    datePublished: WCAG_PUBLISHED,
    dateVerified: VERIFIED,
  };
}

export const cite = {
  appleAccessibility: {
    sourceId: "apple",
    label: "Apple HIG, Accessibility",
    url: "https://developer.apple.com/design/human-interface-guidelines/accessibility",
    dateVerified: VERIFIED,
  },
  androidTargets: {
    sourceId: "material",
    label: "Android Accessibility Help, Touch target size (cites Material Design)",
    url: "https://support.google.com/accessibility/android/answer/7101858",
    dateVerified: VERIFIED,
  },
  govukErrorMessage: {
    sourceId: "govuk",
    label: "GOV.UK Design System, Error message",
    url: "https://design-system.service.gov.uk/components/error-message/",
    dateVerified: VERIFIED,
  },
  govukErrorSummary: {
    sourceId: "govuk",
    label: "GOV.UK Design System, Error summary",
    url: "https://design-system.service.gov.uk/components/error-summary/",
    dateVerified: VERIFIED,
  },
  nngTooltips: {
    sourceId: "nng",
    label: "NN/g, Tooltip Guidelines",
    url: "https://www.nngroup.com/articles/tooltip-guidelines/",
    datePublished: "2019-01-27",
    dateVerified: VERIFIED,
  },
  nngEmptyStates: {
    sourceId: "nng",
    label: "NN/g, Designing Empty States in Complex Applications: 3 Guidelines",
    url: "https://www.nngroup.com/articles/empty-state-interface-design/",
    datePublished: "2021-09-19",
    dateVerified: VERIFIED,
  },
  nngTables: {
    sourceId: "nng",
    label: "NN/g, Data Tables: Four Major User Tasks",
    url: "https://www.nngroup.com/articles/data-tables/",
    datePublished: "2022-04-03",
    dateVerified: VERIFIED,
  },
  nngModals: {
    sourceId: "nng",
    label: "NN/g, Modal & Nonmodal Dialogs: When (& When Not) to Use Them",
    url: "https://www.nngroup.com/articles/modal-nonmodal-dialog/",
    datePublished: "2017-04-23",
    dateVerified: VERIFIED,
  },
  nngMethods: {
    sourceId: "nng",
    label: "NN/g, When to Use Which User-Experience Research Methods",
    url: "https://www.nngroup.com/articles/which-ux-research-methods/",
    datePublished: "2022-07-17",
    dateVerified: VERIFIED,
  },
  nngFiveUsers: {
    sourceId: "nng",
    label: "NN/g, Why You Only Need to Test with 5 Users",
    url: "https://www.nngroup.com/articles/why-you-only-need-to-test-with-5-users/",
    datePublished: "2000-03-18",
    dateVerified: VERIFIED,
  },
  figmaDevMode: {
    sourceId: "figma",
    label: "Figma Help, Guide to Dev Mode",
    url: "https://help.figma.com/hc/en-us/articles/15023124644247-Guide-to-Dev-Mode",
    dateVerified: VERIFIED,
  },
  govukQuestionPages: {
    sourceId: "govuk",
    label: "GOV.UK Design System, Question pages",
    url: "https://design-system.service.gov.uk/patterns/question-pages/",
    dateVerified: VERIFIED,
  },
  govukButton: {
    sourceId: "govuk",
    label: "GOV.UK Design System, Button",
    url: "https://design-system.service.gov.uk/components/button/",
    dateVerified: VERIFIED,
  },
  govukLayout: {
    sourceId: "govuk",
    label: "GOV.UK Design System, Layout, and GOV.UK Frontend Sass API ($govuk-breakpoints)",
    url: "https://design-system.service.gov.uk/styles/layout/",
    dateVerified: VERIFIED,
  },
  govukColour: {
    sourceId: "govuk",
    label: "GOV.UK Design System, Colour",
    url: "https://design-system.service.gov.uk/styles/colour/",
    dateVerified: VERIFIED,
  },
  appleButtons: {
    sourceId: "apple",
    label: "Apple HIG, Buttons",
    url: "https://developer.apple.com/design/human-interface-guidelines/buttons",
    dateVerified: VERIFIED,
  },
  appleLayout: {
    sourceId: "apple",
    label: "Apple HIG, Layout",
    url: "https://developer.apple.com/design/human-interface-guidelines/layout",
    dateVerified: VERIFIED,
  },
  appleColor: {
    sourceId: "apple",
    label: "Apple HIG, Color",
    url: "https://developer.apple.com/design/human-interface-guidelines/color",
    dateVerified: VERIFIED,
  },
  appleTextFields: {
    sourceId: "apple",
    label: "Apple HIG, Text fields",
    url: "https://developer.apple.com/design/human-interface-guidelines/text-fields",
    dateVerified: VERIFIED,
  },
  // Material's own site could not be read for checking, so Material entries
  // cite Google's Android developer documentation for Material 3 instead.
  androidWindowSizes: {
    sourceId: "material",
    label: "Android Developers, Use window size classes",
    url: "https://developer.android.com/develop/ui/compose/layouts/adaptive/use-window-size-classes",
    dateVerified: VERIFIED,
  },
  androidButton: {
    sourceId: "material",
    label: "Android Developers, Material 3 Button",
    url: "https://developer.android.com/develop/ui/compose/components/button",
    dateVerified: VERIFIED,
  },
  androidTheming: {
    sourceId: "material",
    label: "Android Developers, Material Design 3 in Compose",
    url: "https://developer.android.com/develop/ui/compose/designsystems/material3",
    dateVerified: VERIFIED,
  },
  androidValidate: {
    sourceId: "material",
    label: "Android Developers, Validate input as the user types",
    url: "https://developer.android.com/develop/ui/compose/quick-guides/content/validate-input",
    dateVerified: VERIFIED,
  },
  sgdsTokens: {
    sourceId: "sgds",
    label: "SGDS, Token architecture",
    url: "https://www.designsystem.tech.gov.sg/foundations/token-architecture",
    dateVerified: VERIFIED,
  },
  sgdsBreakpoint: {
    sourceId: "sgds",
    label: "SGDS, Layout, Breakpoint",
    url: "https://www.designsystem.tech.gov.sg/foundations/layout/breakpoint",
    dateVerified: VERIFIED,
  },
  sgdsColour: {
    sourceId: "sgds",
    label: "SGDS, Colour",
    url: "https://www.designsystem.tech.gov.sg/foundations/colour",
    dateVerified: VERIFIED,
  },
  sgdsButton: {
    sourceId: "sgds",
    label: "SGDS, Button",
    url: "https://www.designsystem.tech.gov.sg/components/button",
    dateVerified: VERIFIED,
  },
  sgdsInput: {
    sourceId: "sgds",
    label: "SGDS, Input",
    url: "https://www.designsystem.tech.gov.sg/components/input",
    dateVerified: VERIFIED,
  },
  sgdsSpacing: {
    sourceId: "sgds",
    label: "SGDS, Spacing",
    url: "https://www.designsystem.tech.gov.sg/foundations/spacing",
    dateVerified: VERIFIED,
  },
  sgdsBorder: {
    sourceId: "sgds",
    label: "SGDS, Border",
    url: "https://www.designsystem.tech.gov.sg/foundations/border",
    dateVerified: VERIFIED,
  },
  sgdsElevation: {
    sourceId: "sgds",
    label: "SGDS, Elevation",
    url: "https://www.designsystem.tech.gov.sg/foundations/elevation",
    dateVerified: VERIFIED,
  },
  sgdsTypography: {
    sourceId: "sgds",
    label: "SGDS, Typography",
    url: "https://www.designsystem.tech.gov.sg/foundations/typography",
    dateVerified: VERIFIED,
  },
  govukSpacing: {
    sourceId: "govuk",
    label: "GOV.UK Design System, Spacing",
    url: "https://design-system.service.gov.uk/styles/spacing/",
    dateVerified: VERIFIED,
  },
  govukTypeScale: {
    sourceId: "govuk",
    label: "GOV.UK Design System, Type scale",
    url: "https://design-system.service.gov.uk/styles/type-scale/",
    dateVerified: VERIFIED,
  },
} satisfies Record<string, Citation>;
