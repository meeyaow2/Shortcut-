import type { Citation, FoldState, Viewport, ViewportFilter, ViewportKey } from "@/types";

/**
 * Viewport references for the cheat sheets.
 *
 * The ranges and reference widths are Shortcut's own quick-reference bands.
 * They are not breakpoints and no organisation defines them. Device facts are
 * restated from the maker's own page, read on READ. Anything said about how
 * to design for a device is Shortcut's reading unless it carries a citation.
 */
const READ = "2026-10-09";

export const viewportCite = {
  duoHig: { sourceId: "apple", label: "Apple HIG, Designing for iPhone Duo", url: "https://developer.apple.com/design/human-interface-guidelines/designing-for-iphone-duo", datePublished: "2026-09-09", dateVerified: READ } as Citation,
  atlassianGrid: { sourceId: "atlassian", label: "Atlassian Design System, Grid", url: "https://atlassian.design/foundations/grid", dateVerified: READ } as Citation,
  fluentLayout: { sourceId: "fluent", label: "Fluent 2, Layout", url: "https://fluent2.microsoft.design/layout", dateVerified: READ } as Citation,
  fluentButton: { sourceId: "fluent", label: "Fluent 2, Button usage", url: "https://fluent2.microsoft.design/components/web/react/core/button/usage", dateVerified: READ } as Citation,
  fluentDialog: { sourceId: "fluent", label: "Fluent 2, Dialog usage", url: "https://fluent2.microsoft.design/components/web/react/core/dialog/usage", dateVerified: READ } as Citation,
  primerLayout: { sourceId: "primer", label: "Primer, Layout", url: "https://primer.style/product/getting-started/foundations/layout/", dateVerified: READ } as Citation,
  uswdsGrid: { sourceId: "uswds", label: "USWDS, Layout grid", url: "https://designsystem.digital.gov/utilities/layout-grid/", dateVerified: READ } as Citation,
  nngResponse: { sourceId: "nng", label: "NN/g, Response Times: The 3 Important Limits", url: "https://www.nngroup.com/articles/response-times-3-important-limits/", datePublished: "1993-01-01", dateVerified: READ } as Citation,
  duoSpecs: { sourceId: "apple", label: "Apple, iPhone Duo technical specifications", url: "https://www.apple.com/iphone-duo/specs/", dateVerified: READ } as Citation,
  androidSizeClasses: { sourceId: "material", label: "Android Developers, Use window size classes", url: "https://developer.android.com/develop/ui/compose/layouts/adaptive/use-window-size-classes", dateVerified: READ } as Citation,
  androidFoldables: { sourceId: "material", label: "Android Developers, Learn about foldables", url: "https://developer.android.com/develop/ui/compose/layouts/adaptive/foldables/learn-about-foldables", dateVerified: READ } as Citation,
};

export interface ViewportInfo {
  id: Viewport;
  label: string;
  /** Approximate CSS width. A reading aid, not a breakpoint. */
  range: string;
  /** Widths worth opening a design at. */
  referenceWidths: string;
}

export const viewports: ViewportInfo[] = [
  { id: "mobile", label: "Mobile", range: "about 320–599 px", referenceWidths: "320 compact, 375 standard, 390–430 large" },
  { id: "tablet", label: "Tablet", range: "about 600–1023 px", referenceWidths: "768 tablet, 820 large tablet" },
  { id: "laptop", label: "Laptop", range: "about 1024–1279 px", referenceWidths: "1024, 1280" },
  { id: "desktop", label: "Desktop", range: "about 1280–1599 px", referenceWidths: "1440" },
  { id: "large", label: "Large", range: "1600 px and up", referenceWidths: "1920" },
];

export const viewportFilters: { id: ViewportFilter; label: string }[] = [
  { id: "all", label: "All" },
  ...viewports.map((v) => ({ id: v.id as ViewportFilter, label: v.label })),
  { id: "foldable", label: "Foldable" },
];

