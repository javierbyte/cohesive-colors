import { useState, useEffect } from "react";
import { ChromePicker } from "@hello-pangea/color-picker";

import { Component } from "jbx";
import type { ColorSet } from "../types";

let scrollPosition = 0;

const ColorbarContainer = Component(`jbx-colorbar-container`);
const Colorbar = Component(`jbx-colorbar`);

const bodyLock = {
  enable() {
    const bodyEl = document.querySelector("body");
    if (!bodyEl) return;

    scrollPosition = window.pageYOffset;
    bodyEl.style.overflow = "hidden";
    bodyEl.style.position = "fixed";
    bodyEl.style.top = `-${scrollPosition}px`;
    bodyEl.style.width = "100%";
  },
  disable() {
    const bodyEl = document.querySelector("body");
    if (!bodyEl) return;

    bodyEl.style.removeProperty("overflow");
    bodyEl.style.removeProperty("position");
    bodyEl.style.removeProperty("top");
    bodyEl.style.removeProperty("width");
    window.scrollTo(0, scrollPosition);
  },
};

function ColorBar(props: {
  colors: ColorSet;
  onChange?: (newColors: ColorSet) => void;
  action?: "EDIT" | "COPY";
}) {
  const { colors, onChange, action } = props;

  const [currentlyEditing, currentlyEditingSet] = useState<number | null>(null);

  const [popupPosition, popupPositionSet] = useState({
    top: 0,
    left: 0,
  });

  useEffect(() => {
    if (action !== "EDIT") return;

    function closePicker(evt: MouseEvent) {
      if (
        evt.target instanceof Element &&
        !evt.target.closest('[class*="chrome-picker"]')
      ) {
        currentlyEditingSet(null);
      }
    }

    window.addEventListener("click", closePicker);
    return () => window.removeEventListener("click", closePicker);
  }, [action]);

  useEffect(() => {
    if (currentlyEditing === null) return;

    bodyLock.enable();
    return () => bodyLock.disable();
  }, [currentlyEditing]);

  function onColorClick(evt: React.MouseEvent<HTMLElement>, index: number) {
    evt.stopPropagation();

    if (action === "EDIT") {
      currentlyEditingSet(currentlyEditing === index ? null : index);

      const elRect = evt.currentTarget.getBoundingClientRect();

      const leftPosition = Math.min(
        Math.floor(elRect.left),
        window.innerWidth - 350
      );

      popupPositionSet({
        top: Math.floor(elRect.top + elRect.height),
        left: Math.max(0, leftPosition),
      });
    }
    if (action === "COPY") {
      void navigator.clipboard?.writeText(`#${colors[index]}`);
    }
  }

  return (
    <ColorbarContainer>
      <Colorbar>
        {colors.map((color, index) => {
          return (
            <button
              type="button"
              key={index}
              className="jbx-colorbar--element"
              aria-label={
                action === "COPY"
                  ? `Copy #${color}`
                  : `Edit color #${color}`
              }
              onClick={(evt) => onColorClick(evt, index)}
              style={{
                backgroundColor: `#${color}`,
                zIndex:
                  currentlyEditing === index ? 100000 : colors.length - index,
                borderRadius: currentlyEditing === index ? 0 : "50%",
              }}
            />
          );
        })}
      </Colorbar>

      {!!onChange && currentlyEditing !== null && (
        <div
          style={{
            transition: "top 0.1s, left 0.1s",
            position: "fixed",
            zIndex: 9999,
            ...popupPosition,
          }}
        >
          <ChromePicker
            width={320}
            disableAlpha={true}
            onChange={(result) => {
              const newColors = [...colors];
              newColors[currentlyEditing] = result.hex.replace("#", "");
              onChange(newColors);
            }}
            color={colors[currentlyEditing]}
          />
        </div>
      )}
    </ColorbarContainer>
  );
}

export default ColorBar;
