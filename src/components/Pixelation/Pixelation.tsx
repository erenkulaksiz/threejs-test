import React, { forwardRef, useMemo } from "react";
import { PixelationEffect } from "postprocessing";

// @ts-ignore
export const Pixelation = forwardRef(({ granularity = 4 }, ref) => {
  const effect = useMemo(
    () => new PixelationEffect(granularity),
    [granularity]
  );
  return <primitive ref={ref} object={effect} dispose={null} />;
});

Pixelation.displayName = "Pixelation";
