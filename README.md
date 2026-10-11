# Shortcut

Everything UI/UX, without the rabbit hole. A UI/UX reference for designers: cheat sheets, design system comparisons, design checks, UX practice guides, AI and Figma guidance, and sourced answers. Every claim links to its source and shows when it was last verified.

Next.js (App Router), TypeScript, Tailwind CSS v4, Lucide. No backend. A few reader preferences (context, checklist ticks) live in `localStorage`.

## Running locally

Needs Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Then open http://localhost:3000/Shortcut-/. The site is served under the `/Shortcut-` base path everywhere, including in development, so links behave the same as on GitHub Pages.

## Building

```bash
npm run build
```

This writes a static site to `out/` (`output: "export"` in `next.config.ts`). `npm run lint` and `npx tsc --noEmit` check the code without building. `npm start` does not work with a static export; to look at a production build, deploy it or use `npm run dev`.

On Windows, Next.js 16.4 writes the export's prefetch files (`__next.*.txt`) into nested folders instead of flat files, so a Windows build served locally shows 404s for link prefetches. Pages and navigation still work. The GitHub Actions build runs on Linux and writes them correctly.

## Deployment

The site is a static export hosted on GitHub Pages at https://meeyaow2.github.io/Shortcut-/.

`.github/workflows/deploy-pages.yml` runs on every push to `main`, and can be run by hand from the Actions tab (Deploy to GitHub Pages → Run workflow). It installs dependencies with `npm ci` from `package-lock.json`, runs `npm run build`, and publishes `out/` to Pages.

One-time setup in the repository on GitHub:

1. Settings → Pages → Build and deployment → Source: choose **GitHub Actions**.
2. Settings → Environments → `github-pages` (created by the first run): if a deployment branch rule is set, it must allow `main`.

What a static host changes:

- `basePath` is `/Shortcut-`. Use `next/link`, `useRouter` or `ButtonLink` for internal links so the base path is added; a hard-coded `href="/…"` on a plain `<a>`, or `window.location` set to `/…`, skips it and breaks on Pages.
- `trailingSlash: true` writes each route as `route/index.html`, so direct links and refreshes work with or without the slash.
- Dynamic routes must list every page in `generateStaticParams`. A path that is not listed is not built, and Pages shows the 404 page for it.
- `cacheComponents` and `partialPrefetching` are off. They turn on Partial Prerendering, which needs a server, and `next build` refuses it with a static export.
- Search, filters and the viewport selection read the query string in the browser, and reader preferences stay in `localStorage` (`shortcut.library.v1`), so they all work without a server. `localStorage` is shared by every project under `meeyaow2.github.io`, which is why the key is namespaced.
- Server features (API routes, Server Actions, `cookies()`, `headers()`, rewrites, redirects, middleware/proxy, ISR, default `next/image` optimisation) are not available.

## Environment variables

None.

## Development workflow

```bash
git pull
# make changes
git add -A
git commit -m "Describe the change"
git push
```

On a new computer, run `git clone https://github.com/meeyaow2/Shortcut-.git`, then `npm install` inside the folder.

## Where things live

| Folder | What it holds |
|---|---|
| `src/data` | All content: sources, citations, updates, cheat sheets, resources, Ask UX answers |
| `src/types` | The content shapes a backend or feed would need to return |
| `src/lib` | Search, freshness rules, dates, the preferences store, the Ask UX provider interface |
| `src/hooks` | `useLibrary` (reader preferences), `useToday` |
| `src/components` | `ui` primitives, then one folder per feature |
| `src/app` | Routes |

Design tokens (colour, type, radii, widths) are in `src/app/globals.css`.

## Content and verification

Every claim carries a `Citation` with a `dateVerified`. `VERIFIED` in `src/data/citations.ts` is the day the content was last checked against the live pages; bump it only after re-checking. A citation with `dateVerified: null` renders as "Not yet verified".

In updates, `summary` restates the source. `whyItMatters` and `designerAction` are editorial.

## Regional context and authority

- `Context` (`global` or `sg`) is set on each source. The header switch filters Updates, Cheat Sheets and Search, and sets the Ask UX default. To add a region, add a value to `Context`, add its sources, and list it in `contexts` in `src/lib/authority.ts`.
- `src/data/guidance.ts` holds single-source `Guidance` records (the Singapore controls and SGDS entries). Official wording and Shortcut's reading are separate fields and are labelled apart in the UI.
- Every source has a `sourceType` and `requirementLevel`. `src/lib/authority.ts` turns them into the weight label shown beside each citation, so advice from a standard, a government control, a design system and a research article is never presented as equal.
- `src/data/explorer.ts` holds the Design System Explorer. A system has a cell only for topics where Shortcut has read its own page; a missing cell shows as "Not yet read". Up to four systems show at once (`MAX_COMPARED`). `themes` and `differences` are editorial and may only repeat what a cell says.

## Editorial guidance

- `src/data/craft.ts` holds conventions and craft guidance written by Shortcut. Each entry is labelled "Industry convention" or "Craft guidance" and shows "Shortcut editorial, reviewed [date]", never "Verified". What official sources say on the same subject sits in a separate `official` list with citations. Do not move text between the two.
- `src/data/checks.ts` holds the Design Checks, the Before You Send It checklist and the AI-look signals.
- Safe Starting Points is generated from craft entries that have a `starter` field, so it cannot disagree with the cheat sheets.

