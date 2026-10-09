import type { CheatSheet, CraftEntry } from "@/types";
import { VERIFIED, cite, wcag } from "./citations";
import { getGuidance, guidanceCitation } from "./guidance";

/**
 * Editorial guidance: conventions and craft. Nothing in `summary`, `why`,
 * the ranges or the notes comes from an organisation; it is Shortcut's own
 * writing and is labelled that way in the UI. Where an official source does
 * speak to the subject, its position sits separately in `official`, with a
 * citation checked on VERIFIED. Never move text between the two.
 */
const REVIEWED = VERIFIED;

type Input = Omit<CraftEntry, "dateReviewed" | "kind"> & { kind?: CraftEntry["kind"] };

const entry = (input: Input): CraftEntry => ({ kind: "industry-convention", dateReviewed: REVIEWED, ...input });
const craft = (input: Input): CraftEntry => entry({ kind: "craft-guidance", ...input });

export const e = {
  // --- Spacing -----------------------------------------------------------
  spacingScale: entry({
    id: "spacing-scale",
    title: "A working spacing scale",
    safeStartingPoint: "4 / 8 px base",
    commonRange: "4, 8, 12, 16, 24, 32, 40, 48, 64",
    summary:
      "A practical starting scale used in many product interfaces. It is a convention, not a rule: what matters is that you pick a scale and stay on it.",
    why: "A short scale turns hundreds of small spacing decisions into a handful, and makes spacing differences large enough to read as intentional.",
    scale: [
      { value: "4", label: "Very small internal relationship", use: "Icon and label, closely related metadata, small alignment nudges." },
      { value: "8", label: "Strongly related elements", use: "Label to its field, items in a tight group." },
      { value: "12–16", label: "Inside compact product UI", use: "Rows in a list, controls in a toolbar, compact card padding." },
      { value: "16–24", label: "Card and container padding", use: "The inside edge of most cards, panels and dialogs." },
      { value: "24–32", label: "Between groups", use: "Separating one group of fields or one card from the next." },
      { value: "32–48", label: "Between sections", use: "Section breaks within a page." },
      { value: "48–64+", label: "Major page sections", use: "The largest breaks, mostly on content and marketing pages." },
    ],
    whenToDeviate:
      "Follow your design system's scale if you have one. Dense tools often add 2 and 6; editorial pages often need steps above 64.",
    commonMistakes: [
      "Everything 16 px apart, so nothing reads as grouped.",
      "Off-scale values such as 13 or 18 that crept in while nudging.",
      "The same gap inside a group as between groups.",
    ],
    mentorNote: "If everything is 16px apart, your UI has spacing but no hierarchy.",
    official: [
      { text: "A 4-point system, with sizes 4, 8, 12, 16, 20, 24, 32, 48, 64, 96 and 128 px.", citation: cite.sgdsSpacing },
      { text: "A 5 px based scale: 5, 10, 15, 20, 25, 30, 40, 50, 60. Larger steps shrink on small screens.", citation: cite.govukSpacing },
    ],
    starter: { label: "Base spacing unit", context: "Product UI on any platform" },
  }),
  spacingRelationships: craft({
    id: "spacing-relationships",
    title: "Spacing shows what belongs together",
    summary: "Related things sit closer together than unrelated things. Decide the groups first, then let the gaps follow.",
    why: "People read proximity as relationship before they read any label. Even spacing removes that signal.",
    whenToUse: ["Inside a group: the smallest gaps.", "Between groups: clearly larger, at least one step up the scale.", "Between sections: larger again."],
    commonMistakes: ["A heading that sits midway between two blocks, so it belongs to neither.", "Whitespace added to feel premium, with no structure behind it."],
    mentorNote: "Spacing should communicate relationships, not just make a screen feel airy.",
  }),
  padding: entry({
    id: "padding",
    title: "Padding",
    safeStartingPoint: "16–24 px",
    commonRange: "8–12 compact control, 16–24 standard card, 24–32 large content card",
    summary: "Common working ranges for the space inside a container. Page-edge padding depends on the layout, and is usually tighter on mobile than desktop.",
    why: "This range tends to give a desktop product card room to breathe while keeping useful density. Compact enterprise tools go lower; large editorial cards go higher.",
    scale: [
      { value: "8–12", label: "Compact control", use: "Buttons, chips, table cells, dense toolbars." },
      { value: "16–24", label: "Standard card", use: "Most cards, panels, popovers and dialogs." },
      { value: "24–32", label: "Large content card", use: "Cards holding long text or a single important object." },
      { value: "16 or 20", label: "Mobile page edge", use: "A common horizontal page padding on phones." },
    ],
    whenToDeviate: "Go tighter when people scan many items at once. Go looser when a card holds one thing people read carefully.",
    commonMistakes: ["Different padding on cards that sit side by side.", "Padding larger than the gap between cards, so the insides feel further apart than the cards.", "Desktop padding carried unchanged onto a 360 px screen."],
    starter: { label: "Card padding", context: "Standard desktop product card" },
  }),
  sectionSpacing: entry({
    id: "section-spacing",
    title: "Section spacing",
    safeStartingPoint: "32–64 px",
    commonRange: "32–48 in product UI, 48–96 on content pages",
    summary: "The vertical gap between major parts of a page.",
    why: "Sections need a gap clearly larger than anything inside them, or the page reads as one undivided list.",
    whenToDeviate: "Tighten in dense tools where people work in one screenful. Loosen on long reading pages.",
    starter: { label: "Section spacing", context: "Between major page sections" },
  }),

  // --- Typography --------------------------------------------------------
  bodyText: entry({
    id: "body-text-size",
    title: "Body text size",
    safeStartingPoint: "14–16 px",
    commonRange: "14 in dense product UI, 16 for reading, 12–14 for supporting text",
    summary: "The size most of your text is set in.",
    why: "16 px is the browser default and comfortable for sustained reading. Product UI often drops to 14 to fit more on screen.",
    whenToDeviate: "Use 16 or more for anything people read at length, and on mobile. Keep 12 for captions and metadata only.",
    commonMistakes: ["12 px used for body text to make a dense screen fit.", "Supporting text made both small and pale, so it fails twice."],
    official: [
      { text: "Body text is 16 px.", citation: cite.sgdsTypography },
      { text: "Body text is 19 px with a 25 px line height.", citation: cite.govukTypeScale },
      { text: "Text must be resizable to 200 percent without loss of content or function.", citation: wcag("1.4.4") },
    ],
    starter: { label: "Body text", context: "Product UI" },
  }),
  pageTitle: entry({
    id: "page-title-size",
    title: "Page title size",
    safeStartingPoint: "24–40 px",
    commonRange: "20–28 in tools, 32–48 on content pages",
    summary: "The largest text on a product screen.",
    why: "A title needs to be clearly the largest thing, but in a tool it competes with the content people came for.",
    whenToDeviate: "Marketing and editorial pages go far larger. A very large heading inside a product screen is a common mark of generated UI.",
    official: [{ text: "Type scale runs 14, 16, 20, 24, 28, 32, 40, 48, 56 px.", citation: cite.sgdsTypography }],
  }),
  lineHeight: entry({
    id: "line-height",
    title: "Body line height",
    safeStartingPoint: "1.4–1.6",
    commonRange: "1.4–1.6 for body, 1.1–1.3 for headings",
    summary: "The distance between lines, as a multiple of font size.",
    why: "Body text needs room for the eye to find the next line. Large headings need less, or their lines drift apart.",
    whenToDeviate: "Tighten for short UI labels and large display text. Loosen for long lines or small text.",
    official: [
      { text: "1.5 for body, labels and captions; 1.2 for displays, headings and subtitles.", citation: cite.sgdsTypography },
      { text: "Nothing may break when users set line height to at least 1.5 times the font size.", citation: wcag("1.4.12") },
    ],
    starter: { label: "Body line height", context: "Paragraph text" },
  }),
  lineLength: entry({
    id: "line-length",
    title: "Reading line length",
    safeStartingPoint: "45–75 characters",
    commonRange: "45–75 for body text, shorter for captions",
    summary: "How wide a block of reading text should be.",
    why: "Long lines make it hard to find the start of the next line; very short lines break phrases apart.",
    whenToDeviate: "Tables, code and UI labels are not reading text and do not need the limit.",
    commonMistakes: ["Paragraphs stretched to the full width of a wide container."],
    official: [{ text: "Keep long body text to 40 to 60 characters per line, and short text to 20 to 40.", citation: cite.sgdsTypography }],
    starter: { label: "Reading line length", context: "Paragraphs" },
  }),
  typeAudit: craft({
    id: "type-audit",
    title: "How many sizes do you need?",
    summary: "Count your font families, weights, sizes, line heights and text colours. Most product screens work with one family, two or three weights and four to six sizes.",
    why: "Every extra size is another level the reader has to decode. Hierarchy comes from contrast between a few levels, not from having many.",
    whenToUse: ["Before adding a size, try weight.", "Then try spacing.", "Then try colour.", "Add a size only if those fail."],
    commonMistakes: ["Sizes one or two pixels apart, which read as a mistake.", "A different grey for every piece of secondary text."],
    mentorNote: "More font sizes does not automatically create stronger hierarchy.",
    official: [
      { text: "For contrast, skip one size, weight or colour step.", citation: cite.sgdsTypography },
      { text: "Five type roles, each in large, medium and small.", citation: cite.androidTheming },
    ],
  }),

  // --- Colour ------------------------------------------------------------
  neutrals: entry({
    id: "pure-white-and-black",
    title: "Pure white and pure black",
    safeStartingPoint: "Either is fine",
    commonRange: "Dark text #111111–#1F1F1F, light backgrounds #F8F8F8–#FFFFFF",
    summary: "Pure white and pure black are valid colours. Many product interfaces soften one or both, because large areas at maximum contrast can feel harsh.",
    why: "Softened neutrals lower glare on long sessions and leave room for a brighter white surface to sit on an off-white page.",
    whenToDeviate: "Keep pure white where you need the most contrast you can get, such as small text or outdoor mobile use. Do not swap black for grey by habit.",
    commonMistakes: ["Body text softened so far it fails contrast.", "An off-white page with off-white cards, so the surfaces no longer separate."],
    mentorNote: "Contrast matters more than whether a hex code looks fashionable.",
    official: [{ text: "Text needs at least 4.5:1 against its background, or 3:1 for large text.", citation: wcag("1.4.3") }],
  }),
  colourRoles: entry({
    id: "colour-roles",
    title: "The roles a palette needs",
    summary: "Most product palettes come down to the same few jobs. Name colours by the job, not the hue.",
    why: "Role names survive a rebrand or a dark theme; hue names do not.",
    scale: [
      { value: "Background", label: "The page", use: "The lowest layer everything sits on." },
      { value: "Surface", label: "Cards and panels", use: "One step apart from the background, lighter or darker." },
      { value: "Elevated surface", label: "Menus and dialogs", use: "Sits above surfaces; often the lightest neutral plus a shadow." },
      { value: "Border", label: "Edges and dividers", use: "Visible, but quieter than text." },
      { value: "Primary text", label: "Main content", use: "The highest-contrast text colour." },
      { value: "Secondary text", label: "Supporting content", use: "Quieter, and still passing contrast." },
      { value: "Disabled text", label: "Unavailable", use: "Clearly inactive; used rarely." },
      { value: "Semantic", label: "Status", use: "Error, warning, success and information, each used for that meaning only." },
    ],
    official: [
      { text: "Use the same colour for the same role across the interface.", citation: cite.sgdsColour },
      { text: "Do not redefine a semantic colour's meaning, such as using the separator colour for text.", citation: cite.appleColor },
      { text: "Only use a functional colour in the context it was designed for.", citation: cite.govukColour },
    ],
  }),
  colourJob: craft({
    id: "colour-has-a-job",
    title: "Colour should have a job",
    summary: "For each colour on the screen, ask why it is there. Good answers: hierarchy, status, action, branding, grouping, feedback.",
    why: "Colour is the strongest signal you have. Spent on decoration, it is no longer available to mean something.",
    commonMistakes: ["An accent colour on things that are not interactive.", "Red used for both errors and a brand highlight.", "The only answer is: because it looked nice."],
    mentorNote: "If you cannot say what a colour is for, try the screen without it.",
    official: [{ text: "Colour must not be the only way information is conveyed.", citation: wcag("1.4.1") }],
  }),

  // --- Radius ------------------------------------------------------------
  radius: entry({
    id: "border-radius",
    title: "Border radius",
    safeStartingPoint: "6–8 px",
    commonRange: "0–4 sharp, 6–8 general, 10–12 softer, 16–24 large surfaces, full for pills",
    summary: "How round corners are. Pick two or three values and tie them to component size, not to taste per component.",
    why: "Radius sets the tone of a product more than almost any other value, and inconsistency in it is easy to see.",
    scale: [
      { value: "0–4", label: "Sharp", use: "Technical, dense and enterprise interfaces; table cells; small tags." },
      { value: "6–8", label: "General purpose", use: "A safe default for buttons, fields and cards in product UI." },
      { value: "10–12", label: "Softer", use: "A more relaxed, consumer feel; larger cards." },
      { value: "16–24", label: "Large surfaces", use: "Sheets, large modals and expressive marketing surfaces." },
      { value: "Full", label: "Pill", use: "Chips, avatars and capsule controls." },
    ],
    whenToDeviate: "Follow the platform or design system first. Scale radius with size: a large radius on a small control turns it into a pill.",
    commonMistakes: ["Five or more radius values on one screen.", "A rounded card inside a rounded card inside a rounded panel.", "Inner corners rounder than the container holding them.", "Everything rounded because it looks modern."],
    aiWarning: "Large rounded cards used everywhere are one of the most common marks of template or generated UI.",
    official: [
      { text: "0 and 2 px for tables and dividers; 4 px for tags and small icon buttons; 8 px for cards, modals, dropdowns and inputs; 12 and 16 px for large modals and banners; 24 px for feature cards; full for avatars.", citation: cite.sgdsBorder },
      { text: "Shape scale: extra small 4 dp, small 8 dp, medium 12 dp, large 16 dp, extra large 24 dp.", citation: cite.androidTheming },
    ],
    starter: { label: "General radius", context: "Buttons, fields and cards in product UI" },
  }),

  // --- Shadows and borders ----------------------------------------------
  elevation: entry({
    id: "elevation-levels",
    title: "Elevation levels",
    safeStartingPoint: "No shadow",
    commonRange: "Four levels, 0 to 3",
    summary: "A small ladder of shadows, each tied to what the surface is doing. Most surfaces should sit at level 0.",
    why: "A shadow says this is above that. Used on everything, it says nothing and makes the screen look dirty.",
    scale: [
      { value: "Level 0", label: "No shadow", use: "Default surfaces. Separate them with spacing, a border or a background change." },
      { value: "Level 1", label: "Very subtle", use: "Cards that genuinely need to lift off a busy background." },
      { value: "Level 2", label: "Clear", use: "Dropdowns, menus and sticky bars that overlap content." },
      { value: "Level 3", label: "Strongest", use: "Modals, popovers and other floating surfaces." },
    ],
    whenToDeviate: "Dark themes show shadows poorly; use lighter surface colours for height instead.",
    commonMistakes: ["A shadow on every card.", "Dark, heavy shadows.", "Very large blur that reads as a glow.", "Different shadows on the same kind of component.", "A strong border and a strong shadow together.", "Elevation where spacing or a background change would do."],
    mentorNote: "Before adding a shadow, ask what is physically supposed to sit above what.",
    official: [
      { text: "Keep elevation subtle so it adds depth without taking focus from content.", citation: cite.sgdsElevation },
      { text: "Surface elevation is for things that temporarily appear in front, such as dropdown menus and tooltips. An opacity background focuses layered surfaces such as modals.", citation: cite.sgdsElevation },
    ],
  }),
  borders: craft({
    id: "when-to-use-borders",
    title: "When a border earns its place",
    safeStartingPoint: "1 px, low contrast",
    summary: "Borders define a boundary. Use them where a boundary is the information: around inputs, between neighbouring surfaces, between table rows.",
    why: "A border is the cheapest separator, which is why it gets overused.",
    whenToUse: ["Interactive controls whose edge must be visible, such as text fields.", "Neighbouring surfaces of the same colour.", "Dense data, where spacing alone would cost too much room."],
    whenNotToUse: ["Around every group on the page.", "Where a background difference, spacing or a shadow already separates the surfaces."],
    commonMistakes: ["Background difference, spacing, shadow and a heavy border all on one card.", "Decorative borders that pass for input fields."],
    official: [
      { text: "1 px borders mark the boundary of components and divide content. 2 px is used for input hover, 4 px for tab emphasis.", citation: cite.sgdsBorder },
      { text: "The boundary needed to identify a control must have 3:1 contrast against adjacent colours.", citation: wcag("1.4.11") },
    ],
  }),

  // --- Layout ------------------------------------------------------------
  alignment: craft({
    id: "alignment",
    title: "Alignment",
    summary: "Pick a small number of strong vertical lines, usually the left edge of the content, and hang everything from them.",
    why: "Shared edges are what make a screen look designed. The eye notices a 3 px misalignment even when it cannot name it.",
    commonMistakes: ["Header content and page content on different left edges.", "Offsets of 3 to 5 px between things that should line up.", "Centred headings over left-aligned content.", "Icons aligned by their bounding box, not their visual weight."],
    mentorNote: "Random 3–5px offsets are usually a symptom of inconsistent structure.",
  }),
  contentWidth: entry({
    id: "content-width",
    title: "Content width",
    safeStartingPoint: "1200–1440 px",
    commonRange: "1200–1440 for application layouts, 600–760 for reading columns",
    summary: "The maximum width content grows to before the margins take the rest.",
    why: "Past a point, extra width only stretches lines and spreads related things apart.",
    whenToDeviate: "Data tables and canvases can use the full width. Forms and articles should be much narrower.",
    official: [
      { text: "Default maximum page width is 1020 px; prefer a two-thirds column for readability.", citation: cite.govukLayout },
      { text: "Deliver at least 320, 768 and 1440 px layouts.", citation: cite.sgdsBreakpoint },
    ],
    starter: { label: "Desktop content width", context: "Application layouts" },
  }),
  hierarchy: craft({
    id: "visual-hierarchy",
    title: "Visual hierarchy",
    summary: "On any screen, one thing should be most important, a few things second, and the rest quiet. Squint: what you still see is your hierarchy.",
    why: "People decide where to look in under a second. If the screen does not decide for them, they scan everything.",
    commonMistakes: ["Three buttons of equal weight.", "Every card with its own bold heading, icon and badge.", "Emphasis added to the weak element when the fix is to quieten the strong ones."],
    mentorNote: "If everything is equally prominent, nothing is prominent.",
  }),

  // --- Buttons -----------------------------------------------------------
  buttonHeight: entry({
    id: "button-height",
    title: "Button height",
    safeStartingPoint: "40–48 px",
    commonRange: "32–36 compact, 40–48 standard, 48–56 large or touch",
    summary: "Typical heights in desktop product interfaces. Touch sizes are set by standards and platforms, shown separately below.",
    why: "40 px reads clearly as a button without dominating a form; 48 px is comfortable for touch.",
    whenToDeviate: "Dense toolbars and tables use 28 to 32. Match your input height so buttons and fields sit on one line.",
    commonMistakes: ["Three or four button heights in one product.", "A button shorter than the field beside it."],
    official: [
      { text: "The pointer target must be at least 24 by 24 CSS pixels.", citation: wcag("2.5.8") },
      { text: "A button needs a hit region of at least 44 × 44 pt.", citation: cite.appleButtons },
      { text: "Touch targets of at least 48 × 48 dp.", citation: cite.androidTargets },
      { text: "The Button page lists a 48 px height token for the default size.", citation: cite.sgdsButton },
    ],
    starter: { label: "Button height", context: "Desktop product UI" },
  }),
  buttonHierarchy: craft({
    id: "button-hierarchy",
    title: "Button hierarchy",
    summary: "One primary action per view. Everything else steps down: secondary, tertiary, then links.",
    why: "The primary button answers the question: what do I do next? Two primaries give two answers.",
    scale: [
      { value: "Primary", label: "The main action", use: "One per view. Filled, highest contrast." },
      { value: "Secondary", label: "Alternatives", use: "Outlined or tonal. Cancel, Back, Save draft." },
      { value: "Tertiary", label: "Low emphasis", use: "Text only. Minor or repeated actions." },
      { value: "Destructive", label: "Cannot be undone", use: "Marked as dangerous, kept out of the default position, and confirmed." },
      { value: "Icon-only", label: "Space-saving", use: "Only for widely understood icons, always with an accessible name." },
    ],
    commonMistakes: ["Every action styled as primary.", "Labels that are not verbs: OK, Yes, Submit.", "Icon-only buttons people have to hover to understand.", "Disabled buttons with no explanation of what is missing.", "A spinner that changes the button's width."],
    mentorNote: "Check whether the label still makes sense read on its own.",
    official: [
      { text: "Avoid multiple default buttons on a single page. Avoid disabled buttons if possible.", citation: cite.govukButton },
      { text: "Keep prominent buttons to one or two per view. Do not give the primary role to a destructive action.", citation: cite.appleButtons },
      { text: "Do not use a button for navigation when a link would be clearer.", citation: cite.sgdsButton },
    ],
  }),

  // --- Inputs and forms --------------------------------------------------
  inputHeight: entry({
    id: "input-height",
    title: "Input height",
    safeStartingPoint: "40–48 px",
    commonRange: "32–36 compact, 40–48 standard",
    summary: "Text fields, selects and buttons in the same form should share one height.",
    why: "Shared height lets controls sit on one baseline, and 40 px or more is comfortable to click and tap.",
    whenToDeviate: "Filters and table toolbars can be shorter. Mobile forms should stay at 44 to 48.",
    starter: { label: "Input height", context: "Desktop forms" },
  }),
  formLayout: entry({
    id: "form-layout",
    title: "Labels, help and spacing",
    safeStartingPoint: "Label above the field",
    commonRange: "4–8 px label to field, 16–24 px between fields, 32 px or more between groups",
    summary: "Labels above fields, help text under the label or field, errors at the field. One column unless fields are short and clearly paired.",
    why: "A label above its field survives long labels, translation and narrow screens, and gives one straight line to scan down.",
    whenNotToUse: ["Placeholder text as the only label: it disappears when people type.", "Two columns for unrelated fields."],
    commonMistakes: ["Field gaps equal to group gaps, so groups vanish.", "Help text that only appears on focus.", "A long form with no sections or progress."],
    official: [
      { text: "Always pair the input with a visible label. Do not rely on placeholder text as the only label. Use hint text to clarify the expected value.", citation: cite.sgdsInput },
      { text: "Indicate if input fields are mandatory or optional.", citation: guidanceCitation(getGuidance("bd-7")) },
      { text: "Add (optional) to the labels of optional fields. Never mark mandatory fields with asterisks.", citation: cite.govukQuestionPages },
    ],
  }),
  formStates: craft({
    id: "field-states",
    title: "Design every field state",
    summary: "A field is not one design. Draw empty, filled, focused, error, disabled, read-only, loading and success before calling it done.",
    why: "The states you skip are designed later by whoever builds it, under time pressure.",
    commonMistakes: ["Disabled and read-only looking the same.", "Error state shown by a red border only.", "No visible focus state."],
    mentorNote: "Design the ugly states too.",
    official: [
      { text: "Identify the field in error and describe the error in text.", citation: wcag("3.3.1") },
      { text: "Keyboard focus must be visible.", citation: wcag("2.4.7") },
    ],
  }),

  // --- Cards -------------------------------------------------------------
  needACard: craft({
    id: "do-i-need-a-card",
    title: "Do I actually need a card?",
    summary: "Not every group needs a container. A card should mean: this is one self-contained object, such as a product, a message or a file.",
    why: "Containers are the easiest way to separate things, so they get reached for first. Each one adds a border, a background, padding and a radius to the screen.",
    whenToUse: ["The content is an independent object people act on as a whole.", "Items repeat in a grid or list and need clear edges.", "The surface is interactive or draggable as a unit."],
    whenNotToUse: ["Spacing alone already shows the grouping.", "A section heading would do.", "A divider would do.", "You are putting a card inside another card."],
    commonMistakes: ["Every section of a page in its own rounded card.", "Card, inside card, inside panel.", "Identical card layouts for unlike content."],
    mentorNote: "Not everything needs a card.",
    aiWarning: "Generated interfaces overuse containers because a card is an easy way to create separation. Try a heading, spacing and one meaningful container instead.",
  }),

  // --- Density -----------------------------------------------------------
  density: entry({
    id: "density",
    title: "Compact, comfortable or spacious",
    safeStartingPoint: "Comfortable",
    commonRange: "Row height: 32–36 compact, 40–48 comfortable, 56+ spacious",
    summary: "Density is how much fits on screen. Match it to how people use the product, not to how good it looks empty.",
    why: "Expert users working all day want to see more at once. Occasional users need room to find their way.",
    scale: [
      { value: "Compact", label: "Data-heavy applications, admin tools", use: "Many rows, frequent comparison, expert users. Smaller text, tight rows, fewer containers." },
      { value: "Comfortable", label: "Most consumer apps and general product UI", use: "A balance of scanning and clarity. The default when unsure." },
      { value: "Spacious", label: "Content sites, marketing pages, onboarding", use: "One idea at a time, generous spacing, larger type." },
    ],
    whenToDeviate: "Mobile needs touch-sized targets however dense the content. Offer a density setting when both experts and newcomers use the same table.",
    commonMistakes: ["Marketing-page spacing inside a data tool.", "Dense and spacious areas mixed on one screen without reason."],
    mentorNote: "When people ask for it tighter, they usually mean they want to compare more rows without scrolling.",
  }),

  // --- Tokens ------------------------------------------------------------
  tokenBasics: entry({
    id: "basic-token-set",
    title: "A basic token set",
    safeStartingPoint: "Name by role",
    summary: "A token is a named design decision. Start with a small set named for what each value is for, and reference tokens in components, never raw values.",
    why: "Named decisions can be changed in one place, checked for consistency and handed to engineering without translation.",
    scale: [
      { value: "Spacing", label: "space-1, space-2, space-3", use: "Steps on your spacing scale." },
      { value: "Radius", label: "radius-sm, radius-md, radius-lg", use: "Two or three values tied to component size." },
      { value: "Colour", label: "bg-default, bg-subtle, text-primary, text-secondary, border-default, action-primary, feedback-error, feedback-success", use: "Named by role, pointing at palette values." },
      { value: "Elevation", label: "elevation-0, elevation-1, elevation-2", use: "One per level on your elevation ladder." },
    ],
    commonMistakes: ["One-off values typed directly into components.", "Tokens named after the value, such as blue-500 used for links, so a rebrand breaks the name.", "More tokens than decisions."],
    mentorNote: "A design system is useful because it reduces decisions, not because it gives you more tokens.",
    official: [
      { text: "Five layers: raw values, primitive, simplified semantic, granular semantic and component-specific tokens. Start with simplified semantic tokens when the UI role is clear.", citation: cite.sgdsTokens },
      { text: "Functional colours are named by use; only use them in the context they were designed for.", citation: cite.govukColour },
    ],
  }),
} satisfies Record<string, CraftEntry>;

