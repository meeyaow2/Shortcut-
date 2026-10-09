import type { Citation } from "@/types";
import { cite } from "./citations";
import { viewportCite } from "./viewports";

/**
 * Google and Material Design.
 *
 * `summary` and `points` restate each component's Overview page on
 * m3.material.io, read on READ. Only the Overview tab was read: anatomy,
 * measurements, states and accessibility detail live on Material's Specs,
 * Guidelines and Accessibility tabs, and Shortcut links to them instead of
 * repeating or guessing them. `watch` is Shortcut's own note and is labelled
 * as such. Android guidance is kept apart from Material, because it is
 * platform guidance and does not apply to the web.
 */
const READ = "2026-10-09";
const M3 = "https://m3.material.io";

const m3 = (label: string, path: string, datePublished?: string): Citation => ({ sourceId: "material", label: `Material Design 3, ${label}`, url: `${M3}${path}`, datePublished, dateVerified: READ });

export const materialCite = {
  components: m3("Components", "/components"),
  expressive: m3("Start building with Material 3 Expressive", "/blog/building-with-m3-expressive", "2025-05-13"),
  breakpoints: m3("Breakpoints", "/foundations/layout/breakpoints/overview"),
  geminiSources: { sourceId: "material", label: "Gemini Apps Help, View related sources", url: "https://support.google.com/gemini/answer/14143489", dateVerified: READ } as Citation,
  figmaKit: { sourceId: "material", label: "Material Design, Figma Design Kit (linked from the Expressive announcement)", url: "https://goo.gle/42etJvz", dateVerified: null } as Citation,
};

export type MaterialGroup = "Action" | "Communication" | "Containment" | "Navigation" | "Selection" | "Text input";

export interface MaterialComponent {
  id: string;
  name: string;
  group: MaterialGroup;
  /** Material's one-line description. */
  summary: string;
  /** Key points from the Overview page. */
  points: string[];
  variants?: string;
  /** A status note Material itself gives, such as a replacement. */
  status?: string;
  /** Shortcut's note: what to watch for. Editorial. */
  watch: string;
  related?: string[];
  /** A Shortcut cheat sheet or comparison on the same subject. */
  shortcut?: { label: string; href: string };
}

const c = (input: MaterialComponent) => input;

