# Shortcut

Everything UI/UX, without the rabbit hole. A UI/UX knowledge platform prototype: updates, cheat sheets, design checks, sourced answers and resources.

Next.js (App Router), TypeScript, Tailwind CSS v4, Lucide. No backend. A few reader preferences (context, checklist ticks) live in `localStorage`.

```bash
npm install
npm run dev
```

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
