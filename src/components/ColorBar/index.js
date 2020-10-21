import React from "react";
import ClickOutside from "react-click-outside";
import { ChromePicker } from "react-color";

import Styled from "styled-components";

const $body = document.querySelector("body");
let scrollPosition = 0;

const ColorbarContainer = Styled.div`
  padding: 0 16px 16px 0;
`;

const Colorbar = Styled.div``;

const ColorbarElement = Styled.button`
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
`;

const bodyLock = {
  enable() {
    scrollPosition = window.pageYOffset;
    $body.style.overflow = "hidden";
    $body.style.position = "fixed";
    $body.style.top = `-${scrollPosition}px`;
    $body.style.width = "100%";
  },
  disable() {
    $body.style.removeProperty("overflow");
    $body.style.removeProperty("position");
    $body.style.removeProperty("top");
    $body.style.removeProperty("width");
    window.scrollTo(0, scrollPosition);
  },
};

class ColorBar extends React.Component {
  state = {
    currentlyEditing: -1,
    popupPosition: {
      zIndex: 100000,
      position: "fixed",
      top: "0px",
      left: "0px",
    },
    priority: new Array(this.props.colors.length).fill("").map((e, eIdx) => eIdx),
  };

  componentWillUnmount() {
    for (const clipId in this.clips) {
      const clip = this.clips[clipId];
      clip.destroy();
      delete this.clips[clipId];
    }

    this.clips = null;
  }

  onColorClick(colorIndex, evt) {
    const { action } = this.props;

    if (action === "edit") {
      this.onEditColor(colorIndex, evt);
    } else {
      navigator &&
        navigator.clipboard &&
        navigator.clipboard.writeText &&
        navigator.clipboard.writeText("#" + this.props.colors[colorIndex]);
    }
  }

  onEditColor(colorIndex, evt) {
    var elRect = evt.currentTarget.getBoundingClientRect();

    const leftPosition = Math.min(Math.floor(elRect.left), window.innerWidth - 350);

    bodyLock.enable();

    this.setState({
      currentlyEditing: colorIndex,
      popupPosition: {
        zIndex: 100000,
        position: "fixed",
        top: "" + Math.floor(elRect.top + elRect.height) + "px",
        left: "" + leftPosition + "px",
      },
    });
  }

  handleClose() {
    bodyLock.disable();
    this.setState({
      currentlyEditing: -1,
    });
  }

  render() {
    var { colors, onChange } = this.props;
    var { currentlyEditing, popupPosition } = this.state;

    var colorRender = colors.map((color, index) => {
      return (
        <ColorbarElement
          key={index}
          onClick={this.onColorClick.bind(this, index)}
          style={{
            backgroundColor: "#" + color,
            zIndex: currentlyEditing === index ? 100000 - 1 : 1000 - (this.state.priority[index] || index),
            borderRadius: currentlyEditing === index ? 3 : "50%",
          }}>
          <div>{`${color.slice(0, 2)}`}</div>
          <div>{`${color.slice(2, 4)}`}</div>
          <div>{`${color.slice(4, 6)}`}</div>
        </ColorbarElement>
      );
    });

    return (
      <ColorbarContainer>
        <Colorbar>{colorRender}</Colorbar>

        {!!onChange && currentlyEditing !== -1 && (
          <ClickOutside style={popupPosition} onClickOutside={this.handleClose.bind(this)}>
            <ChromePicker
              width={320}
              disableAlpha={true}
              type="chrome"
              onChange={onChange.bind(this, currentlyEditing)}
              color={colors[currentlyEditing]}
            />
          </ClickOutside>
        )}
      </ColorbarContainer>
    );
  }
}

export default ColorBar;