/** The 36 components listed on Material's Components page, grouped by Shortcut under Material's six categories. */
export const materialComponents: MaterialComponent[] = [
  // Action
  c({ id: "buttons", name: "Buttons", group: "Action", summary: "Buttons prompt most actions in a UI.", variants: "Default and toggle. Five colour options: elevated, filled, tonal, outlined and text.", points: ["Five size recommendations, from extra small to extra large.", "Two shape options: round and square.", "Can contain an optional leading icon.", "Keep labels concise and use sentence case."], watch: "Five colours times five sizes times two shapes is a lot of choice. Decide which few your product uses.", related: ["icon-buttons", "button-groups", "split-button"], shortcut: { label: "Buttons cheat sheet", href: "/cheat-sheets/buttons" } }),
  c({ id: "icon-buttons", name: "Icon buttons", group: "Action", summary: "Icon buttons help people take actions with a single tap.", variants: "Default and toggle, in standard, filled, filled tonal and outlined styles.", points: ["Must use a system icon with a clear meaning.", "On web, display a tooltip describing the action while hovering.", "In toggle buttons, use the outlined icon for unselected and the filled icon for selected."], watch: "A tooltip on hover does not help touch users. The icon has to be understood on its own.", related: ["buttons", "tooltips"], shortcut: { label: "Icons cheat sheet", href: "/cheat-sheets/icons" } }),
  c({ id: "floating-action-button", name: "Floating action buttons (FABs)", group: "Action", summary: "FABs help people take primary actions.", variants: "FAB, medium FAB and large FAB.", points: ["Use a FAB for the most common or important action on a screen.", "Make sure the icon is clear and understandable.", "FABs persist on screen while content scrolls."], watch: "One per screen. A FAB for a secondary action teaches people to ignore it.", related: ["extended-fab", "fab-menu"] }),
  c({ id: "extended-fab", name: "Extended FABs", group: "Action", summary: "Extended FABs help people take primary actions.", variants: "Small, medium and large.", points: ["Use for the most common or important action on a screen.", "Use instead of a FAB when label text is needed to understand the action."], watch: "If the icon needs a label to make sense, this is the honest choice.", related: ["floating-action-button"] }),
  c({ id: "fab-menu", name: "FAB menu", group: "Action", summary: "The FAB menu opens from a FAB to display multiple related actions.", variants: "Primary, secondary and tertiary colour sets.", points: ["Opens from a FAB to show 2 to 6 related actions.", "One FAB menu size for all sizes of FAB.", "Not used with extended FABs."], status: "New in Material 3 Expressive.", watch: "Related actions only. Unrelated ones belong in navigation or a toolbar.", related: ["floating-action-button", "menus"] }),
  c({ id: "button-groups", name: "Button groups", group: "Action", summary: "Button groups organise buttons and add interactions between them.", variants: "Standard and connected.", points: ["Connected button groups replace the segmented button.", "Support single-select, multi-select and selection-required.", "Work with all button sizes and can contain buttons and icon buttons.", "Apply a shape morph when pressed and selected."], status: "New in Material 3 Expressive.", watch: "The connected kind is Material's current answer for choosing one of a few options.", related: ["segmented-buttons", "buttons"] }),
  c({ id: "split-button", name: "Split buttons", group: "Action", summary: "Split buttons open a menu to give people more options related to an action.", points: ["Use to show an action with a menu of related actions.", "Made of a common button and a menu icon button.", "Same size range as buttons and icon buttons."], status: "New in Material 3 Expressive. The Overview page lists the web implementation as unavailable.", watch: "The main half should be the action most people want. Hide alternatives, not the default.", related: ["buttons", "menus"] }),
  c({ id: "segmented-buttons", name: "Segmented buttons", group: "Action", summary: "Segmented buttons help people select options, switch views, or sort elements.", variants: "Single-select and multi-select.", points: ["Can contain icons, label text, or both.", "Use for simple choices between two to five items."], status: "No longer recommended in the Material 3 Expressive update. Material says to use the connected button group instead.", watch: "Check which version your team is on before choosing between this and a connected button group.", related: ["button-groups"] }),
  // Communication
  c({ id: "badges", name: "Badges", group: "Communication", summary: "Badges show notifications, counts, or status information on navigation items and icons.", variants: "Small and large.", points: ["Can contain labels or numbers.", "Anchor inside the icon bounding box, at the upper trailing edge.", "Limit content to four characters, including a plus sign.", "Keep the default colour mapping."], watch: "A badge on everything means nothing. Reserve it for what needs attention.", related: ["navigation-bar"] }),
  c({ id: "loading-indicator", name: "Loading indicator", group: "Communication", summary: "Loading indicators show the progress of a process for a short wait time.", variants: "Loading indicator and contained loading indicator.", points: ["Recommended as a replacement for indeterminate circular progress indicators.", "Always reflect an ongoing process; never simply decorative.", "Used for pull-to-refresh.", "Not used for processes that move from indeterminate to determinate."], status: "New in Material 3 Expressive.", watch: "For short waits only. A long wait needs progress, not a prettier spinner.", related: ["progress-indicators"], shortcut: { label: "Loading States cheat sheet", href: "/cheat-sheets/loading-states" } }),
  c({ id: "progress-indicators", name: "Progress indicators", group: "Communication", summary: "Progress indicators show the status of a process in real time.", variants: "Linear and circular.", points: ["Use the same configuration for all instances of a process, such as loading.", "They capture attention through motion.", "An optional wave on the active track adds expressiveness."], watch: "Pick one style per kind of process and keep it everywhere.", related: ["loading-indicator"], shortcut: { label: "Loading States cheat sheet", href: "/cheat-sheets/loading-states" } }),
  c({ id: "snackbar", name: "Snackbar", group: "Communication", summary: "Snackbars show short updates about app processes at the bottom of the screen.", points: ["Should not interrupt the user's experience.", "Usually appear at the bottom of the UI.", "Can disappear on their own or stay until the user acts."], watch: "If the message matters, one that vanishes on its own will be missed by some people.", related: ["dialogs"], shortcut: { label: "Alerts compared across systems", href: "/explorer/alert" } }),
  c({ id: "tooltips", name: "Tooltips", group: "Communication", summary: "Tooltips display brief labels or messages.", variants: "Plain and rich.", points: ["Use to add context to a button or other UI element.", "Plain tooltips describe elements or actions of icon buttons.", "Rich tooltips give more detail and can include a title, link and buttons."], watch: "Never the only place essential information lives.", related: ["icon-buttons"] }),
  // Containment
  c({ id: "bottom-sheets", name: "Bottom sheets", group: "Containment", summary: "Bottom sheets show secondary content anchored to the bottom of the screen.", variants: "Standard and modal.", points: ["Use in compact and medium breakpoints.", "Content should be additional or secondary, not the app's main content.", "Can be dismissed to interact with the main content."], watch: "On wider windows, Material points to a side sheet instead.", related: ["side-sheets", "dialogs"], shortcut: { label: "Drawers cheat sheet", href: "/cheat-sheets/drawers" } }),
  c({ id: "side-sheets", name: "Side sheets", group: "Containment", summary: "Side sheets show secondary content anchored to the side of the screen.", variants: "Standard and modal.", points: ["Use to provide optional content and actions without interrupting the main content.", "People can navigate to another region within the sheet.", "Can contain a back icon for navigation."], watch: "Standard leaves the page usable; modal does not. Choose on purpose.", related: ["bottom-sheets"], shortcut: { label: "Drawers cheat sheet", href: "/cheat-sheets/drawers" } }),
  c({ id: "cards", name: "Cards", group: "Containment", summary: "Cards display content and actions about a single subject.", variants: "Elevated, filled and outlined.", points: ["Use cards to contain related elements.", "Contents can include images, headlines, supporting text, buttons and lists.", "Layouts and dimensions flex with their contents."], watch: "One subject per card. If everything is a card, nothing is grouped.", shortcut: { label: "Cards cheat sheet", href: "/cheat-sheets/cards" } }),
  c({ id: "carousel", name: "Carousel", group: "Containment", summary: "Carousels show a collection of items that can be scrolled on and off the screen.", variants: "Six layouts: multi-browse, uncontained, uncontained multi-aspect ratio, hero, centre-aligned hero and full-screen.", points: ["Contain visual items such as images or video, with optional label text.", "Layouts can be start-aligned or centre-aligned.", "Items change size as they move through the carousel."], watch: "Anything off screen is seen less. Do not put the one thing people need in slot four.", related: ["lists"] }),
  c({ id: "dialogs", name: "Dialogs", group: "Containment", summary: "Dialogs provide important prompts in a user flow.", variants: "Basic and full-screen.", points: ["Use dialogs to make sure users act on information.", "Should be dedicated to completing a single task.", "Commonly used to confirm high-risk actions like deleting progress."], watch: "A dialog interrupts. If the page behind still matters, use a sheet.", related: ["bottom-sheets", "snackbar"], shortcut: { label: "Modals cheat sheet", href: "/cheat-sheets/modals" } }),
  c({ id: "divider", name: "Divider", group: "Containment", summary: "Dividers are thin lines that group content in lists or other containers.", points: ["Make dividers visible but not bold.", "Only use dividers if items cannot be grouped with open space.", "Use dividers to group things, not separate individual items."], watch: "Material itself says to try space first. So does Shortcut.", related: ["lists"], shortcut: { label: "Shadows and Borders cheat sheet", href: "/cheat-sheets/shadows-and-borders" } }),
  c({ id: "lists", name: "Lists", group: "Containment", summary: "Lists are continuous, vertical indexes of text and images.", variants: "Standard and segmented styles.", points: ["Use lists to help people find a specific item and act on it.", "Order items in logical ways, such as alphabetical or numerical.", "Keep items short and easy to scan.", "Show icons, text and actions in a consistent format."], watch: "Consistency is the whole point. One row with a different layout breaks scanning.", related: ["divider", "cards"] }),
  // Navigation
  c({ id: "app-bars", name: "App bars", group: "Navigation", summary: "App bars are placed at the top of the screen to help people navigate through a product.", variants: "Search app bar, small, medium flexible and large flexible.", points: ["Describe the current page and provide one or two essential actions.", "Use a toolbar, not the app bar, to display page actions.", "On scroll, apply a fill colour to separate from body content."], watch: "One or two actions. The rest go in a toolbar or a menu.", related: ["toolbars", "search"] }),
  c({ id: "navigation-bar", name: "Navigation bar", group: "Navigation", summary: "Navigation bars let people switch between UI views on smaller devices.", points: ["Use in compact or medium window sizes.", "Can contain 3 to 5 destinations of equal importance.", "Destinations do not change. Keep them consistent across screens."], watch: "Three to five. A sixth destination means rethinking the structure, not shrinking the labels.", related: ["navigation-rail", "navigation-drawer"], shortcut: { label: "Navigation cheat sheet", href: "/cheat-sheets/navigation" } }),
  c({ id: "navigation-rail", name: "Navigation rail", group: "Navigation", summary: "Navigation rails let people switch between UI views on mid-sized devices.", variants: "Collapsed and expanded, which can transition between each other.", points: ["Use in medium, expanded, large or extra-large window sizes.", "Can contain 3 to 7 destinations plus an optional FAB.", "Always put the rail in the same place, even on different screens of an app."], watch: "The expanded rail is Material's replacement for the navigation drawer.", related: ["navigation-bar", "navigation-drawer"], shortcut: { label: "Navigation cheat sheet", href: "/cheat-sheets/navigation" } }),
  c({ id: "navigation-drawer", name: "Navigation drawer", group: "Navigation", summary: "Navigation drawers let people switch between UI views on larger devices.", variants: "Standard and modal.", points: ["Use standard drawers in expanded, large and extra-large breakpoints.", "Use modal drawers in compact and medium breakpoints.", "Put the most frequent destinations at the top and group related ones together."], status: "No longer recommended in the Material 3 Expressive update. Material says to use an expanded navigation rail instead.", watch: "Still common in shipped apps. Check your version before specifying one.", related: ["navigation-rail"] }),
  c({ id: "search", name: "Search", group: "Navigation", summary: "Use search for navigating a product with queries.", points: ["A search bar can include a leading search icon, hinted text and optional trailing icons.", "Search can display suggested keywords or phrases as a person types.", "Use a search app bar to provide an emphasised, global entry point."], watch: "Search does not replace navigation. People who do not know the word still need a way in.", related: ["app-bars"] }),
  c({ id: "tabs", name: "Tabs", group: "Navigation", summary: "Tabs organise content across different screens and views.", variants: "Primary and secondary.", points: ["Use tabs to group content into helpful categories.", "Tabs can scroll horizontally, so a UI can have as many as needed.", "Place tabs next to each other as peers."], watch: "\"As many as needed\" is permission, not advice. Most systems say keep them few.", shortcut: { label: "Tabs compared across systems", href: "/explorer/tabs" } }),
  c({ id: "toolbars", name: "Toolbars", group: "Navigation", summary: "Toolbars display frequently used actions relevant to the current page.", variants: "Docked toolbar and floating toolbar.", points: ["Can display buttons, icon buttons, text fields and other controls.", "Can be paired with FABs to emphasise certain actions.", "Do not show at the same time as a navigation bar."], status: "New in Material 3 Expressive.", watch: "A toolbar and a navigation bar compete for the same strip of screen. Material says pick one.", related: ["app-bars", "navigation-bar"] }),
  // Selection
  c({ id: "checkbox", name: "Checkbox", group: "Selection", summary: "Checkboxes let users select one or more items from a list, or turn an item on or off.", points: ["Use checkboxes, not switches or radio buttons, if multiple options can be selected from a list.", "Labels should be scannable.", "Selected items are more prominent than unselected items."], watch: "For a setting that applies at once, Material points to a switch.", related: ["switch", "radio-button"], shortcut: { label: "Checkbox compared across systems", href: "/explorer/checkbox" } }),
  c({ id: "chips", name: "Chips", group: "Selection", summary: "Chips help people enter information, make selections, filter content, or trigger actions.", variants: "Assist, filter, input and suggestion.", points: ["Use chips to show options for a specific context.", "Elevation defaults to 0 but can be raised for more visual separation."], watch: "Four kinds that look alike and behave differently. Use one kind per row.", related: ["button-groups"] }),
  c({ id: "date-pickers", name: "Date pickers", group: "Selection", summary: "Date pickers let people select a date, or a range of dates.", variants: "Docked, modal and modal input.", points: ["Can display past, present or future dates.", "Clearly indicate important dates, such as current and selected days.", "Follow common patterns, like a calendar view."], watch: "For a date people know by heart, such as a birthday, typing is faster than a calendar.", related: ["time-pickers", "text-fields"] }),
  c({ id: "time-pickers", name: "Time pickers", group: "Selection", summary: "Time pickers help people select and set a specific time.", variants: "Dial and input.", points: ["Time pickers are modal and cover the main content.", "People can select hours, minutes or periods of time.", "Make sure time can easily be selected by hand on a mobile device."], watch: "Offer the input variant. A dial is slow for anyone who already knows the time.", related: ["date-pickers"] }),
  c({ id: "menus", name: "Menus", group: "Selection", summary: "Menus display a list of choices on a temporary surface.", points: ["Use a menu to show a temporary set of actions. To show actions at all times, use a toolbar.", "Menus can open from many components, including icon buttons, split buttons and text fields.", "Context menus provide actions for a specific element and usually open with a secondary click."], watch: "A menu hides its contents. Anything used constantly should not live in one.", related: ["split-button", "toolbars"], shortcut: { label: "Dropdowns cheat sheet", href: "/cheat-sheets/dropdowns" } }),
  c({ id: "radio-button", name: "Radio button", group: "Selection", summary: "Radio buttons let people select one option from a set of options.", points: ["Use radio buttons, not switches, when only one item can be selected from a list.", "Labels should be scannable.", "Selected items are more prominent than unselected items."], watch: "Shows every option at once. That is its advantage over a menu.", related: ["checkbox", "button-groups"], shortcut: { label: "Radio compared across systems", href: "/explorer/radio" } }),
  c({ id: "sliders", name: "Sliders", group: "Selection", summary: "Sliders allow users to make selections from a range of values.", variants: "Standard, centred and range.", points: ["Five sizes, vertical and horizontal orientation, and an optional inset icon.", "Should present the full range of available values.", "The value should take effect immediately."], watch: "Good for approximate values. For an exact number, pair it with a field." }),
  c({ id: "switch", name: "Switch", group: "Selection", summary: "Switches toggle the selection of an item on and off.", points: ["Use switches, not radio buttons, if items in a list can be independently controlled.", "Switches are the best way to let people adjust settings.", "Make sure the selection is visible at a glance."], watch: "A switch acts at once. If the change needs a Save button, use a checkbox.", related: ["checkbox"] }),
  // Text input
  c({ id: "text-fields", name: "Text fields", group: "Text input", summary: "Text fields let users enter text into a UI.", variants: "Filled and outlined.", points: ["Make sure text fields look interactive.", "The state, such as blank, with input or error, should be visible at a glance.", "Keep labels and error messages brief and easy to act on."], watch: "Pick filled or outlined for the whole product. Mixing them reads as two systems.", related: ["search"], shortcut: { label: "Forms cheat sheet", href: "/cheat-sheets/forms" } }),
];

