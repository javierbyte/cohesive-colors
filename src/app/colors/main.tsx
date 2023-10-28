"use client";

import { useSearchParams } from "next/navigation";
import { Fragment, useState, useEffect } from "react";

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

const URL = "https://javier.xyz/cohesive-colors";

export function CohesiveColors() {
  const [colorSources] = useState(srcColors);
  const [colorScheme, colorSchemeSet] = useState(srcColors[0]);

  const search = useSearchParams();

  const [overlayColor, overlayColorSet] = useState("FF9C00");
  const [overlayIntensity, overlayIntensitySet] = useState(0.3);

  const shareUrl = `${URL}?src=${colorScheme.join(
    ","
  )}&overlay=${overlayColor}&intensity=${overlayIntensity}`;

  useEffect(() => {
    const colorSchemeQuery = search.get("src");
    if (colorSchemeQuery) colorSchemeSet(colorSchemeQuery.split(","));

    const overlayColorQuery = search.get("overlay");
    if (overlayColorQuery) overlayColorSet(overlayColorQuery);

    const overlayIntensityQuery = search.get("intensity");
    if (overlayIntensityQuery)
      overlayIntensitySet(Number(overlayIntensityQuery));
  }, []);

  return (
    <Fragment>
      <HeaderH3>
        <Bullet value={1} />
        Choose starting colors
      </HeaderH3>
      <Text>Anything you want! Click any clolor to edit it.</Text>
      <Space h={1} />
      <ColorBar colors={colorScheme} onChange={colorSchemeSet} action="EDIT" />
      <Space h={1} />
      <Inline>
        <Button
          onClick={() => {
            const randomColorScheme =
              colorSources[Math.floor(Math.random() * colorSources.length)];
            colorSchemeSet(randomColorScheme);
          }}
        >
          Random
        </Button>
        <Space w={1} />
        <Button
          style={{ width: 42 }}
          disabled={colorScheme.length < 2}
          onClick={() => {
            colorSchemeSet(colorScheme.slice(0, -1));
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
            // @ts-ignore
            onChange={(evt) => overlayIntensitySet(evt.target.value)}
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
            All the original colors with a small hint of the overlay. Click on
            any color to copy.
          </Text>
        </Box>
        {/* @ts-ignore */}
        <Button
          onClick={() => {
            const colorsStr = FixMyColors(
              colorScheme,
              overlayColor,
              overlayIntensity
            )
              .map((color) => `#${color}`)
              .join(", ");

            window.navigator &&
              window.navigator.clipboard &&
              window.navigator.clipboard.writeText &&
              window.navigator.clipboard.writeText(colorsStr);
          }}
        >
          Copy All
        </Button>
      </Inline>
      <Space h={1} />
      <ColorBar
        colors={FixMyColors(colorScheme, overlayColor, overlayIntensity)}
        action="COPY"
      />
      <Space h={2} />
      <Text>Share your color palette.</Text>
      <Space h={0.5} />
      <Inline>
        <Input
          aria-label="Share URL"
          type="text"
          style={{ maxWidth: "70vw" }}
          value={shareUrl}
          disabled={true}
        />
        <Space w={1} />
        <Button
          onClick={() => {
            navigator &&
              navigator.clipboard &&
              navigator.clipboard.writeText &&
              navigator.clipboard.writeText(shareUrl);
          }}
        >
          Copy URL
        </Button>
      </Inline>
    </Fragment>
  );
}
