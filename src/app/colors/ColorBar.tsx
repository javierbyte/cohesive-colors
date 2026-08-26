import { useState, useEffect } from "react";
import { ChromePicker } from "@hello-pangea/color-picker";
import { TinyColor } from "@ctrl/tinycolor";

import { Component } from "jbx";
import type { ColorSet, LockSet } from "../types";

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

function LockIcon(props: { size?: number }) {
  const { size = 20 } = props;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="4" y="10" width="16" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

function ColorBar(props: {
  colors: ColorSet;
  onChange?: (newColors: ColorSet) => void;
  action?: "EDIT" | "COPY";
  locked?: LockSet;
  onLockToggle?: (index: number) => void;
}) {
  const { colors, onChange, action, locked = [], onLockToggle } = props;

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
        !evt.target.closest('[class*="chrome-picker"], .jbx-colorbar--popup')
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
        window.innerWidth - 350,
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

  const editingIsLocked =
    currentlyEditing !== null && !!locked[currentlyEditing];

  return (
    <ColorbarContainer>
      <Colorbar>
        {colors.map((color, index) => {
          const isLocked = !!locked[index];
          const label =
            action === "COPY" ? `Copy #${color}` : `Edit color #${color}`;

          return (
            <button
              type="button"
              key={index}
              className="jbx-colorbar--element"
              aria-label={isLocked ? `${label} (locked)` : label}
              onClick={(evt) => onColorClick(evt, index)}
              style={{
                backgroundColor: `#${color}`,
                color: new TinyColor(color).isDark()
                  ? "#ffffffb3"
                  : "#0000004d",
                zIndex:
                  currentlyEditing === index ? 100000 : colors.length - index,
                borderRadius: currentlyEditing === index ? 0 : "50%",
              }}
            >
              {isLocked && <LockIcon size={14} />}
            </button>
          );
        })}
      </Colorbar>

      {!!onChange && currentlyEditing !== null && (
        <div
          className="jbx-colorbar--popup"
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

          {!!onLockToggle && (
            <button
              type="button"
              className="jbx-colorbar--lock"
              role="switch"
              aria-checked={editingIsLocked}
              onClick={() => onLockToggle(currentlyEditing)}
            >
              <LockIcon size={16} />
              <span className="jbx-colorbar--lock-label">
                {editingIsLocked ? "Locked" : "Lock color"}
              </span>
              <span className="jbx-colorbar--lock-switch" aria-hidden="true" />
            </button>
          )}
        </div>
      )}
    </ColorbarContainer>
  );
}

export default ColorBar;
