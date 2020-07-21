import React from "react";
import ClickOutside from "react-click-outside";
import { ChromePicker } from "react-color";
import _ from "lodash";
import Clipboard from "clipboard";

const $body = document.querySelector("body");
let scrollPosition = 0;

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
    priority: new Array(this.props.colors.length)
      .fill("")
      .map((e, eIdx) => eIdx),
  };

  componentDidMount() {
    const self = this;
    this.clips = [];

    if (this.props.action === "copy") {
      var colorElms = [
        ...document.querySelectorAll(".-colorbar-copy [data-color]"),
      ];

      _.forEach(colorElms, (el, idx) => {
        var color = "#" + el.dataset.color.toUpperCase();
        const index = idx;

        this.clips[idx] = new Clipboard(el, {
          text: function (trigger) {
            return self.props.colors[index];
          },
        });
      });
    }

    if (this.props.copyArray && this.props.colors) {
      const copyAllEl = document.querySelector(".-js-copy-all");

      this.clips[self.props.colors.length] = new Clipboard(copyAllEl, {
        text: function (trigger) {
          return self.props.colors
            .map((col) => "#" + col.toUpperCase())
            .join(", ");
        },
      });
    }
  }

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
    }
  }

  onEditColor(colorIndex, evt) {
    var elRect = evt.currentTarget.getBoundingClientRect();

    const leftPosition = Math.min(
      Math.floor(elRect.left),
      window.innerWidth - 350
    );

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
    var { colors, onChange, copyArray } = this.props;
    var { currentlyEditing, popupPosition } = this.state;

    var colorRender = _.map(colors, (color, index) => {
      return (
        <div
          className={`colorbar-element`}
          data-color={colors[index]}
          key={index}
          // onMouseOver={
          // (evt) => {
          //   this.setState((state) => {
          //     const newPriority = new Array(colors.length)
          //       .fill(0)
          //       .map((el, elIdx) => {
          //         return state.priority[elIdx] || elIdx;
          //       });

          //     const maxPriority = newPriority.reduce((res, current) => {
          //       return Math.max(res, current);
          //     }, 0);

          //     newPriority[index] = maxPriority + 1;

          //     return {
          //       ...state,
          //       priority: newPriority,
          //     };
          //   });
          // }
          // }
          onClick={this.onColorClick.bind(this, index)}
          style={{
            backgroundColor: "#" + color,
            zIndex:
              currentlyEditing === index
                ? 100000 - 1
                : 1000 - (this.state.priority[index] || index),
            borderRadius: currentlyEditing === index ? 3 : "50%",
          }}>
          #{color}
        </div>
      );
    });

    return (
      <div
        className={`colorbar-container  ${copyArray ? "-colorbar-copy" : ""}`}>
        <div className="colorbar">{colorRender}</div>

        <br />

        {copyArray && (
          <button href="#" className="-js-copy-all">
            Copy Results
          </button>
        )}

        {!!onChange && currentlyEditing !== -1 && (
          <ClickOutside
            style={popupPosition}
            onClickOutside={this.handleClose.bind(this)}>
            <ChromePicker
              width={300}
              disableAlpha={true}
              type="chrome"
              onChange={onChange.bind(this, currentlyEditing)}
              color={colors[currentlyEditing]}
            />
          </ClickOutside>
        )}
      </div>
    );
  }
}

export default ColorBar;