export const viewportKeyLabels: Record<ViewportKey, string> = {
  mobile: "Mobile",
  tablet: "Tablet",
  laptop: "Laptop",
  desktop: "Desktop",
  large: "Large desktop",
  foldableClosed: "Foldable, closed",
  foldableOpen: "Foldable, open",
};

/** The order values are listed in when every viewport is shown. */
export const viewportKeyOrder: ViewportKey[] = ["mobile", "tablet", "laptop", "desktop", "large", "foldableClosed", "foldableOpen"];

export function getViewport(id: Viewport): ViewportInfo {
  return viewports.find((v) => v.id === id)!;
}

/** The value key a selection reads from. Undefined when every viewport is shown. */
export function toViewportKey(filter: ViewportFilter, foldState: FoldState): ViewportKey | undefined {
  if (filter === "all") return undefined;
  if (filter === "foldable") return foldState === "open" ? "foldableOpen" : "foldableClosed";
  return filter;
}

/**
 * Where a missing value is borrowed from. Laptop and large fall back to
 * desktop. A closed fold reads as mobile and an open one as tablet, which is
 * Shortcut's reading and is labelled as such where it shows.
 */
export const viewportFallback: Partial<Record<ViewportKey, ViewportKey>> = {
  laptop: "desktop",
  large: "desktop",
  foldableClosed: "mobile",
  foldableOpen: "tablet",
};

export function resolveViewportValue(values: Partial<Record<ViewportKey, string>> | undefined, key: ViewportKey): { value: string; from?: ViewportKey } | undefined {
  if (!values) return undefined;
  if (values[key]) return { value: values[key]! };
  const from = viewportFallback[key];
  return from && values[from] ? { value: values[from]!, from } : undefined;
}

// --- Folding devices ------------------------------------------------------------

export interface FoldDisplay {
  mode: FoldState;
  name: string;
  /** As the maker states it. */
  size: string;
  /** Physical pixels, as the maker states them. Not a CSS width. */
  resolution: string;
  /** The size class Apple's guidance gives it. */
  sizeClass: string;
  /** Shortcut's reading: which viewport reference is closest. */
  treatAs: string;
}

export interface FoldableDevice {
  id: string;
  name: string;
  maker: string;
  displays: FoldDisplay[];
  citation: Citation;
}

export const foldableDevices: FoldableDevice[] = [
  {
    id: "iphone-duo",
    name: "iPhone Duo",
    maker: "Apple",
    displays: [
      { mode: "closed", name: "Outer display", size: "5.4 inch", resolution: "1398 × 2034 pixels at 460 ppi", sizeClass: "Compact width", treatAs: "Closest to the Mobile reference. It is wider and shorter than other iPhone displays." },
      { mode: "open", name: "Inner folding display", size: "7.6 inch", resolution: "1878 × 2670 pixels at 430 ppi", sizeClass: "Regular width", treatAs: "Closest to the Tablet reference." },
    ],
    citation: viewportCite.duoSpecs,
  },
];

export function getFoldableDevice(id: string): FoldableDevice | undefined {
  return foldableDevices.find((d) => d.id === id);
}

/** Said wherever physical pixels are shown, so they are not read as a CSS width. */
export const pixelsNote =
  "These are physical pixels. A browser reports a much smaller CSS width, because each CSS pixel is drawn with several physical ones. Apple's specifications page gives no CSS viewport width, so Shortcut gives none either.";

/**
 * Apple's guidance for iPhone Duo, one subject per card. `apple`, `pairs`,
 * `use` and `avoid` restate its Human Interface Guidelines page. `takeaway`
 * is Shortcut's and is labelled as such where it shows.
 */
export interface DuoCard {
  title: string;
  apple: string;
  pairs?: { label: string; value: string }[];
  use?: string[];
  avoid?: string[];
  takeaway?: string;
}

