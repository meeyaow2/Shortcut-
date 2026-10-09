"use client";

import { useViewport } from "@/hooks/useViewport";
import type { CraftEntry } from "@/types";
import { ElevationSpecimen, LineHeightSpecimen, LineLengthSpecimen, NeutralSpecimen, RadiusSpecimen, SpacingSpecimen, Specimen, TypeScaleSpecimen } from "./Specimens";
import { ColumnsPreview, FoldSchematic, NavPreview, PaddingPreview } from "./ViewportPreviews";

/** The folding schematic in whichever state the reader has selected. */
function FoldEntry() {
  const { viewport, foldState } = useViewport();
  const state = viewport === "foldable" ? foldState : "open";
  return (
    <Specimen caption="Schematic, not to scale. Choose Foldable above, then Closed or Open, to see it change. The dashed line is the fold.">
      <FoldSchematic state={state} />
    </Specimen>
  );
}

/**
 * The drawing that goes with a cheat sheet entry, when one helps. Entries
 * whose point is a judgement, not a size or a layout, have none.
 */
export function EntryVisual({ entry }: { entry: CraftEntry }) {
  switch (entry.id) {
    case "spacing-scale":
      return <SpacingSpecimen />;
    case "border-radius":
      return <RadiusSpecimen />;
    case "elevation-levels":
      return <ElevationSpecimen />;
    case "pure-white-and-black":
      return <NeutralSpecimen />;
    case "body-text-size":
      return <TypeScaleSpecimen />;
    case "line-height":
      return <LineHeightSpecimen />;
    case "line-length":
      return <LineLengthSpecimen />;
    case "padding":
      return <PaddingPreview values={entry.viewportValues} />;
    case "columns":
      return <ColumnsPreview values={entry.viewportValues} />;
    case "navigation-by-viewport":
      return <NavPreview />;
    case "foldables":
      return <FoldEntry />;
    default:
      return null;
  }
}