export const materialGroups: MaterialGroup[] = ["Action", "Communication", "Containment", "Navigation", "Selection", "Text input"];

export function getMaterialComponent(id: string): MaterialComponent | undefined {
  return materialComponents.find((component) => component.id === id);
}

export const componentUrl = (id: string, tab: "overview" | "specs" | "guidelines" | "accessibility" = "overview") => `${M3}/components/${id}/${tab}`;

// --- Material 3 Expressive -----------------------------------------------------------

export const expressive = {
  whatItIs: "An evolution of Material 3, announced on 13 May 2025. Google says it is not a new version: Material 3 is not deprecated and this is not \"M4\".",
  research: "Google describes 46 studies with more than 18,000 participants, and reports that people spotted key UI elements up to four times faster on expressive screens. These are Google's own figures.",
  changes: [
    { area: "Components", text: "Fourteen new or updated components. New: button groups, FAB menu, loading indicator, split button and toolbars." },
    { area: "Motion", text: "A spring-based motion system. Spatial springs for movement, effects springs for colour and opacity." },
    { area: "Typography", text: "New emphasised type styles, used to reinforce hierarchy and draw attention to key actions." },
    { area: "Shape", text: "A library of 35 shapes for decorative elements such as image crops and avatars, with shape-morph animation." },
    { area: "Colour", text: "An expanded range of colours to sharpen hierarchy and clarify key actions." },
  ],
  replaced: [
    { old: "Segmented buttons", now: "Connected button group" },
    { old: "Navigation drawer", now: "Expanded navigation rail" },
    { old: "Indeterminate circular progress indicator", now: "Loading indicator, for short waits" },
  ],
  takeaway: "For a working designer: check which version your team's library is on before specifying a segmented button or a navigation drawer. And treat \"expressive\" as a set of tools for hierarchy, not a reason to animate everything.",
};

