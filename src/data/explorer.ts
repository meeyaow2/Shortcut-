import type { Citation, ExplorerTopic, SourceId } from "@/types";
import { VERIFIED, cite } from "./citations";
import { viewportCite } from "./viewports";

/** Systems compared in the Explorer, in column order. */
export const explorerSystems: SourceId[] = ["sgds", "material", "apple", "govuk", "atlassian", "carbon", "primer", "uswds", "fluent"];

/** How many systems are shown side by side at once. */
export const MAX_COMPARED = 4;

/**
 * `points` restate each system's documentation, checked on the citation's
 * verified date. `takeaway` is Shortcut's synthesis. A cell marked `none`
 * records that the system publishes nothing on the topic, with the index page
 * that shows it. A missing cell means that system has not been read on that
 * topic yet. `themes` and `differences` are Shortcut's reading of the cells
 * and may only repeat what a cell already says.
 * Material cells cite Google's Android developer documentation, because
 * Material's own site could not be read for checking.
 */
export const explorerTopics: ExplorerTopic[] = [
  {
    id: "design-tokens",
    title: "Design tokens",
    kind: "Foundation",
    status: "verified",
    summary: "How each system names and layers its design decisions, and which layer designers are meant to work in.",
    cells: {
      sgds: {
        headline: "Five token layers",
        points: [
          "Raw values, primitive tokens, simplified semantic tokens, granular semantic tokens, component-specific tokens.",
          "Start with simplified semantic tokens when the UI role is clear.",
          "Use granular semantic tokens when forms, actions or feedback need a scoped variant.",
        ],
        citation: cite.sgdsTokens,
      },
      material: {
        headline: "Theme subsystems: colour scheme, typography, shapes",
        points: [
          "Colour is assigned by role, such as primary, on-primary, surface and on-surface.",
          "Type scale has five categories, each in large, medium and small.",
          "Shape scale runs from extra small (4 dp) to extra large (24 dp).",
          "This developer page does not use the word token.",
        ],
        citation: cite.androidTheming,
      },
      apple: {
        headline: "Dynamic system colours, defined by purpose",
        points: [
          "Each dynamic colour is defined by its purpose, not its appearance or value.",
          "Avoid hard-coding system colour values; they can change between releases.",
          "Do not redefine a semantic colour's meaning, such as using the separator colour for text.",
          "The Color page does not use the word token.",
        ],
        citation: cite.appleColor,
      },
      govuk: {
        headline: "Sass functions: functional colours and a palette",
        points: [
          "Functional colours such as text, link, border, focus and error are named by use.",
          "Only use a functional colour in the context it was designed for.",
          "Otherwise reference the palette directly: red, not the error colour.",
          "The Colour page does not use the word token.",
        ],
        citation: cite.govukColour,
      },
      atlassian: {
        headline: "Names in up to three parts",
        points: [
          "A token is a name and value pairing for a small, repeatable design decision.",
          "Names are built from foundation, property and modifier, as in color.icon.success.",
          "Choose tokens by meaning, not by a specific value.",
          "Do not pick a token because its colour looks like a match; that can break other themes.",
        ],
        citation: read("atlassian", "Atlassian Design System, Design tokens", "https://atlassian.design/foundations/tokens/design-tokens"),
      },
      carbon: {
        headline: "Core tokens and component tokens",
        points: [
          "Colour tokens are split into core tokens and component tokens.",
          "A component token should never be used for anything other than its own component.",
          "Layer tokens are numbered, for surfaces that sit on top of one another.",
          "The page includes a set of tokens for AI.",
        ],
        citation: read("carbon", "Carbon, Color tokens", "https://carbondesignsystem.com/elements/color/tokens/"),
      },
      uswds: {
        headline: "A limited set of discrete options",
        points: [
          "Describes design tokens as a limited set of discrete options.",
          "Publishes palettes of tokens for typography, spacing units and colour.",
        ],
        citation: read("uswds", "USWDS, Design tokens", "https://designsystem.digital.gov/design-tokens/"),
      },
    },
    takeaway:
      "Every system here separates what a value is from what it is for, whatever it calls that. Work in the purpose-named layer, and never borrow a purpose-named value for a different job because the colour happens to match. SGDS documents the fullest hierarchy on the pages checked.",
    themes: [
      "Choose by purpose, not by value. SGDS, Atlassian, Apple and GOV.UK each say so in their own words.",
      "A value made for one job stays in that job. GOV.UK says it of functional colours, Carbon of component tokens, Apple of semantic colours.",
    ],
    differences: [
      "Layers: SGDS documents five. Carbon splits colour tokens into core and component. Atlassian describes the parts of a name instead of layers.",
      "Vocabulary: the Material, Apple and GOV.UK pages checked do not use the word token.",
      "Framing: USWDS presents tokens as a way to limit choice. The others present them as a way to name decisions.",
      "Not read on this topic: Primer and Fluent.",
    ],
  },
  {
    id: "breakpoints",
    title: "Breakpoints",
    kind: "Viewport",
    status: "verified",
    summary: "Where each system says a layout should change, and in what unit.",
    cells: {
      sgds: {
        headline: "Six ranges, from 320 px",
        points: [
          "xs 320 to 511, sm 512 to 767, md 768 to 1023, lg 1024 to 1279, xl 1280 to 1439, 2-xl 1440 and above.",
          "Designers should deliver at least mobile (320 px), tablet (768 px) and desktop (1440 px).",
        ],
        citation: cite.sgdsBreakpoint,
      },
      material: {
        headline: "Five window size classes, in dp",
        points: [
          "Compact: under 600 dp. Medium: 600 to under 840 dp. Expanded: 840 to under 1200 dp.",
          "Large: 1200 to under 1600 dp. Extra-large: 1600 dp and above.",
          "Classes describe the window, not the device.",
        ],
        citation: cite.androidWindowSizes,
      },
      apple: {
        headline: "Size classes, no pixel breakpoints",
        points: [
          "Each dimension is compact or regular; the system sets the class.",
          "Determine layout from size classes, not device type or orientation.",
          "Keep functionality the same as size classes change.",
        ],
        citation: cite.appleLayout,
      },
      govuk: {
        headline: "Three breakpoints, 1020 px page width",
        points: [
          "Mobile 320 px, tablet 641 px, desktop 769 px.",
          "Default maximum page width is 1020 px.",
          "Design for small screens first, with a single-column layout.",
        ],
        citation: cite.govukLayout,
      },
      atlassian: {
        headline: "Six breakpoints, by viewport width",
        points: [
          "xxs 320 to 479, xs 480 to 767, s 768 to 1023, m 1024 to 1439, l 1440 to 1767, xl 1768 px and above.",
          "Columns go from 2 on mobile to 6 on tablet and 12 on desktop.",
          "Margins are 16 px up to 1023 px and 32 px from 1024 px.",
          "Design for at least two device sizes, and always include mobile.",
        ],
        citation: viewportCite.atlassianGrid,
      },
      primer: {
        headline: "Three viewport ranges, then breakpoints",
        points: [
          "Narrow, under 768 px: a single column. Regular, from 768 px: up to two. Wide, from 1400 px: up to three.",
          "Viewport ranges set the layout; breakpoints are for fine-tuning.",
          "Breakpoint sizes include 320, 544, 768, 1012 and 1280 px.",
          "Pages should adapt to smaller screens without loss of functionality.",
        ],
        citation: viewportCite.primerLayout,
      },
      uswds: {
        headline: "Minimum-width breakpoints, 12 columns",
        points: [
          "The grid container is centred with a default maximum width of 1024 px.",
          "Side padding is 2 units at narrow widths and 4 units at desktop and wider.",
          "Grid breakpoints are minimum-width media queries: a tablet rule also applies at every wider size.",
          "A row has 12 possible columns.",
        ],
        citation: viewportCite.uswdsGrid,
      },
    },
    takeaway:
      "The numbers differ because the units and platforms differ, so do not copy one system's breakpoints into another. What they agree on: design for the space available, start small, and keep the same functionality at every size. For a Singapore government web service, SGDS's 320, 768 and 1440 are the sizes to hand off.",
  },
  {
    id: "button",
    title: "Button",
    kind: "Component",
    status: "verified",
    summary: "How each system expresses button hierarchy, and what it says about using more than one.",
    cells: {
      sgds: {
        headline: "Variant, tone and size",
        points: [
          "Variants: Primary action, Outline, Ghost.",
          "Tones: Brand (default), Neutral, Danger, Fixed light.",
          "Sizes: Extra small, Small, Medium (default), Large.",
          "Do not use a button for navigation when a link would be clearer.",
        ],
        citation: cite.sgdsButton,
      },
      material: {
        headline: "Five types by emphasis",
        points: [
          "Filled: high emphasis, for primary actions such as submit and save.",
          "Filled tonal and elevated: significant actions with less weight.",
          "Outlined: medium emphasis, for secondary actions such as Cancel or Back.",
          "Text: low emphasis, for less critical actions.",
        ],
        citation: cite.androidButton,
      },
      apple: {
        headline: "Prominence by style, not size",
        points: [
          "Use a prominent style for the most likely action in a view.",
          "Keep prominent buttons to one or two per view.",
          "A button needs a hit region of at least 44 × 44 pt.",
          "Do not give the primary role to a destructive action.",
        ],
        citation: cite.appleButtons,
      },
      govuk: {
        headline: "Default, secondary, warning, start, inverse",
        points: [
          "Use a default button for the main call to action on a page.",
          "Avoid multiple default buttons on a single page.",
          "Warning buttons are for destructive actions that cannot easily be undone, used very sparingly.",
          "Avoid disabled buttons if possible.",
        ],
        citation: cite.govukButton,
      },
      atlassian: {
        headline: "One primary button per page or area",
        points: [
          "Only include one primary button or call to action in a page or area.",
          "Avoid disabling buttons. A disabled button does not explain why it cannot be used.",
          "Labels start with an action verb, stay short and have no punctuation.",
          "Buttons are for actions. Links navigate.",
        ],
        citation: read("atlassian", "Atlassian Design System, Button usage", "https://atlassian.design/components/button/usage"),
      },
      carbon: {
        headline: "Five kinds, seven sizes",
        points: [
          "Kinds: primary, secondary, tertiary, ghost and danger.",
          "Each page should have only one primary button.",
          "Buttons come in seven sizes.",
        ],
        citation: read("carbon", "Carbon, Button usage", "https://carbondesignsystem.com/components/button/usage/"),
      },
      primer: {
        headline: "Secondary is the everyday button",
        points: [
          "Most buttons should be the secondary variant.",
          "Use one primary button per page when possible.",
          "An inactive button is offered as an accessible alternative to a disabled one.",
          "Labels are in sentence case.",
        ],
        citation: read("primer", "Primer, Button guidelines", "https://primer.style/product/components/button/guidelines/"),
      },
      uswds: {
        headline: "For the most important actions",
        points: [
          "Use buttons for the most important actions.",
          "Avoid using too many buttons on a page.",
          "Labels are in sentence case.",
          "Explain why an action is unavailable.",
          "Keep a visible focus state.",
        ],
        citation: read("uswds", "USWDS, Button", "https://designsystem.digital.gov/components/button/"),
      },
      fluent: {
        headline: "One primary button in a layout",
        points: [
          "Only use one primary button in a layout, for the most important action.",
          "If more than two buttons have equal priority, give them all neutral backgrounds.",
          "Use buttons for important actions. For navigating to another place, use a link.",
          "Button text must pass 4.5:1 contrast and icons 3:1, in all interactive states.",
        ],
        citation: viewportCite.fluentButton,
      },
    },
    takeaway:
      "Most of these systems limit how many high-emphasis buttons share a view: one for GOV.UK, Atlassian, Carbon and Primer, one or two for Apple. Decide the single most likely action per screen and give only that the strongest style. Keep destructive actions out of the default position.",
    themes: [
      "A cap on the strongest button. GOV.UK, Atlassian, Carbon, Primer and Fluent say one per page, area or layout. Apple says one or two per view. USWDS says to avoid too many, without a number.",
      "Doubt about disabled buttons. GOV.UK and Atlassian advise against them, Primer offers an inactive button instead, and USWDS says to explain why an action is unavailable.",
      "Buttons act, links navigate. SGDS and Atlassian both say so.",
    ],
    differences: [
      "How hierarchy is expressed: SGDS combines variant, tone and size. Material has five types by emphasis. Carbon has five kinds. Apple uses style, not size.",
      "The default: Primer treats secondary as the everyday button. GOV.UK calls its main button the default.",
      "Label rules differ in what they cover: Primer and USWDS specify sentence case, Atlassian an action verb with no punctuation.",
      "Only Apple's page gives a minimum hit region here, 44 by 44 pt.",
    ],
  },
  {
    id: "error-message",
    title: "Error message",
    kind: "Component",
    status: "verified",
    summary: "Where each system puts a field error, and when it says to validate.",
    cells: {
      sgds: {
        headline: "Error styling plus a feedback message",
        points: [
          "Show error styling and a feedback message when the input is invalid.",
          "Use hint text to clarify the expected value.",
          "Always pair the input with a visible label.",
        ],
        citation: cite.sgdsInput,
      },
      material: {
        headline: "Error state with supporting text",
        points: [
          "The text field's error state gives a visual indicator.",
          "The message appears as supporting text under the field.",
          "The official example validates as the user types.",
        ],
        citation: cite.androidValidate,
      },
      apple: {
        headline: "Validate when it makes sense",
        points: [
          "For an email address, validate when people switch to another field.",
          "For a user name or password, validate before people switch to another field.",
          "The Text fields page gives no guidance on how an error message should look.",
        ],
        citation: cite.appleTextFields,
      },
      govuk: {
        headline: "Message at the field, repeated in a summary",
        points: [
          "Put the message after the question and hint text, in red, with a red border.",
          "Describe what happened and how to fix it, in plain English.",
          "Use the same wording in the error summary at the top of the page.",
          "Do not clear any fields.",
        ],
        citation: cite.govukErrorMessage,
      },
    },
    takeaway:
      "All four put the message at the field. They differ on timing: the Android example validates while typing, Apple varies it by field, and GOV.UK's pattern assumes validation on submit with a summary. Choose timing per field type, always say how to fix the problem, and keep what the user typed.",
  },
  {
    id: "colour",
    title: "Colour",
    kind: "Foundation",
    status: "verified",
    summary: "How each system organises colour, and what it tells you about using it.",
    cells: {
      sgds: {
        headline: "Primitive and semantic colours, with pairing rules",
        points: [
          "Choose combinations with enough contrast for text, icons and controls.",
          "Skip at least one step in the colour scale when pairing foreground and background.",
          "Use the same colour for the same role across the interface.",
        ],
        citation: cite.sgdsColour,
      },
      material: {
        headline: "A colour scheme of roles",
        points: [
          "Primary is for main components such as prominent buttons and active states.",
          "Each role has an on-colour for content placed on top of it, such as on-primary.",
          "Surface and surface variant are the neutral backgrounds.",
        ],
        citation: cite.androidTheming,
      },
      apple: {
        headline: "System colours that adapt",
        points: [
          "System colours adapt to appearance modes, vibrancy and accessibility settings.",
          "Avoid hard-coding system colour values; they can change between releases.",
          "Use dynamic system colours as intended, not for a different purpose.",
        ],
        citation: cite.appleColor,
      },
      govuk: {
        headline: "Functional colours and a web palette",
        points: [
          "Functional colours cover text, links, borders, focus, error and success.",
          "Only use a functional colour in the context it was designed for.",
          "For any other use, reference the palette colour directly.",
        ],
        citation: cite.govukColour,
      },
    },
    takeaway:
      "Every system names colours by role and asks you not to reuse a role for a different job. None of these pages sets its own contrast ratio; the testable numbers come from WCAG.",
  },
  {
    id: "typography",
    title: "Typography",
    kind: "Foundation",
    status: "verified",
    summary: "Default body size, the shape of the type scale, and what each system says about hierarchy.",
    cells: {
      sgds: {
        headline: "Inter, 16 px body",
        points: [
          "Type scale: 14, 16, 20, 24, 28, 32, 40, 48, 56 px.",
          "Line height 1.5 for body, labels and captions; 1.2 for displays and headings.",
          "Keep long body text to 40 to 60 characters per line.",
          "For contrast, skip one size, weight or colour step.",
        ],
        citation: cite.sgdsTypography,
      },
      material: {
        headline: "Five roles, three sizes each",
        points: [
          "Display, headline, title, body and label.",
          "Each role comes in large, medium and small.",
        ],
        citation: cite.androidTheming,
      },
      apple: {
        headline: "17 pt default on iPhone, 11 pt minimum",
        points: [
          "macOS default is 13 pt with a 10 pt minimum.",
          "Minimise the number of typefaces.",
          "Avoid Ultralight, Thin and Light weights.",
          "Keep the relative hierarchy when people change text size.",
        ],
        citation: src("apple", "Apple HIG, Typography", "https://developer.apple.com/design/human-interface-guidelines/typography"),
      },
      govuk: {
        headline: "19 px body, a seven-step scale",
        points: [
          "Body is 19 px with a 25 px line height, on all screen sizes.",
          "Headings are 48, 36 and 24 px on large screens, and smaller on small screens.",
          "The 80 and 27 px sizes are for exceptional use only.",
        ],
        citation: cite.govukTypeScale,
      },
    },
    takeaway:
      "Body size ranges from 16 to 19 px on the web and 17 pt on iPhone, so the common 14 px product-UI body is smaller than any of these systems' defaults. All four keep the scale short and build hierarchy from a few clear steps.",
  },
  {
    id: "spacing",
    title: "Spacing",
    kind: "Foundation",
    status: "verified",
    summary: "The base unit and scale each system publishes.",
    cells: {
      sgds: {
        headline: "A 4-point system",
        points: ["Sizes: 4, 8, 12, 16, 20, 24, 32, 48, 64, 96 and 128 px.", "Principles: alignment, flexibility and uniformity."],
        citation: cite.sgdsSpacing,
      },
      govuk: {
        headline: "A 5 px based scale that responds",
        points: [
          "Static scale: 5, 10, 15, 20, 25, 30, 40, 50, 60 px.",
          "The responsive scale uses smaller values on small screens for the larger steps: 60 becomes 40, 30 becomes 20.",
        ],
        citation: cite.govukSpacing,
      },
      atlassian: {
        headline: "An 8 px base unit, as space tokens",
        points: [
          "space.100 is 8 px, the base unit.",
          "The scale: 0, 2, 4, 6, 8, 12, 16, 20, 24, 32, 40, 48, 64 and 80 px.",
          "0 to 8 px for small and compact pieces of UI.",
          "12 to 24 px for larger and less dense pieces of UI.",
          "32 to 80 px for the largest pieces of UI and layout.",
        ],
        citation: read("atlassian", "Atlassian Design System, Spacing", "https://atlassian.design/foundations/spacing"),
      },
      carbon: {
        headline: "Multiples of two, four and eight",
        points: [
          "Thirteen steps, $spacing-01 to $spacing-13: 2, 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96 and 160 px.",
          "The scale is built on multiples of two, four and eight.",
          "Deviating from the spacing scale should be avoided whenever possible.",
        ],
        citation: read("carbon", "Carbon, Spacing", "https://carbondesignsystem.com/elements/spacing/overview/"),
      },
      fluent: {
        headline: "A 4 px base, across platforms",
        points: [
          "The ramp: 0, 2, 4, 6, 8, 10, 12, 16, 20, 24, 28, 32, 36, 40, 48, 52 and 56.",
          "The base unit is four pixels. 2, 6 and 10 exist to align icons.",
          "The same ramp is measured in points on iOS, dp on Android and pixels on the web.",
          "In responsive scenarios, consider changing spacing within components, patterns and layouts to fit the device.",
        ],
        citation: viewportCite.fluentLayout,
      },
    },
    takeaway:
      "Base units differ: 4, 5 and 8 px all ship in large systems, and all work. Staying on one scale matters more than which one. GOV.UK shrinking large gaps on small screens is worth copying whatever your scale.",
    themes: [
      "A short, fixed list of values. All five publish between 9 and 17 steps, not a formula.",
      "Steps widen as values grow: small steps at the bottom of each scale, large jumps at the top.",
      "16, 24, 32, 48 and 64 px appear in the SGDS, Atlassian and Carbon scales.",
    ],
    differences: [
      "Base unit: SGDS and Fluent use 4 px. GOV.UK's scale is based on 5 px. Atlassian's base unit is 8 px.",
      "Naming: Atlassian's names track the value, so space.100 is 8 px and space.200 is 16 px. Carbon numbers its steps in order.",
      "Only GOV.UK's page describes a scale that changes with screen size.",
      "Atlassian is the only one that says which part of the scale suits which size of UI. Fluent is the only one that gives the same ramp for iOS, Android and the web.",
      "Not read on this topic: Material, Apple, Primer and USWDS.",
    ],
  },
  {
    id: "radius",
    title: "Radius",
    kind: "Foundation",
    status: "verified",
    summary: "The corner-radius values each system defines, and what they are for.",
    cells: {
      sgds: {
        headline: "Radius tied to component type",
        points: [
          "0 and 2 px: data tables, dividers.",
          "4 px: tags, badges, small icon buttons.",
          "8 px: cards, modals, tooltips, dropdowns, inputs.",
          "12 and 16 px: large modals, callout banners. 24 px: feature cards. Full: avatars.",
        ],
        citation: cite.sgdsBorder,
      },
      material: {
        headline: "A five-step shape scale",
        points: ["Extra small 4 dp, small 8 dp, medium 12 dp, large 16 dp, extra large 24 dp."],
        citation: cite.androidTheming,
      },
      govuk: {
        headline: "No radius guidance",
        points: ["The Styles section has no page for border radius."],
        citation: src("govuk", "GOV.UK Design System, Styles", "https://design-system.service.gov.uk/styles/"),
        none: true,
      },
    },
    takeaway:
      "SGDS and Material land on the same steps, 4, 8, 12, 16 and 24, and both tie the value to the size or kind of component. Neither applies one radius to everything.",
  },
  {
    id: "elevation",
    title: "Elevation",
    kind: "Foundation",
    status: "verified",
    summary: "How each system shows that one surface sits above another.",
    cells: {
      sgds: {
        headline: "Surface, edge and opacity",
        points: [
          "Surface elevation: things that temporarily appear in front, such as dropdown menus and tooltips.",
          "Edge: a shadow on a header or action bar that content scrolls behind.",
          "Opacity backgrounds focus layered surfaces such as modals.",
          "Keep elevation subtle so it does not take focus from content.",
        ],
        citation: cite.sgdsElevation,
      },
      material: {
        headline: "Mainly tonal colour, plus shadows",
        points: [
          "Material 3 represents elevation mainly using tonal colour overlays.",
          "Higher tonal elevation uses a more prominent tone.",
          "A surface can take tonal elevation, shadow elevation or both.",
        ],
        citation: cite.androidTheming,
      },
      apple: {
        headline: "Materials, not drop shadows",
        points: [
          "A material creates depth, layering and hierarchy between foreground and background.",
          "Liquid Glass forms a layer for controls and navigation that floats above content.",
          "Do not use Liquid Glass in the content layer.",
          "Thicker materials give better contrast for text.",
        ],
        citation: src("apple", "Apple HIG, Materials", "https://developer.apple.com/design/human-interface-guidelines/materials"),
      },
      govuk: {
        headline: "No elevation guidance",
        points: ["The Styles section has no page for elevation or shadows."],
        citation: src("govuk", "GOV.UK Design System, Styles", "https://design-system.service.gov.uk/styles/"),
        none: true,
      },
    },
    takeaway:
      "Only one of the four leans on drop shadows, and it asks for them to be subtle. Material uses colour, Apple uses translucent materials, GOV.UK uses nothing. In every case height is reserved for navigation, menus and overlays, not ordinary content.",
  },
  {
    id: "motion",
    title: "Motion",
    kind: "Foundation",
    status: "verified",
    summary: "What each system says about animation, where it says anything.",
    cells: {
      sgds: {
        headline: "Guidance is being prepared",
        points: [
          "Use existing SGDS component behaviour and reduced-motion support.",
          "Avoid custom animation unless it improves feedback, orientation or state-change clarity.",
          "The page lists no duration or easing tokens.",
        ],
        citation: src("sgds", "SGDS, Motion", "https://www.designsystem.tech.gov.sg/foundations/motion"),
      },
      apple: {
        headline: "Purposeful, brief and optional",
        points: [
          "Do not add motion for the sake of adding motion.",
          "Make motion optional; never the only way to communicate important information.",
          "Aim for brevity and precision in feedback animations.",
          "Avoid adding motion to interactions that occur frequently.",
        ],
        citation: src("apple", "Apple HIG, Motion", "https://developer.apple.com/design/human-interface-guidelines/motion"),
      },
      govuk: {
        headline: "No motion guidance",
        points: ["The Styles section has no page for motion or animation."],
        citation: src("govuk", "GOV.UK Design System, Styles", "https://design-system.service.gov.uk/styles/"),
        none: true,
      },
    },
    takeaway:
      "Both systems that speak to motion say the same thing: animate only when it explains a change, keep it short, and respect reduced-motion settings. The two government systems give little or nothing, so there is no official motion spec to follow for a Singapore service.",
  },
  {
    id: "text-input",
    title: "Text input",
    kind: "Component",
    status: "verified",
    summary: "Labels, hints and placeholders in single-line fields.",
    cells: {
      sgds: {
        headline: "Visible label, hint text, required state",
        points: [
          "Always pair the input with a visible label.",
          "Do not rely on placeholder text as the only label.",
          "Use hint text to clarify the expected value.",
          "Mark an input as required when the form cannot be completed without it.",
        ],
        citation: cite.sgdsInput,
      },
      material: {
        headline: "Filled and outlined text fields",
        points: ["Two styles: filled, the default, and outlined.", "Both take a label and a placeholder."],
        citation: src("material", "Android Developers, Configure text fields", "https://developer.android.com/develop/ui/compose/text/user-input"),
      },
      apple: {
        headline: "Placeholder as a hint, with a separate label",
        points: [
          "A text field can show placeholder text when empty.",
          "Because placeholder text disappears, it can be useful to include a separate label.",
          "Validate fields when it makes sense: an email when people leave the field.",
        ],
        citation: cite.appleTextFields,
      },
      govuk: {
        headline: "Label above, sized to the answer",
        points: [
          "All text inputs must have labels, aligned above the input.",
          "Make inputs the right size for the content they are intended for.",
          "Do not use placeholder text in place of a label or hint.",
          "Do not stop users copying and pasting.",
        ],
        citation: src("govuk", "GOV.UK Design System, Text input", "https://design-system.service.gov.uk/components/text-input/"),
      },
      atlassian: {
        headline: "A visible label, no placeholder",
        points: [
          "The label must say what the field requires and sit left-aligned directly above the input.",
          "Make sure all fields have a visible label.",
          "Do not use placeholder text. Search fields are the only exception, with a search icon and an accessible label.",
          "Use helper text for extra information or the accepted format.",
        ],
        citation: read9("atlassian", "Atlassian Design System, Text field usage", "https://atlassian.design/components/textfield/usage"),
      },
      carbon: {
        headline: "For input that cannot be predicted",
        points: [
          "Use a text input when people enter unique information that a preset list could not cover.",
          "If people can only choose from a predefined list, use a selection control instead.",
          "Text input is for a single line. Text area is for more than a few words.",
          "Two styles, default and fluid, share the same function.",
        ],
        citation: read9("carbon", "Carbon, Text input", "https://www.carbondesignsystem.com/building-blocks/core/components/text-input/guidelines"),
      },
      uswds: {
        headline: "Sized to the answer, validated late",
        points: [
          "Use fields appropriate to the length of the input. The length is a hint about how much to write.",
          "Consider the mobile context: text inputs are harder for mobile users than desktop users.",
          "Only show error messages after someone has interacted with the field.",
          "Avoid placeholder text.",
        ],
        citation: read9("uswds", "USWDS, Text input", "https://designsystem.digital.gov/components/text-input/"),
      },
      fluent: {
        headline: "Width fits the expected content",
        points: [
          "An input is for short, free-form text. For more than one line, use a textarea.",
          "The width of the input should fit the approximate length of the content expected.",
          "Avoid placeholder text for essential information, and always combine it with a label.",
        ],
        citation: read9("fluent", "Fluent 2, Input usage", "https://fluent2.microsoft.design/components/web/react/core/input/usage"),
      },
    },
    takeaway:
      "Most of these systems warn that placeholder text disappears and cannot stand in for a label. A visible label above the field is the one choice none of them argues against. Sizing the field to the expected answer, which GOV.UK, USWDS and Fluent each ask for, is the least followed and easiest to adopt.",
  },
  {
    id: "select",
    title: "Select",
    kind: "Component",
    status: "verified",
    summary: "When a dropdown is the right control, and when it is not.",
    cells: {
      sgds: {
        headline: "One option from a known set",
        points: [
          "With only two or three options, use radio buttons.",
          "When users need to type to find an option, use a combo box.",
          "Select supports a single value only.",
          "Order options in a way users can predict.",
        ],
        citation: src("sgds", "SGDS, Select", "https://www.designsystem.tech.gov.sg/components/select"),
      },
      material: {
        headline: "Dropdown menus on a temporary surface",
        points: [
          "Users click an icon, text field or other component, then select from a list of options.",
          "The menu scrolls by default if items do not fit.",
        ],
        citation: src("material", "Android Developers, Menus", "https://developer.android.com/develop/ui/compose/components/menu"),
      },
      apple: {
        headline: "Pop-up buttons for exclusive options",
        points: [
          "Use a pop-up button for a flat list of mutually exclusive options or states.",
          "Use a pull-down button for actions, multiple selection or submenus.",
          "Provide a useful default selection.",
          "Consider it when space is limited and options need not always show.",
        ],
        citation: src("apple", "Apple HIG, Pop-up buttons", "https://developer.apple.com/design/human-interface-guidelines/pop-up-buttons"),
      },
      govuk: {
        headline: "A last resort",
        points: [
          "The select should only be used as a last resort in public-facing services.",
          "User research has shown that some users struggle with selects.",
          "Consider radios, or ask questions that leave fewer options.",
          "It does not support selecting multiple options.",
        ],
        citation: src("govuk", "GOV.UK Design System, Select", "https://design-system.service.gov.uk/components/select/"),
      },
    },
    takeaway:
      "This is the sharpest disagreement in the Explorer: GOV.UK calls select a last resort on research evidence, while the others treat it as a normal space-saving control. They agree at the edges: use radios for two or three options, and something searchable for long lists.",
  },
  {
    id: "modal",
    title: "Modal",
    kind: "Component",
    status: "verified",
    summary: "When to interrupt, and how to keep a modal task small.",
    cells: {
      sgds: {
        headline: "Short, high-priority tasks",
        points: [
          "Do not use for long forms, dense reference content or unrelated decisions.",
          "Five sizes: small, medium (default), large, extra large and fullscreen.",
          "Label the primary button with the outcome verb, not Yes or OK.",
          "Do not open a second modal from inside the first.",
        ],
        citation: src("sgds", "SGDS, Modal", "https://www.designsystem.tech.gov.sg/components/modal"),
      },
      material: {
        headline: "Dialogs for confirmation and input",
        points: [
          "A dialog creates an interruptive experience to capture attention.",
          "Uses: confirming an action, requesting input, presenting options.",
          "An alert dialog has a title, text, an optional icon, and confirm and dismiss buttons.",
        ],
        citation: src("material", "Android Developers, Dialog", "https://developer.android.com/develop/ui/compose/components/dialog"),
      },
      apple: {
        headline: "Only when there is a clear benefit",
        points: [
          "Keep modal tasks simple, short and streamlined.",
          "Always give people an obvious way to dismiss a modal view.",
          "Get confirmation before closing if content would be lost.",
          "Let people dismiss one modal view before presenting another.",
        ],
        citation: src("apple", "Apple HIG, Modality", "https://developer.apple.com/design/human-interface-guidelines/modality"),
      },
      govuk: {
        headline: "No modal component",
        points: ["The component list has no modal or dialog."],
        citation: src("govuk", "GOV.UK Design System, Components", "https://design-system.service.gov.uk/components/"),
        none: true,
      },
      atlassian: {
        headline: "For an immediate task",
        points: [
          "Use a modal dialog for a task that needs attention straight away, and use it sparingly.",
          "Do not use a modal dialog for complex interactions or large tables.",
          "It closes with the close button, Esc, a click outside or Cancel.",
          "Focus returns to the element that opened it.",
          "The usage page gives no pixel widths.",
        ],
        citation: read("atlassian", "Atlassian Design System, Modal dialog usage", "https://atlassian.design/components/modal-dialog/usage"),
      },
      carbon: {
        headline: "Urgent information, used sparingly",
        points: [
          "Modals are for urgent information and should be used sparingly.",
          "Three kinds: passive, transactional and danger.",
          "Four responsive sizes: extra small, small, medium and large.",
          "A passive modal closes on a click outside.",
        ],
        citation: read("carbon", "Carbon, Modal usage", "https://carbondesignsystem.com/components/modal/usage/"),
      },
      primer: {
        headline: "Not a page inside a dialog",
        points: [
          "Avoid creating a whole page inside a dialog.",
          "A click on the backdrop dismisses it by default, except for a form with unsaved changes.",
          "Nested dialogs are limited to two.",
        ],
        citation: read("primer", "Primer, Dialog guidelines", "https://primer.style/product/components/dialog/guidelines/"),
      },
      uswds: {
        headline: "A last resort",
        points: [
          "Modals should be a last resort.",
          "A modal should open because the user did something, not unprompted.",
          "Two sizes: default and large.",
          "Focus is trapped inside the modal while it is open.",
        ],
        citation: read("uswds", "USWDS, Modal", "https://designsystem.digital.gov/components/modal/"),
      },
      fluent: {
        headline: "Modal, non-modal and alert",
        points: [
          "Dialogs are often interruptions, so use them for important actions. For an update that needs no action, use a toast.",
          "A modal dialog closes on a click outside, on Esc or with a footer button.",
          "A non-modal dialog leaves the page usable and cannot be dismissed by clicking outside.",
          "An alert dialog can only be dismissed with its footer buttons. Use it only where something could be lost.",
        ],
        citation: viewportCite.fluentDialog,
      },
    },
    takeaway:
      "Every system that has a modal restricts it to short, focused tasks. GOV.UK ships without one at all, which is its own answer: a separate page can do the job. No page checked states a single required width.",
    themes: [
      "Use it rarely. Atlassian and Carbon say sparingly, USWDS says last resort, Apple says only when there is a clear benefit.",
      "Keep the task small. SGDS rules out long forms, Atlassian complex interactions and large tables, Primer a whole page.",
      "Always a way out. Apple asks for an obvious way to dismiss. Atlassian lists four.",
    ],
    differences: [
      "Sizes: SGDS has five, Carbon four, USWDS two. Atlassian's usage page gives no widths.",
      "Clicking outside: closes an Atlassian modal, a Carbon passive modal, a Fluent modal dialog, and a Primer dialog unless a form has unsaved changes. It never closes a Fluent alert dialog.",
      "Stacking: SGDS says do not open a second modal from the first. Apple says dismiss one before presenting another. Primer allows two levels.",
      "GOV.UK has no modal component at all.",
    ],
  },
  {
    id: "accordion",
    title: "Accordion",
    kind: "Component",
    status: "verified",
    summary: "Hiding content behind headings, and when not to.",
    cells: {
      sgds: {
        headline: "Group related information, save space",
        points: [
          "Use when content does not need to be shown at once, or space is limited.",
          "Do not hide essential information inside an accordion.",
          "Do not use when each section is short enough to show directly.",
          "Do not nest accordions.",
        ],
        citation: src("sgds", "SGDS, Accordion", "https://www.designsystem.tech.gov.sg/components/accordion"),
      },
      material: {
        headline: "No accordion component",
        points: ["The Material 3 component list for Compose has no accordion or expansion panel."],
        citation: src("material", "Android Developers, Material components in Compose", "https://developer.android.com/develop/ui/compose/components"),
        none: true,
      },
      apple: {
        headline: "Disclosure controls",
        points: [
          "Use a disclosure control to hide details until they are relevant.",
          "Keep the controls people are most likely to use always visible.",
          "Give a disclosure triangle a descriptive label, such as Advanced Options.",
          "Use no more than one disclosure button in a single view.",
        ],
        citation: src("apple", "Apple HIG, Disclosure controls", "https://developer.apple.com/design/human-interface-guidelines/disclosure-controls"),
      },
      govuk: {
        headline: "Only with evidence it helps",
        points: [
          "Use only if there is evidence an overview of multiple related sections helps the user.",
          "Do not use for content that all users need to see.",
          "It is usually better to simplify and reduce the amount of content.",
          "Do not put accordions within accordions.",
        ],
        citation: src("govuk", "GOV.UK Design System, Accordion", "https://design-system.service.gov.uk/components/accordion/"),
      },
      carbon: {
        headline: "When space is at a premium",
        points: [
          "Use to organise related information, and to shorten pages when content is not crucial to read in full.",
          "Use when long content cannot be shown at once, as on a mobile interface or in a side panel.",
          "If people are likely to read all of the content, do not use an accordion: it adds the burden of an extra click.",
          "For large amounts of nested information, consider a tree view.",
        ],
        citation: read9("carbon", "Carbon, Accordion", "https://www.carbondesignsystem.com/building-blocks/core/components/accordion/guidelines"),
      },
      uswds: {
        headline: "Only a few pieces needed",
        points: [
          "Use it if people will need only a few specific pieces of content on a page.",
          "Do not use it if people need to see most or all of the information. Use well-formatted text.",
          "Accordions increase cognitive load, because people have to decide which headers to open.",
          "Make the entire header selectable.",
        ],
        citation: read9("uswds", "USWDS, Accordion", "https://designsystem.digital.gov/components/accordion/"),
      },
      fluent: {
        headline: "Never required information",
        points: [
          "Never put information that is required for the current task inside an accordion.",
          "Items are closed by default, and opening one closes the others unless you allow several open.",
          "Never put information in one item that needs to be referenced in another.",
          "Keep headers brief; they wrap at smaller widths.",
        ],
        citation: read9("fluent", "Fluent 2, Accordion usage", "https://fluent2.microsoft.design/components/web/react/core/accordion/usage"),
      },
    },
    takeaway:
      "Every system that has one says not to hide what people need, and none encourages nesting. GOV.UK goes further and asks you to cut the content before reaching for an accordion. USWDS names the cost: people have to decide which headers to open.",
  },
  {
    id: "navigation",
    title: "Navigation",
    kind: "Component",
    status: "verified",
    summary: "The primary navigation pattern in each system, and how many items it should hold.",
    cells: {
      sgds: {
        headline: "Main navigation for primary sections",
        points: [
          "Reserve it for primary sections every user needs.",
          "With more than five items, consolidate or move some into a dropdown or subnav.",
          "Reserve the end slot for account and sign-in actions.",
          "It collapses to a menu toggle on smaller screens.",
        ],
        citation: src("sgds", "SGDS, Main navigation", "https://www.designsystem.tech.gov.sg/components/mainnav"),
      },
      material: {
        headline: "Navigation bar",
        points: ["For three to five destinations of equal importance.", "For compact window sizes.", "Destinations stay consistent across app screens."],
        citation: src("material", "Android Developers, Navigation bar", "https://developer.android.com/develop/ui/compose/components/navigation-bar"),
      },
      apple: {
        headline: "Tab bar",
        points: [
          "Use a tab bar to support navigation, not to provide actions.",
          "Keep the tab bar visible as people move between sections.",
          "Avoid overflow tabs.",
          "Do not disable or hide tab bar buttons, even when their content is unavailable.",
        ],
        citation: src("apple", "Apple HIG, Tab bars", "https://developer.apple.com/design/human-interface-guidelines/tab-bars"),
      },
      govuk: {
        headline: "Service navigation",
        points: [
          "Helps users understand that they are using your service.",
          "Can show only the service name, with no navigation links.",
          "The current page is marked for assistive technology.",
          "A toggle shows and hides the menu on smaller screens.",
        ],
        citation: src("govuk", "GOV.UK Design System, Service navigation", "https://design-system.service.gov.uk/components/service-navigation/"),
      },
    },
    takeaway:
      "Five is the ceiling in both systems that give a number. All four keep primary navigation for destinations only, in the same place on every screen. Actions, account controls and secondary links go elsewhere.",
  },
  {
    id: "table",
    title: "Table",
    kind: "Component",
    status: "verified",
    summary: "What each system's table is for, and where it stops.",
    cells: {
      sgds: {
        headline: "Static information for scanning and comparing",
        points: [
          "For sorting, pagination or row selection, use a data table instead.",
          "Use descriptive column headers.",
          "Do not crowd rows with actions.",
          "Consider a description list for one item's details.",
        ],
        citation: src("sgds", "SGDS, Table", "https://www.designsystem.tech.gov.sg/components/table"),
      },
      material: {
        headline: "No data table component",
        points: ["The Material 3 component list for Compose has no data table. It lists Lists, and Lists and grids."],
        citation: src("material", "Android Developers, Material components in Compose", "https://developer.android.com/develop/ui/compose/components"),
        none: true,
      },
      apple: {
        headline: "Lists and tables",
        points: [
          "Prefer displaying text in a list or table.",
          "Keep item text succinct so rows are comfortable to read.",
          "Use descriptive column headings in a multicolumn table.",
          "On macOS, let people click a column heading to sort when it provides value.",
        ],
        citation: src("apple", "Apple HIG, Lists and tables", "https://developer.apple.com/design/human-interface-guidelines/lists-and-tables"),
      },
      govuk: {
        headline: "Compare information in rows and columns",
        points: [
          "Never use a table to lay out content on a page.",
          "Use a caption to describe the table, as you would a heading.",
          "When comparing columns of numbers, align them to the right.",
          "With a lot of data, split it into multiple tables or pages.",
        ],
        citation: src("govuk", "GOV.UK Design System, Table", "https://design-system.service.gov.uk/components/table/"),
      },
      uswds: {
        headline: "Tabular data and directories",
        points: [
          "Use a table for tabular information and for directories of similarly structured items.",
          "Do not use tables in place of a layout grid.",
          "Cell content should be brief and scannable. Paragraphs in a cell belong under headings instead.",
          "Always use a header row, and format each column consistently.",
        ],
        citation: read9("uswds", "USWDS, Table", "https://designsystem.digital.gov/components/table/"),
      },
    },
    takeaway:
      "The basic table in every system is for reading and comparing, not managing data. Sorting, selection and pagination are treated as a separate, heavier component or left to you. Write real column headers, which the systems ask for outright, and right-align numbers you want compared.",
  },
  {
    id: "tabs",
    title: "Tabs",
    kind: "Component",
    status: "verified",
    summary: "Switching between related views in place.",
    cells: {
      sgds: {
        headline: "Facets of the same object",
        points: [
          "Use tabs for sections that share the same context.",
          "Do not use tabs for sequential steps; use a stepper.",
          "Keep tab labels short and parallel.",
          "With five or more, reorganise or use side navigation.",
        ],
        citation: src("sgds", "SGDS, Tab", "https://www.designsystem.tech.gov.sg/components/tab"),
      },
      material: {
        headline: "Primary and secondary tabs",
        points: [
          "Tabs organise groups of related content.",
          "Primary tabs sit at the top of the content pane, when one set of tabs is needed.",
          "Secondary tabs sit within a content area, when a screen needs a second level.",
        ],
        citation: src("material", "Android Developers, Tabs", "https://developer.android.com/develop/ui/compose/components/tabs"),
      },
      govuk: {
        headline: "Useful, but they hide content",
        points: [
          "Not everyone will notice tabs or understand how they work.",
          "Do not use tabs if users need to read all the content in order.",
          "The first tab should be the most commonly needed section.",
          "Too many tabs or long labels wrap onto more than one line.",
        ],
        citation: src("govuk", "GOV.UK Design System, Tabs", "https://design-system.service.gov.uk/components/tabs/"),
      },
      atlassian: {
        headline: "For concise content people return to",
        points: [
          "Tabs organise content by grouping similar information on the same page.",
          "Use tabs to switch between views within the same context. Do not use them to navigate to different pages or states.",
          "Keep the number of tabs low, and surface important information outside them.",
          "Left and right arrow keys move between tabs; the Tab key moves into the content.",
        ],
        citation: read9("atlassian", "Atlassian Design System, Tabs usage", "https://atlassian.design/components/tabs/usage"),
      },
      carbon: {
        headline: "Group related information",
        points: [
          "Use tabs to group related information into categories, so people do not navigate away from their workflow.",
          "For filtering the same content, use a content switcher instead.",
          "For a linear, step by step process, use a progress indicator.",
          "Do not use tabs if people need to compare information in different groups.",
        ],
        citation: read9("carbon", "Carbon, Tabs", "https://www.carbondesignsystem.com/building-blocks/core/components/tabs/guidelines"),
      },
      fluent: {
        headline: "Tabs do not scroll or wrap",
        points: [
          "A tablist switches between categories of related information without going to a different page.",
          "Tabs in a horizontal tablist will not scroll or wrap. To show more, include an overflow menu button.",
          "Tablists are less effective in smaller layouts. When space is limited, consider an accordion or a dropdown.",
          "One tab, usually the first, should be active on first render.",
        ],
        citation: read9("fluent", "Fluent 2, Tablist usage", "https://fluent2.microsoft.design/components/web/react/core/tablist/usage"),
      },
    },
    takeaway:
      "Tabs are for parallel views of one thing, never for steps. GOV.UK's caution applies everywhere: content behind a tab may never be seen, so put the most needed section first and make labels say exactly what is behind them.",
  },
  {
    id: "checkbox",
    title: "Checkbox",
    kind: "Component",
    status: "verified",
    summary: "Multiple selection and single on or off choices.",
    cells: {
      sgds: {
        headline: "More than one item from a list",
        points: [
          "If users must choose exactly one, use radio buttons.",
          "Do not use two checkboxes for a yes-or-no decision.",
          "Indeterminate shows a parent with a mixed selection of children.",
          "Use a clear group label.",
        ],
        citation: src("sgds", "SGDS, Checkbox", "https://www.designsystem.tech.gov.sg/components/checkbox"),
      },
      material: {
        headline: "Three states",
        points: [
          "Use checkboxes instead of switches or radio buttons when the user can select multiple options.",
          "States: unselected, indeterminate and selected.",
          "A parent checkbox sets all its children.",
        ],
        citation: src("material", "Android Developers, Checkbox", "https://developer.android.com/develop/ui/compose/components/checkbox"),
      },
      apple: {
        headline: "Checkboxes for hierarchies of settings",
        points: [
          "A checkbox's state can be on, off or mixed.",
          "Use a checkbox instead of a switch for a hierarchy of settings.",
          "In general, do not replace a checkbox with a switch.",
          "On iOS and iPadOS, use the switch style only in a list row.",
        ],
        citation: src("apple", "Apple HIG, Toggles", "https://developer.apple.com/design/human-interface-guidelines/toggles"),
      },
      govuk: {
        headline: "Never pre-selected",
        points: [
          "Do not pre-select checkbox options.",
          "Order options alphabetically by default.",
          "When none is a valid answer, add it last, separated by a divider.",
          "Smaller checkboxes suit information-dense screens designed for repeat use.",
        ],
        citation: src("govuk", "GOV.UK Design System, Checkboxes", "https://design-system.service.gov.uk/components/checkboxes/"),
      },
    },
    takeaway:
      "All four agree on the core: checkboxes for many, radios for one, and a mixed state for a parent. GOV.UK adds two rules worth taking anywhere: never pre-select, and offer an explicit none.",
  },
  {
    id: "radio",
    title: "Radio",
    kind: "Component",
    status: "verified",
    summary: "Choosing exactly one option from a visible set.",
    cells: {
      sgds: {
        headline: "One item, short lists",
        points: [
          "Use when users must choose exactly one and seeing all options helps them compare.",
          "Do not use radios for very long option lists; use select or combo box.",
          "The group label should state the decision users are making.",
        ],
        citation: src("sgds", "SGDS, Radio", "https://www.designsystem.tech.gov.sg/components/radio"),
      },
      material: {
        headline: "One item from a list",
        points: ["Use a radio button when only one item can be selected from a list.", "Mark the options as one selectable group so screen readers treat them together."],
        citation: src("material", "Android Developers, Radio button", "https://developer.android.com/develop/ui/compose/components/radio-button"),
      },
      apple: {
        headline: "Mutually exclusive options",
        points: ["Prefer a set of radio buttons to present mutually exclusive options.", "Avoid listing too many radio buttons in a set."],
        citation: src("apple", "Apple HIG, Toggles", "https://developer.apple.com/design/human-interface-guidelines/toggles"),
      },
      govuk: {
        headline: "Never pre-selected, stacked by default",
        points: [
          "Do not pre-select radio options.",
          "Include None of the above or I do not know if they are valid options.",
          "Only use inline radios when there are two short options.",
          "Keep conditionally revealed questions simple.",
        ],
        citation: src("govuk", "GOV.UK Design System, Radios", "https://design-system.service.gov.uk/components/radios/"),
      },
    },
    takeaway:
      "Radios are for short lists where seeing every option helps. Past the point where the list is hard to scan, three systems send you to a select. Stack them vertically unless there are only two short options.",
  },
  {
    id: "alert",
    title: "Alert and notification",
    kind: "Component",
    status: "verified",
    summary: "Telling people something happened, at four different levels of interruption.",
    cells: {
      sgds: {
        headline: "Inline alert",
        points: [
          "Use for inline feedback that affects the task or page the user is on.",
          "Variants: info, success, warning, danger and neutral.",
          "Too many alerts compete with the page content.",
          "Write the message so users know what happened and what to do next.",
        ],
        citation: src("sgds", "SGDS, Alert", "https://www.designsystem.tech.gov.sg/components/alert"),
      },
      material: {
        headline: "Snackbar",
        points: [
          "A brief notification at the bottom of the screen.",
          "Disappears after a few seconds, or when the user dismisses it.",
          "Uses: confirming an action with Undo, network status, successful submission.",
        ],
        citation: src("material", "Android Developers, Snackbar", "https://developer.android.com/develop/ui/compose/components/snackbar"),
      },
      apple: {
        headline: "Alert, a modal interruption",
        points: [
          "Avoid using an alert merely to provide information.",
          "Avoid alerts for common, undoable actions, even destructive ones.",
          "Write a title that clearly and succinctly describes the situation.",
          "Avoid OK as the default button title unless the alert is purely informational.",
        ],
        citation: src("apple", "Apple HIG, Alerts", "https://developer.apple.com/design/human-interface-guidelines/alerts"),
      },
      govuk: {
        headline: "Notification banner",
        points: [
          "For something users need to know that is not directly related to the page content.",
          "Use sparingly: there is evidence that people often miss them.",
          "Avoid more than one on the same page.",
          "Do not use it for validation errors.",
        ],
        citation: src("govuk", "GOV.UK Design System, Notification banner", "https://design-system.service.gov.uk/components/notification-banner/"),
      },
    },
    takeaway:
      "The same word means different things: Apple's alert blocks the screen, while SGDS's alert and GOV.UK's banner sit in the page and Material's snackbar disappears on its own. Choose by how much interruption the message deserves, and use every kind sparingly.",
  },
  {
    id: "touch-targets",
    title: "Touch targets",
    kind: "Viewport",
    status: "verified",
    summary: "The smallest area each system says a finger should have to hit.",
    cells: {
      sgds: {
        headline: "48 px default button height",
        points: ["The Button page lists a 48 px height token for the default size."],
        citation: cite.sgdsButton,
      },
      material: {
        headline: "48 by 48 dp",
        points: ["Touch targets of at least 48 × 48 dp."],
        citation: cite.androidTargets,
      },
      apple: {
        headline: "44 by 44 pt",
        points: ["A button needs a hit region of at least 44 × 44 pt.", "Prominence comes from style, not size."],
        citation: cite.appleButtons,
      },
      fluent: {
        headline: "44 on iOS and web, 48 on Android",
        points: ["Spacing should leave room for minimum touch targets on mobile: 44 by 44 on iOS and the web, 48 by 48 on Android."],
        citation: viewportCite.fluentLayout,
      },
    },
    takeaway:
      "Apple and Android give touch sizes in their own units, and they are not the same number. On the web, WCAG's 24 by 24 CSS pixel minimum sits beneath both as a floor, and applies to a mouse as well as a finger. Design to the platform you ship on.",
    themes: ["Both platforms give one minimum for anything tappable, not a size per component.", "The visible control can be smaller than the area that responds to touch."],
    differences: ["Units: Apple uses points, Android density-independent pixels. Neither is a CSS pixel.", "SGDS gives a default button height; the page read gives no separate touch target figure.", "Not read on this topic: GOV.UK, Atlassian, Carbon, Primer and USWDS."],
  },
  {
    id: "foldables",
    title: "Folding screens",
    kind: "Viewport",
    status: "verified",
    summary: "What Apple and Google each say about designing for a device with two displays.",
    cells: {
      apple: {
        headline: "Compact outside, regular inside",
        points: [
          "A compact width layout for the outer display and a regular width layout for the inner display cover every pose.",
          "Do not reinvent the app when it resizes; let the existing layout expand.",
          "Keep functionality and state the same between displays, with an additional level of hierarchy on the inner display if it suits.",
          "The system moves toolbars and tab bars to the side. In general, do not override this.",
          "Avoid extreme layout changes as people fold the device.",
        ],
        citation: viewportCite.duoHig,
      },
      material: {
        headline: "Alternative layouts for folded and unfolded",
        points: [
          "Differences in size and aspect ratio between folded and unfolded can be substantial, requiring alternative layouts.",
          "Unfolded in landscape is like a tablet: a two-pane layout with a navigation rail. Folded is like a phone: a single column with a bottom navigation bar.",
          "Keep dialogs and menus off the fold, and split content into two areas when half opened.",
          "The app must preserve and restore its state as the device folds and unfolds.",
        ],
        citation: viewportCite.androidFoldables,
      },
    },
    takeaway:
      "Both treat a folding device as two layouts of one app, joined by kept state, and both keep content off the fold. They differ on navigation: Apple's system puts bars on the side even when closed, while Google describes a bottom bar folded and a rail unfolded. Follow the platform you are designing for.",
    themes: ["Two layouts, one app: a narrow one closed and a wider one open.", "State survives the fold.", "Nothing important sits on the fold line."],
    differences: ["Navigation placement: at the side on iPhone Duo; bottom bar when folded on Android.", "Apple stresses expanding the existing layout. Google speaks of alternative layouts optimised for each.", "Not read on this topic: SGDS, GOV.UK, Atlassian, Carbon, Primer, USWDS and Fluent."],
  },
];

