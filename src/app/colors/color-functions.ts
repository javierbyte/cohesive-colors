import { TinyColor } from "@ctrl/tinycolor";
import type { ColorInput } from "@ctrl/tinycolor";
import { multiply } from "color-blend";

import type { ColorSet } from "../types";

function colorToRgbArray(color: any) {
  const rgbColor = new TinyColor(color).toRgb();
  return rgbColor;
}

function colorToHex(color: ColorInput): string {
  return new TinyColor(color).toHex();
}

export function FixMyColors(
  colorScheme: ColorSet,
  overlayColor: ColorInput,
  overlayIntensity: number
): ColorSet {
  return colorScheme.map((color) => {
    const newColor = multiply(colorToRgbArray(color), {
      ...colorToRgbArray(overlayColor),
      a: overlayIntensity,
    });
    return colorToHex(newColor);
  });
}
