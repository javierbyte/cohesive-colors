import { useState, useEffect } from "react";
import { ChromePicker } from "@hello-pangea/color-picker";

import { Component } from "jbx";
import type { ColorSet } from "../types";

let scrollPosition = 0;

const ColorbarContainer = Component(`jbx-colorbar-container`);
const Colorbar = Component(`jbx-colorbar`);
const ColorbarElement = Component<{
  onClick?: (evt: React.MouseEvent<HTMLElement>) => void;
}>(`jbx-colorbar--element`);

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

function getParents(elem: Node) {
  var parents = [];
  // @ts-ignore
  for (; elem && elem !== document; elem = elem.parentNode) {
    parents.push(elem);
  }
  return parents as HTMLElement[];
}

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
    window.addEventListener("click", (evt: Event) => {
      if (action !== "EDIT" || !evt.target) return;

      const element = evt.target as HTMLElement;

      const path = getParents(element);

      try {
        if (
          path.find((el) => {
            if (!el.classList) return false;
            return Array.from(el.classList).find((className) =>
              className.includes("chrome-picker")
            );
          })
        ) {
        } else {
          currentlyEditingSet(null);
        }
      } catch (e) {}
    });
  }, []);

  useEffect(() => {
    if (currentlyEditing === null) {
      bodyLock.disable();
    } else {
      bodyLock.enable();
    }
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
        left: leftPosition,
      });
    }
    if (action === "COPY") {
      navigator &&
        navigator.clipboard &&
        navigator.clipboard.writeText &&
        navigator.clipboard.writeText(`#${colors[index]}`);
    }
  }

  return (
    <ColorbarContainer>
      <Colorbar>
        {colors.map((color, index) => {
          return (
            <ColorbarElement
              key={index}
              onClick={(evt: React.MouseEvent<HTMLElement>) =>
                onColorClick(evt, index)
              }
              style={{
                backgroundColor: `#${color}`,
                zIndex:
                  currentlyEditing === index ? 100000 : colors.length - index,
                borderRadius: currentlyEditing === index ? 0 : "50%",
              }}
            ></ColorbarElement>
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
            onChange={(result, evt) => {
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
