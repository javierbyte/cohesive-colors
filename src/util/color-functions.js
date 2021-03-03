import { TinyColor } from "@ctrl/tinycolor";
import colorblend from "colorblendjs";

function colorToRgbArray(color) {
  const rgbColor = new TinyColor(color).toRgb();
  return [rgbColor.r, rgbColor.g, rgbColor.b];
}

function rgbArrayToHex(color) {
  return new TinyColor({
    r: color[0],
    g: color[1],
    b: color[2],
  }).toHex();
}

export function FixMyColors(colorScheme, overlayColor, overlayIntensity) {
  return colorScheme.map((color) => {
    const newColor = colorblend.overlay(colorToRgbArray(color), colorToRgbArray(overlayColor), overlayIntensity);
    return rgbArrayToHex(newColor);
  });
}
