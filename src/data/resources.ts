import type { Resource, ResourceIntent } from "@/types";

// A short, opinionated list per need. Descriptions are Shortcut's own one-line
// summaries; they make no claims that need a verification date.

export const intents: ResourceIntent[] = [
  { id: "icons", need: "icons" },
  { id: "a11y-testing", need: "accessibility testing" },
  { id: "colour", need: "colour tools" },
  { id: "research", need: "UX research" },
  { id: "inspiration", need: "inspiration" },
  { id: "usability-testing", need: "usability testing" },
  { id: "prototyping", need: "prototyping tools" },
  { id: "design-systems", need: "design-system references" },
];

export const resources: Resource[] = [
  { id: "lucide", name: "Lucide", description: "Clean open-source icon library with consistent stroke weights.", intentId: "icons", category: "Icons", url: "https://lucide.dev/" },
  { id: "phosphor", name: "Phosphor", description: "Flexible icon family with multiple weights.", intentId: "icons", category: "Icons", url: "https://phosphoricons.com/" },
  { id: "material-symbols", name: "Material Symbols", description: "Google's icon library, adjustable by weight, fill and grade.", intentId: "icons", category: "Icons", url: "https://fonts.google.com/icons" },

  { id: "axe", name: "axe DevTools", description: "Browser extension that runs automated accessibility checks on a page.", intentId: "a11y-testing", category: "Accessibility", url: "https://www.deque.com/axe/devtools/" },
  { id: "wave", name: "WAVE", description: "Overlays accessibility errors and structure directly on the page.", intentId: "a11y-testing", category: "Accessibility", url: "https://wave.webaim.org/" },
  { id: "accessibility-insights", name: "Accessibility Insights", description: "Microsoft's guided manual and automated tests, including tab-stop visualisation.", intentId: "a11y-testing", category: "Accessibility", url: "https://accessibilityinsights.io/" },

  { id: "webaim-contrast", name: "WebAIM Contrast Checker", description: "Type two colours, get the contrast ratio and the WCAG pass or fail.", intentId: "colour", category: "Colour", url: "https://webaim.org/resources/contrastchecker/" },
  { id: "leonardo", name: "Leonardo", description: "Adobe's tool for generating colour scales from target contrast ratios.", intentId: "colour", category: "Colour", url: "https://leonardocolor.io/" },
  { id: "coolors", name: "Coolors", description: "Fast palette generator for early exploration.", intentId: "colour", category: "Colour", url: "https://coolors.co/" },

  { id: "nng-articles", name: "NN/g Articles", description: "Evidence-based articles on usability and research methods.", intentId: "research", category: "Research", url: "https://www.nngroup.com/articles/" },
  { id: "baymard-blog", name: "Baymard Blog", description: "Large-scale usability research, strongest on e-commerce.", intentId: "research", category: "Research", url: "https://baymard.com/blog" },
  { id: "govuk-user-research", name: "GOV.UK Service Manual: User research", description: "Practical guides to planning, running and analysing research.", intentId: "research", category: "Research", url: "https://www.gov.uk/service-manual/user-research" },

  { id: "mobbin", name: "Mobbin", description: "Searchable library of real app screens and flows.", intentId: "inspiration", category: "Inspiration", url: "https://mobbin.com/" },
  { id: "page-flows", name: "Page Flows", description: "Recorded user flows from shipping products.", intentId: "inspiration", category: "Inspiration", url: "https://pageflows.com/" },
  { id: "refero", name: "Refero", description: "Web and app screenshots organised by page type and pattern.", intentId: "inspiration", category: "Inspiration", url: "https://refero.design/" },

  { id: "maze", name: "Maze", description: "Unmoderated tests on prototypes, with task-level metrics.", intentId: "usability-testing", category: "Testing", url: "https://maze.co/" },
  { id: "lookback", name: "Lookback", description: "Moderated and unmoderated sessions with recording and notes.", intentId: "usability-testing", category: "Testing", url: "https://www.lookback.com/" },
  { id: "usertesting", name: "UserTesting", description: "Participant panel and recorded think-aloud sessions.", intentId: "usability-testing", category: "Testing", url: "https://www.usertesting.com/" },

  { id: "figma", name: "Figma", description: "Design and prototype in the same file your team already uses.", intentId: "prototyping", category: "Prototyping", url: "https://www.figma.com/" },
  { id: "framer", name: "Framer", description: "Prototypes that are real, publishable websites.", intentId: "prototyping", category: "Prototyping", url: "https://www.framer.com/" },
  { id: "protopie", name: "ProtoPie", description: "High-fidelity interactions with sensors, variables and logic.", intentId: "prototyping", category: "Prototyping", url: "https://www.protopie.io/" },

  { id: "govuk-ds", name: "GOV.UK Design System", description: "Components and patterns with the research behind each one.", intentId: "design-systems", category: "Design systems", url: "https://design-system.service.gov.uk/" },
  { id: "sgds", name: "Singapore Government Design System", description: "Foundations, components, templates and blocks for Singapore government products.", intentId: "design-systems", category: "Design systems", url: "https://www.designsystem.tech.gov.sg/", context: "sg" },
  { id: "sg-dss", name: "Singapore Digital Service Standards", description: "The official control catalogue for Singapore government digital services.", intentId: "design-systems", category: "Standards", url: "https://info.standards.tech.gov.sg/control-catalog/dss/", context: "sg" },
  { id: "material-3", name: "Material Design 3", description: "Google's design system for Android and the web.", intentId: "design-systems", category: "Design systems", url: "https://m3.material.io/" },
  { id: "apple-hig", name: "Apple Human Interface Guidelines", description: "Platform conventions for iOS, iPadOS, macOS, watchOS and visionOS.", intentId: "design-systems", category: "Design systems", url: "https://developer.apple.com/design/human-interface-guidelines/" },
  { id: "fluent-2", name: "Fluent 2", description: "Microsoft's design system for Windows, web and Microsoft 365.", intentId: "design-systems", category: "Design systems", url: "https://fluent2.microsoft.design/" },
];
