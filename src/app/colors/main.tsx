"use client";

import { useSearchParams } from "next/navigation";
import { Fragment, useState } from "react";

import ColorBar from "./ColorBar";

import { FixMyColors } from "./color-functions";

import {
  Box,
  Button,
  HeaderH3,
  Inline,
  Input,
  Range,
  Space,
  Text,
  Bullet,
} from "jbx";
import { srcColors } from "../../colors";
import type { ColorSet, LockSet } from "../types";

const URL = "https://javier.xyz/cohesive-colors";
const DEFAULT_OVERLAY = "FF9C00";
const DEFAULT_INTENSITY = 0.3;
const HEX_COLOR = /^[0-9a-f]{6}$/i;

function readColors(value: string | null) {
  const colors = value?.split(",").filter((color) => HEX_COLOR.test(color));
  return colors?.length ? colors.slice(0, 20) : srcColors[0];
}

function readIntensity(value: string | null) {
  const intensity = Number(value);
  return value !== null && Number.isFinite(intensity)
    ? Math.min(1, Math.max(0, intensity))
    : DEFAULT_INTENSITY;
}

// Kept the same length as the color scheme, so every color has a lock state
// and `locked[index]` is never out of sync with `colorScheme[index]`.
function readLocked(value: string | null, colorScheme: ColorSet): LockSet {
  const flags = value?.split(",") ?? [];
  return colorScheme.map((_color, index) => flags[index] === "1");
}

function noLocks(colorScheme: ColorSet): LockSet {
  return colorScheme.map(() => false);
}

export function CohesiveColors() {
  const search = useSearchParams();
  const [colorSources] = useState(srcColors);
  const [colorScheme, colorSchemeSet] = useState(() =>
    readColors(search.get("src"))
  );
  const [locked, lockedSet] = useState(() =>
    readLocked(search.get("locked"), colorScheme)
  );
  const [overlayColor, overlayColorSet] = useState(() => {
    const value = search.get("overlay");
    return value && HEX_COLOR.test(value) ? value : DEFAULT_OVERLAY;
  });
  const [overlayIntensity, overlayIntensitySet] = useState(() =>
    readIntensity(search.get("intensity"))
  );

  const someLocked = locked.some(Boolean);

  const shareUrl = `${URL}?src=${colorScheme.join(
    ","
  )}&overlay=${overlayColor}&intensity=${overlayIntensity}${
    someLocked ? `&locked=${locked.map((isLocked) => (isLocked ? 1 : 0))}` : ``
  }`;

  const fixedColors = FixMyColors(
    colorScheme,
    overlayColor,
    overlayIntensity,
    locked
  );

  function randomColorSchemeSet() {
    const randomColorScheme =
      colorSources[Math.floor(Math.random() * colorSources.length)];
    colorSchemeSet(randomColorScheme);
    lockedSet(noLocks(randomColorScheme));
  }

  return (
    <Fragment>
      <HeaderH3>
        <Bullet value={1} />
        Choose starting colors
      </HeaderH3>
      <Text>
        Anything you want! Click any color to edit it, or to lock it so the
        overlay leaves it untouched.
      </Text>
      <Space h={1} />
      <ColorBar
        colors={colorScheme}
        onChange={colorSchemeSet}
        action="EDIT"
        locked={locked}
        onLockToggle={(index) =>
          lockedSet(
            locked.map((isLocked, i) => (i === index ? !isLocked : isLocked))
          )
        }
      />
      <Space h={1} />
      <Inline>
        <Button onClick={randomColorSchemeSet}>Random</Button>
        <Space w={1} />
        <Button
          style={{ width: 42 }}
          disabled={colorScheme.length < 2}
          onClick={() => {
            colorSchemeSet(colorScheme.slice(0, -1));
            lockedSet(locked.slice(0, -1));
          }}
        >
          -
        </Button>
        <Space w={0.5} />

        <Button
          style={{ width: 42 }}
          onClick={() => {
            const randomColorScheme =
              colorSources[Math.floor(Math.random() * colorSources.length)];
            const randomColor =
              randomColorScheme[
                Math.floor(Math.random() * randomColorScheme.length)
              ];
            colorSchemeSet([...colorScheme, randomColor]);
            lockedSet([...locked, false]);
          }}
        >
          +
        </Button>
      </Inline>
      <Space h={2} />
      <HeaderH3>
        <Bullet value={2} />
        Add overlay
      </HeaderH3>
      <Text>This color will pull all the other together.</Text>
      <Space h={1} />
      <Inline>
        <ColorBar
          colors={[overlayColor]}
          onChange={(newArr) => overlayColorSet(newArr[0])}
          action="EDIT"
        />

        <Space w={1} />

        <Box style={{ width: 220 }}>
          <Text>
            Intensity{" "}
            <span style={{ color: "#666" }}>
              {Math.round(overlayIntensity * 100)}%
            </span>
          </Text>
          <Space h={1} />
          <Range
            aria-label="Scale"
            value={overlayIntensity}
            onChange={(evt) =>
              overlayIntensitySet(evt.currentTarget.valueAsNumber)
            }
            min={0}
            max={1}
            step={0.01}
            style={{ maxWidth: 320 }}
          />
        </Box>
      </Inline>
      <Space h={2} />
      <Inline>
        <Box flex={1}>
          <HeaderH3>
            <Bullet value={3} />
            Result
          </HeaderH3>
          <Text>
            All the original colors with a small hint of the overlay
            {someLocked ? `, except the locked ones` : ``}. Click on any color to
            copy.
          </Text>
        </Box>
        <Button
          onClick={() => {
            const colorsStr = fixedColors
              .map((color) => `#${color}`)
              .join(", ");

            void window.navigator.clipboard?.writeText(colorsStr);
          }}
        >
          Copy All
        </Button>
      </Inline>
      <Space h={1} />
      <ColorBar colors={fixedColors} action="COPY" locked={locked} />
      <Space h={2} />
      <Text>Share your color palette.</Text>
      <Space h={0.5} />
      <Inline>
        <Input
          aria-label="Share URL"
          type="text"
          style={{ maxWidth: "70vw" }}
          value={shareUrl}
          readOnly
        />
        <Space w={1} />
        <Button
          onClick={() => {
            void navigator.clipboard?.writeText(shareUrl);
          }}
        >
          Copy URL
        </Button>
      </Inline>
    </Fragment>
  );
}