/** A citation for a page read on 8 October 2026, when the second set of systems was added. */
function read(sourceId: SourceId, label: string, url: string): Citation {
  return { sourceId, label, url, dateVerified: "2026-10-08" };
}

/** A citation for a page read on 9 October 2026. */
function read9(sourceId: SourceId, label: string, url: string): Citation {
  return { sourceId, label, url, dateVerified: "2026-10-09" };
}

/** A citation for a page checked on VERIFIED. */
function src(sourceId: SourceId, label: string, url: string): Citation {
  return { sourceId, label, url, dateVerified: VERIFIED };
}

export function getExplorerTopic(id: string): ExplorerTopic | undefined {
  return explorerTopics.find((t) => t.id === id);
}

/** The SGDS token layers, top (most concrete) to bottom (most specific use). */
export const sgdsTokenLayers = [
  {
    name: "Raw values",
    example: "#5A42C0, 16px",
    // Quoted from SGDS.
    official: "The actual, hard-coded values.",
    // Shortcut's reading.
    use: "Never reference these in a design. They exist so the layers below have something to point at.",
  },
  {
    name: "Primitive tokens",
    example: "A step on the colour scale",
    official: "Foundational tokens that define the core values of the design system.",
    use: "Use when building or extending a theme, not when styling a screen.",
  },
  {
    name: "Simplified semantic tokens",
    example: "sgds-bg-default",
    official: "A more general abstraction of the design system, for common use cases.",
    use: "Your default. SGDS says to start here when the UI role is clear.",
  },
  {
    name: "Granular semantic tokens",
    example: "Tokens scoped to forms, actions or feedback",
    official: "More specific and tailored for particular components, groups, or contexts.",
    use: "SGDS says to reach for these when a context like forms, actions or feedback needs a scoped variant.",
  },
  {
    name: "Component-specific tokens",
    example: "A token for one component's part",
    official: "Used to customise or refine design elements for individual components.",
    use: "Only when you are changing how one component looks without affecting the rest.",
  },
];