export const duoGuidance: DuoCard[] = [
  {
    title: "Use size classes",
    apple: "Two layouts cover every pose. Do not design a custom layout for each one.",
    pairs: [
      { label: "Closed", value: "Compact width" },
      { label: "Open", value: "Regular width" },
    ],
    takeaway: "Build one responsive interface, not a separate design for each folding state.",
  },
  {
    title: "Keep state and function",
    apple: "Keep the same functions and state on both displays. Add a level of hierarchy on the inner display if it suits the content.",
    takeaway: "Opening the device should feel like gaining space, not entering another app.",
  },
  {
    title: "Let the layout expand",
    apple: "Do not reinvent the app when it resizes. Let the existing layout expand.",
    use: ["Size classes", "Layout margins", "Safe area insets"],
    avoid: ["Fixed widths", "Anything tied to one display"],
  },
  {
    title: "Toolbars and tab bars",
    apple: "The system moves toolbars and tab bars to the side on the outer display, and on the inner display in landscape. This keeps vertical space for content.",
    takeaway: "Apple says not to override this in general. Leave it unless you have a strong reason.",
  },
  {
    title: "Partial fold",
    apple: "Keep important elements clear of the folding region. In a grid, prefer an even number of columns so content divides cleanly.",
  },
  {
    title: "Small changes, not rearrangement",
    apple: "Avoid extreme layout changes as people fold the device. Favour small adjustments.",
  },
];

/** The foldable guidance as a pair of lists. Shortcut's, drawn from the sources cited beside it. */
export const foldableDo = ["Design one layout that expands", "Keep the task, selection and typed text across the fold", "Use flexible sizing, margins and safe areas", "Test closed, open and half-open"];
export const foldableDont = ["Build a separate app for each state", "Use fixed screen dimensions", "Rearrange everything when it opens", "Put controls or text on the fold"];

/** States and situations to try before calling a foldable layout done. Shortcut's list. */
export const foldableTests = ["Closed", "Open, portrait", "Open, landscape", "Half open, with the fold across the screen", "Opened in the middle of a task", "Closed in the middle of a task", "Sharing the open screen with another app"];

/** Questions to ask in each state. These are Shortcut's, written to sit alongside Apple's guidance above. */
export const duoQuestions: Record<FoldState, { lead: string; items: string[]; caution?: string }> = {
  closed: {
    lead: "Wider and shorter than other iPhones. Check that:",
    items: ["Navigation still works with bars on the side instead of the bottom.", "Primary content stays visible without scrolling past chrome.", "Forms remain usable.", "Touch targets stay comfortable.", "Text does not become overly dense."],
  },
  open: {
    lead: "More room. Let the layout grow into it. Consider:",
    items: ["A two-column layout.", "A list beside its detail.", "A contextual side panel.", "Showing content that was behind a tap when closed.", "Use beside another app in a split view.", "A second level of information hierarchy."],
    caution: "More space does not automatically mean more content.",
  },
};

/** How each cheat sheet subject reads in each fold state. Shortcut's reading; `apple` is what Apple's page says on the subject. */
export const foldComparison: { subject: string; closed: string; open: string; apple?: string }[] = [
  { subject: "Spacing", closed: "Mobile reference.", open: "Tablet reference, with more room between regions.", apple: "Use layout margins and safe area insets, not fixed values." },
  { subject: "Navigation", closed: "Bars on the side, not the bottom.", open: "Bars on the side in landscape; standard horizontal bars in portrait.", apple: "The system moves toolbars and tab bars to the side. Do not override it in general." },
  { subject: "Layout", closed: "Usually a single pane.", open: "Can show two panes side by side.", apple: "A split view expands on the inner display and collapses to a single pane on the outer display." },
  { subject: "Density", closed: "Touch-friendly.", open: "More information without smaller targets.", apple: "Show an additional level of hierarchy on the inner display if it suits the content." },
];