// --- Breakpoints ----------------------------------------------------------------------

export const materialBreakpoints = {
  points: [
    "Five breakpoints: compact, medium, expanded, large and extra-large.",
    "Material now calls these breakpoints; they were previously window size classes.",
    "They apply to Android and to the web.",
    "Layouts typically move from one pane to two or three as the window grows.",
    "Crossing a breakpoint, decide which elements to reveal, divide, resize, reposition or swap.",
  ],
  why: "Material's reasons for designing to breakpoints, not devices: window space changes with multi-window modes and unfolding, and a device lands in different breakpoints depending on orientation.",
};

// --- Decision helpers -----------------------------------------------------------------

export interface DecisionHelper {
  id: string;
  need: string;
  options: { componentId: string; when: string }[];
  /** Shortcut's summary of the trade-off. */
  tradeOff: string;
}

export const decisionHelpers: DecisionHelper[] = [
  {
    id: "choose-one",
    need: "I need people to choose one option",
    options: [
      { componentId: "radio-button", when: "Only one item can be selected from a list, and seeing every option helps." },
      { componentId: "button-groups", when: "A simple choice between a few items. The connected kind replaces the segmented button." },
      { componentId: "menus", when: "A temporary list of choices, when there is no room to show them all." },
      { componentId: "chips", when: "Options for a specific context, such as filters." },
    ],
    tradeOff: "Visible options cost space; hidden ones cost a tap and are chosen less. Show them when you can.",
  },
  {
    id: "on-off",
    need: "I need people to turn something on or off",
    options: [
      { componentId: "switch", when: "Items can be controlled independently, as in settings. The change applies at once." },
      { componentId: "checkbox", when: "Several options can be selected from a list." },
    ],
    tradeOff: "A switch should take effect immediately. If nothing happens until Save, a checkbox is the honest control.",
  },
  {
    id: "secondary-content",
    need: "I need to show something over the page",
    options: [
      { componentId: "dialogs", when: "People must act on information, in a single task." },
      { componentId: "bottom-sheets", when: "Secondary content in compact and medium breakpoints." },
      { componentId: "side-sheets", when: "Optional content and actions that should not interrupt the main content." },
      { componentId: "snackbar", when: "A short update that should not interrupt." },
    ],
    tradeOff: "Ordered from most interrupting to least. Use the least interruption the message can survive.",
  },
  {
    id: "primary-navigation",
    need: "I need primary navigation",
    options: [
      { componentId: "navigation-bar", when: "Compact or medium windows, with 3 to 5 destinations of equal importance." },
      { componentId: "navigation-rail", when: "Medium windows and up, with 3 to 7 destinations." },
      { componentId: "tabs", when: "Grouping content into categories as peers, within a destination." },
    ],
    tradeOff: "The count of destinations decides more than the screen does. Material now points to the expanded rail where a drawer was used.",
  },
];