export const craftEntries: CraftEntry[] = Object.values(e);

/** The cheat sheets made of editorial entries. Sourced sheets live in cheat-sheets.ts. */
export const craftSheets: CheatSheet[] = [
  {
    slug: "spacing",
    title: "Spacing",
    description: "A working scale, padding, gaps and section spacing, and how spacing shows what belongs together.",
    group: "Foundations",
    dateUpdated: REVIEWED,
    sections: [
      { id: "scale", title: "Scale", rules: [], entries: [e.spacingScale, e.spacingRelationships] },
      { id: "padding", title: "Padding and sections", rules: [], entries: [e.padding, e.sectionSpacing] },
    ],
  },
  {
    slug: "typography",
    title: "Typography",
    description: "Font sizing, line height, line length, and how few sizes you can get away with.",
    group: "Foundations",
    dateUpdated: REVIEWED,
    sections: [
      { id: "sizes", title: "Sizes", rules: [], entries: [e.bodyText, e.pageTitle, e.typeAudit] },
      { id: "reading", title: "Line height and length", rules: [], entries: [e.lineHeight, e.lineLength] },
    ],
  },
  {
    slug: "colour",
    title: "Colour",
    description: "Neutrals, the roles a palette needs, and giving every colour a job.",
    group: "Foundations",
    dateUpdated: REVIEWED,
    sections: [
      { id: "neutrals", title: "Neutrals", rules: [], entries: [e.neutrals] },
      { id: "roles", title: "Roles", rules: [], entries: [e.colourRoles, e.colourJob] },
    ],
  },
  {
    slug: "radius",
    title: "Border Radius",
    description: "How round, how many values, and when roundness starts to look templated.",
    group: "Foundations",
    dateUpdated: REVIEWED,
    sections: [{ id: "radius", title: "Radius", rules: [], entries: [e.radius] }],
  },
  {
    slug: "shadows-and-borders",
    title: "Shadows and Borders",
    description: "An elevation ladder, and when a border, a shadow or neither is the right separator.",
    group: "Foundations",
    dateUpdated: REVIEWED,
    sections: [
      { id: "elevation", title: "Shadows and elevation", rules: [], entries: [e.elevation] },
      { id: "borders", title: "Borders", rules: [], entries: [e.borders] },
    ],
  },
  {
    slug: "layout",
    title: "Layout",
    description: "Alignment, grid, content width and visual hierarchy.",
    group: "Foundations",
    dateUpdated: REVIEWED,
    sections: [
      { id: "structure", title: "Structure", rules: [], entries: [e.alignment, e.contentWidth] },
      { id: "hierarchy", title: "Hierarchy", rules: [], entries: [e.hierarchy, e.spacingRelationships] },
    ],
  },
  {
    slug: "density",
    title: "Density",
    description: "Compact, comfortable or spacious: when to make it tighter.",
    group: "Foundations",
    dateUpdated: REVIEWED,
    sections: [{ id: "density", title: "Density", rules: [], entries: [e.density] }],
  },
  {
    slug: "design-tokens",
    title: "Design Tokens",
    description: "A basic token set, how to name it, and how SGDS structures its own.",
    group: "Foundations",
    dateUpdated: REVIEWED,
    sections: [{ id: "tokens", title: "Tokens", rules: [], entries: [e.tokenBasics] }],
  },
  {
    slug: "buttons",
    title: "Buttons",
    description: "Height, hierarchy, labels and the states people forget.",
    group: "Components",
    dateUpdated: REVIEWED,
    component: {
      anatomy: ["Container", "Label", "Optional icon"],
      states: ["Default", "Hover", "Focus", "Pressed", "Disabled", "Loading"],
      edgeCases: ["Very long label", "Translated label", "Icon only", "Loading without changing width", "Two buttons that wrap onto separate lines"],
      checklist: ["The primary action is obvious", "No more than one primary per view", "Labels are verbs", "Icon-only buttons have an accessible name", "Focus state is visible", "Hit area meets the platform minimum"],
    },
    sections: [
      { id: "size", title: "Size", rules: [], entries: [e.buttonHeight] },
      { id: "hierarchy", title: "Hierarchy", rules: [], entries: [e.buttonHierarchy] },
    ],
  },
  {
    slug: "cards",
    title: "Cards",
    description: "When a container helps, when it is noise, and what to use instead.",
    group: "Components",
    dateUpdated: REVIEWED,
    component: {
      anatomy: ["Container", "Optional media", "Title", "Supporting content", "Optional actions"],
      states: ["Default", "Hover, if clickable", "Focus, if clickable", "Selected", "Loading"],
      edgeCases: ["Very long title", "Missing image", "One card alone in a grid", "Hundreds of cards", "Cards of unequal height in a row"],
      checklist: ["Each card is one independent object", "No card inside a card", "Padding and radius match across cards", "If the whole card is clickable, it has one clear target", "Shadow only where the card overlaps something"],
    },
    sections: [{ id: "need", title: "Before adding one", rules: [], entries: [e.needACard, e.padding, e.radius] }],
  },
];
