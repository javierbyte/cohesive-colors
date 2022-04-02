/* eslint-disable */

import { useState, useEffect } from 'react';
import { ChromePicker } from 'react-color';

import { Component } from 'jbx';

const bodyEl = document.querySelector('body');
let scrollPosition = 0;

const ColorbarContainer = Component(`jbx-colorbar-container`);
const Colorbar = Component(`jbx-colorbar`);
const ColorbarElement = Component(`jbx-colorbar--element`);

const bodyLock = {
  enable() {
    scrollPosition = window.pageYOffset;
    bodyEl.style.overflow = 'hidden';
    bodyEl.style.position = 'fixed';
    bodyEl.style.top = `-${scrollPosition}px`;
    bodyEl.style.width = '100%';
  },
  disable() {
    bodyEl.style.removeProperty('overflow');
    bodyEl.style.removeProperty('position');
    bodyEl.style.removeProperty('top');
    bodyEl.style.removeProperty('width');
    window.scrollTo(0, scrollPosition);
  },
};

function ColorBar(props) {
  const { colors, onChange, action } = props;

  const [currentlyEditing, currentlyEditingSet] = useState(null);

  const [popupPosition, popupPositionSet] = useState({
    top: 0,
    left: 0,
  });

  useEffect(() => {
    window.addEventListener('click', (evt) => {
      if (action !== 'EDIT') return;
      try {
        if (
          evt.path &&
          [...evt.path].find((el) => {
            if (!el.classList) return false;
            return [...el.classList].find((className) =>
              className.includes('chrome-picker')
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

  function onColorClick(evt, index) {
    evt.stopPropagation();

    if (action === 'EDIT') {
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
    if (action === 'COPY') {
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
              onClick={(evt) => onColorClick(evt, index)}
              style={{
                backgroundColor: `#${color}`,
                zIndex:
                  currentlyEditing === index ? 100000 : colors.length - index,
                borderRadius: currentlyEditing === index ? 0 : '50%',
              }}
            ></ColorbarElement>
          );
        })}
      </Colorbar>

      {!!onChange && currentlyEditing !== null && (
        <div
          style={{
            transition: 'top 0.1s, left 0.1s',
            position: 'fixed',
            zIndex: 9999,
            ...popupPosition,
          }}
        >
          <ChromePicker
            width={320}
            disableAlpha={true}
            type="chrome"
            onChange={(result, evt) => {
              const newColors = [...colors];
              newColors[currentlyEditing] = result.hex.replace('#', '');
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