// --- Android platform guidance ----------------------------------------------------------

/** Platform guidance for Android apps. It is not Material Design and does not apply to the web as written. */
export const androidGuidance: { topic: string; text: string; citation: Citation }[] = [
  { topic: "Window size", text: "Window size classes are set by the window available to the app, not the device screen. Split-screen, resizable windows and folding all change it while the app runs.", citation: viewportCite.androidSizeClasses },
  { topic: "Height as well as width", text: "Most apps can adapt by width alone. In landscape on a phone the height is compact, and two-pane layouts are not practical.", citation: viewportCite.androidSizeClasses },
  { topic: "Foldables", text: "Folded and unfolded screens can differ substantially in size and aspect ratio, requiring alternative layouts.", citation: viewportCite.androidFoldables },
  { topic: "Postures", text: "A half-opened device can sit in tabletop or book posture. Keep dialogs and menus off the fold, and split content into two areas.", citation: viewportCite.androidFoldables },
  { topic: "Continuity", text: "An app stops and restarts as it moves between screens on a fold. It must preserve and restore its state.", citation: viewportCite.androidFoldables },
  { topic: "Touch targets", text: "Touch targets of at least 48 × 48 dp.", citation: cite.androidTargets },
];

/** Topics from the brief that Shortcut has not read Android's pages on. */
export const androidUnread = ["System bars and edge-to-edge", "Back navigation and predictive back", "Theming"];

// --- Google AI product patterns -----------------------------------------------------------

/** Observed in Google's product documentation. Product patterns, not design-system guidance. */
export const googleAiPatterns: { pattern: string; what: string; lesson: string; citation: Citation }[] = [
  {
    pattern: "Sources",
    what: "Gemini's help page says a Sources button appears at the bottom of a response or in line through it, and opens a side panel with the relevant links. Links may be public websites, files you uploaded, or Workspace documents if connected.",
    lesson: "Sources are reachable from the answer, and shown beside it instead of replacing it. Note the wording: \"when sources are available\". The design has a state for no sources.",
    citation: materialCite.geminiSources,
  },
];

export const googleAiUnread = ["AI input", "Progress states", "User approval for actions", "Editable output", "Uncertainty"];
