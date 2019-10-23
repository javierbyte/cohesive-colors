import React from "react";
import ClickOutside from "react-click-outside";

const _ = require("lodash");
const ColorPickerPackage = require("react-color");
const Clipboard = require("clipboard");

const ColorPicker = ColorPickerPackage.default;

class ColorBar extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    currentlyEditing: -1,
    popupPosition: {
      zIndex: 10,
      position: "fixed",
      top: "0px",
      left: "0px"
    }
  };

  componentDidMount() {
    this.clips = [];

    if (this.props.action === "copy") {
      var colorElms = [...document.querySelectorAll("[data-color]")];

      _.forEach(colorElms, (el, idx) => {
        var color = "#" + el.dataset.color.toUpperCase();

        this.clips[idx] = new Clipboard(el, {
          text: function(trigger) {
            return color;
          }
        });

        this.clips[idx].on("success", () => {
          console.warn("success", color);
        });
      });
    }

    if (this.props.copyArray && this.props.colors) {
      const propsColors = this.props.colors;

      const copyAllEl = document.querySelector(".-js-copy-all");

      this.clips[propsColors.length] = new Clipboard(copyAllEl, {
        text: function(trigger) {
          return propsColors.map(col => "#" + col.toUpperCase()).join(", ");
        }
      });
    }
  }

  componentWillUnmount() {
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

    const leftPosition = Math.min(Math.floor(elRect.left), window.innerWidth - 250);

    this.setState({
      currentlyEditing: colorIndex,
      popupPosition: {
        zIndex: 10,
        position: "fixed",
        top: "" + Math.floor(elRect.top + elRect.height) + "px",
        left: "" + leftPosition + "px"
      }
    });
  }

  handleClose() {
    this.setState({
      currentlyEditing: -1
    });
  }

  render() {
    var { colors, onChange, copyArray } = this.props;
    var { currentlyEditing, popupPosition } = this.state;

    var colorRender = _.map(colors, (color, index) => {
      return (
        <div
          className="colorbar-element"
          data-color={colors[index]}
          key={index}
          onClick={this.onColorClick.bind(this, index)}
          style={{
            backgroundColor: "#" + color
          }}>
          #{color}
        </div>
      );
    });

    return (
      <div className="colorbar-container">
        <div className="colorbar">{colorRender}</div>

        {copyArray && (
          <button className="link" href="#" className="-js-copy-all">
            Copy all the colors
          </button>
        )}

        {!!onChange && currentlyEditing !== -1 && (
          <ClickOutside style={popupPosition} onClickOutside={this.handleClose.bind(this)}>
            <ColorPicker
              style={popupPosition}
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
