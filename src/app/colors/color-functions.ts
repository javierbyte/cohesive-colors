import { TinyColor } from "@ctrl/tinycolor";
import type { ColorInput } from "@ctrl/tinycolor";
import { multiply } from "color-blend";

import type { ColorSet, LockSet } from "../types";

function colorToRgbArray(color: ColorInput) {
  const rgbColor = new TinyColor(color).toRgb();
  return rgbColor;
}

function colorToHex(color: ColorInput): string {
  return new TinyColor(color).toHex();
}

export function FixMyColors(
  colorScheme: ColorSet,
  overlayColor: ColorInput,
  overlayIntensity: number,
  locked: LockSet = []
): ColorSet {
  return colorScheme.map((color, index) => {
    if (locked[index]) return colorToHex(color);

    const newColor = multiply(colorToRgbArray(color), {
      ...colorToRgbArray(overlayColor),
      a: overlayIntensity,
    });
    return colorToHex(newColor);
  });
}
