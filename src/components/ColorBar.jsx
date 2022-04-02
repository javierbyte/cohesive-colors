/* eslint-disable */

import { useState, useEffect } from 'react';
import { ChromePicker } from 'react-color';

import Styled from 'styled-components';

const $body = document.querySelector('body');
let scrollPosition = 0;

const ColorbarContainer = Styled.div`
  padding: 0 16px 16px 0;
`;

const Colorbar = Styled.div``;

const ColorbarElement = Styled.div`
  appearance: none;
  border: none;
  text-align: center;
  display: inline-block;
  text-transform: uppercase;
  user-select: none;
  font-variant-numeric: tabular-nums;
  cursor: pointer;
  font-weight: 500 !important;
  color: #0007;
  line-height:1;
  font-size: 16px;
  width:80px;
  height:80px;
  border-radius:80px;
  margin-right: -12px;
  margin-bottom: -12px;

  box-shadow: rgba(0, 0, 0, 0.05) 0 1px 0, rgba(0, 0, 0, 0.02) 0 3px 16px;

  transition: transform 0.1s, background-color 0.1s, border-radius 0.3s;
  transform: scale(1);

  outline: none;
`;

const bodyLock = {
  enable() {
    scrollPosition = window.pageYOffset;
    $body.style.overflow = 'hidden';
    $body.style.position = 'fixed';
    $body.style.top = `-${scrollPosition}px`;
    $body.style.width = '100%';
  },
  disable() {
    $body.style.removeProperty('overflow');
    $body.style.removeProperty('position');
    $body.style.removeProperty('top');
    $body.style.removeProperty('width');
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