export const foldableTopics: { title: string; text: string }[] = [
  { title: "Closed state", text: "A narrow, phone-like screen. Design it as a complete experience, not a preview of the open one." },
  { title: "Open state", text: "A wider screen with a different aspect ratio. The layout should grow into the width, not be scaled up in proportion and not be replaced with a different one." },
  { title: "Intermediate state", text: "A device can be used half open. Check that nothing important sits where the screen bends." },
  { title: "Orientation changes", text: "Open devices are rotated often. Both orientations need a layout that makes sense." },
  { title: "Continuity", text: "Opening or closing mid-task should keep the task, the place and anything typed." },
  { title: "Responsive reflow", text: "The change from closed to open is a large, sudden change in width. Treat it like any other width change: the content reflows, it does not reload." },
  { title: "Multitasking", text: "An open device is often split between two apps, so your layout may get half the width you designed for." },
  { title: "Hinge and fold", text: "Keep controls, text and dialogs off the fold line. Split content either side of it instead." },
  { title: "Dual-pane layouts", text: "List and detail, or content and tools, side by side. Useful when the two halves relate; noise when they do not." },
  { title: "Touch targets", text: "Both states are touch. More room is not a reason to shrink targets." },
  { title: "Content prioritisation", text: "Decide what appears only when open, and make sure nothing essential is in that group." },
  { title: "State preservation", text: "Selections, filters, form values and scroll position should survive the fold." },
];

// --- Same component, different viewports ----------------------------------------

export interface ComponentComparison {
  component: string;
  mobile: string;
  tablet: string;
  desktop: string;
  /** The cheat sheet with the detail. */
  sheet?: string;
}

/** Common ways one component changes with available width. Industry convention, written by Shortcut. */
export const componentComparisons: ComponentComparison[] = [
  { component: "Card", mobile: "Full width, stacked in one column, tighter padding.", tablet: "Two across, or one wide card with media beside text.", desktop: "Two to four across, capped by a maximum width.", sheet: "cards" },
  { component: "Button", mobile: "Often full width at the bottom of a form, sized for touch.", tablet: "Content width, sized for touch.", desktop: "Content width, aligned with the form or toolbar it belongs to.", sheet: "buttons" },
  { component: "Input", mobile: "Full width, one field per row, 44 to 48 px tall.", tablet: "Related short fields can sit side by side.", desktop: "Width matched to the expected answer, not stretched to the container.", sheet: "forms" },
  { component: "Modal", mobile: "Full screen or nearly full width for anything beyond a confirmation.", tablet: "Centred, sized to its content, inside the page margins.", desktop: "Centred, a fixed width chosen by content.", sheet: "modals" },
  { component: "Navigation", mobile: "Compact header with a menu, or bottom navigation for a few primary destinations.", tablet: "Primary items visible, lower-priority ones collapsed.", desktop: "Full navigation visible.", sheet: "navigation" },
  { component: "Table", mobile: "Stacked rows, key and value pairs, or expandable rows.", tablet: "Fewer columns, chosen by priority.", desktop: "The full table, with sticky headers and bulk actions.", sheet: "tables" },
  { component: "Tabs", mobile: "A scrolling row, or a select when there are many.", tablet: "A row, scrolling if it overflows.", desktop: "All tabs visible in one row." },
  { component: "Drawer", mobile: "Full width or nearly, often rising from the bottom.", tablet: "A moderate width, with the page still visible behind.", desktop: "A side panel taking a portion of the width.", sheet: "drawers" },
  { component: "Search", mobile: "An icon that opens a full-width search interface.", tablet: "A narrower field, or one that expands when focused.", desktop: "An inline field in the header." },
];

// --- Test matrix ----------------------------------------------------------------

export const testWidths: { width: string; note: string }[] = [
  { width: "320", note: "Compact mobile. Also the WCAG reflow width." },
  { width: "375", note: "Standard mobile." },
  { width: "390", note: "Large mobile." },
  { width: "430", note: "Largest common mobile." },
  { width: "768", note: "Tablet, portrait." },
  { width: "820", note: "Large tablet, portrait." },
  { width: "1024", note: "Small laptop, or tablet in landscape." },
  { width: "1280", note: "Laptop." },
  { width: "1440", note: "Desktop." },
  { width: "1920", note: "Large desktop." },
];

export const testFoldStates = ["Foldable, closed", "Foldable, open"];

/** What moves a starting point within its range. Shown wherever viewport values are. */
export const valueDependsOn = ["Product type", "Density", "Touch or pointer", "Information hierarchy", "Your design system", "The content itself", "Accessibility needs", "The width actually available"];