## Viewports

- The Viewport control on the cheat sheets changes emphasis and order. It never hides a rule: guidance with no viewport fields is general and always shown.
- An entry's `viewportValues` are Shortcut's starting points by available width. A missing laptop or large value falls back to desktop; a missing fold state falls back to mobile (closed) or tablet (open), and the UI says so. Never attribute these to a design system; what a system says goes in `official`.
- `viewportApplicability` and `input` are separate fields, so input method can become its own control later.
- `src/data/viewports.ts` holds the reference ranges, the folding devices, the foldable guide, the component comparisons and the test matrix. Device facts restate the maker's specifications page. Physical pixels are never presented as a CSS width.
- Viewport context is used where it changes the guidance, not everywhere. A visible control: individual cheat sheets and Safe Starting Points. Content only: the Design System Library (`responsiveGuidance` in `systems.ts`, official notes only), Compare Design Systems (the "Viewport and platform" topics), the Figma Guide and Singapore UX. Tags only: Resources (`tags`) and Updates (`relevantTo`). There is no control in the site header.
- The selection is saved in the browser and written to the address (`?viewport=mobile`, `?viewport=foldable&device=iphone-duo&state=open`). The address wins when both exist.

## Spacing

- Spacing comes from Tailwind's 4 px scale. Use 4, 8, 12, 16, 20, 24 and 32 inside a section; do not add arbitrary pixel values.
- Gaps between major sections use one responsive value, `--section-gap` in `globals.css` (40, 48, then 56 px), through `.section-gap`, `.section-space` or `.stack-sections`. Do not give a section its own top padding.
- Cards are `p-4 sm:p-5`; large content cards `p-4 sm:p-6`; compact tiles `p-3`.
- Controls are 44 px tall below tablet width and their compact height above it: write `min-h-11 md:min-h-9`, not a bare `min-h-9`.
- The navigation collapses at `--breakpoint-nav` (64rem).

## Scan first

- A page should give its answer in thirty seconds and its reasoning on request. Value, summary and takeaway are visible; common mistakes, official notes, examples and rationale sit behind an expandable row (the `Why` component).
- Nothing is removed to achieve this. A closed row still names its sources, so where guidance comes from is visible without opening it.
- `src/components/ui/Scan.tsx` holds `KeyTakeaway` and `InThirty`. Both carry Shortcut's summary and must never hold a source's wording. A cheat sheet gets its summary from `inThirty`.
- Cards are for standalone concepts, comparisons, values and warnings. Introductions and narrative stay as plain text.

## Visuals and motion

- `src/components/visual` holds the illustration language: thin ink lines, flat fills, and the highlighter yellow for the thing being measured. Everything is HTML, CSS and inline SVG; there is no animation library and no image files.
- `Specimens.tsx` draws values at their real size. `ViewportPreviews.tsx` draws schematic wireframes that follow the selected viewport. `BeforeAfter.tsx` holds paired wireframes keyed by check or signal id. `EntryVisual.tsx` maps a cheat sheet entry to its drawing; entries about judgement have none.
- Motion uses three durations and one curve, defined in `globals.css`: fast (hover, press), normal (panels, content arriving), slow (layout demonstrations). Do not add other timings. Reduced-motion preferences switch all of it off.
- A drawing must explain something. Do not add one for decoration, and do not redraw another design system's components or logo.

## AI + Design

- `src/data/ai.ts` holds AI updates, workflows, tools, comparisons and lessons. `src/data/prompts.ts` holds the prompt library and the Prompt Builder's assembly function.
- Tool descriptions and AI updates restate each vendor's own pages. `unverifiedTools` lists tools left out because their pages could not be read; do not describe a tool from memory.
- AI records older than `AI_REVIEW_AFTER_DAYS` (30) without a re-check show as "Needs review".
- Workflows, prompts, comparisons and lessons are Shortcut editorial.

## Figma Guide

- `src/data/figma.ts` holds the tools, the decision helper, comparisons, recipes, the design-system steps, the handover checklist and three Figma cheat sheets.
- `what` and `keyFeatures` restate Figma's own pages. Everything else is Shortcut editorial. To add a product, add one record to `figmaTools`; its page, search entry and decision-helper options follow from the data.

## UX Practice

- `src/data/practice.ts` holds the guides, templates, mentor notes and the Open Design Library.
- Guides are Shortcut editorial with cited references. Licences in the library are what each project's GitHub repository reported; `null` means not checked and is shown as such. Do not infer a licence.

## Design System Library and Generative UI

- `src/data/systems.ts` holds system profiles, product design references, case studies, the GPT-6 update and the Generative UI concepts.
- A company is only typed "Public design system" when its own site publishes one. Otherwise it is a "Product design reference".
- `src/data/references.ts` holds the product design references (Grab, Granola). In a UX breakdown, `problem`, `change` and `stated` restate the company's article; `principle` and `context` are Shortcut's reading and are labelled apart. Articles three or more years old are tagged "may be outdated".
- `status` is "profiled" (full page), "listed" (compared in the Explorer) or "planned" (named, not yet read). Say nothing about a planned system beyond its name and link.

## Replacing the sample layer

- Updates: replace the array in `src/data/updates.ts` with a fetch that returns `Update[]`.
- Ask UX: implement `AskProvider` (`src/lib/ask/provider.ts`) and swap the one line in `AskView.tsx`. A provider must return `null` when it has no sourced answer.
