import React from "react";

import Clipboard from "clipboard";
import ColorBar from "../../components/ColorBar";
import _ from "lodash";
import tinycolor from "tinycolor2";
import colorblend from "colorblendjs";
import randomcolor from "randomcolor";
import jsonp from "jsonp";

const kInitialColorSchemeSource = [
  ["555e7b", "b7d968", "b576ad", "e04644", "fde47f", "7ccce5"],
  ["69D2E7", "A7DBD8", "E0E4CC", "F38630", "FA6900"],
  ["FE4365", "FC9D9A", "F9CDAD", "C8C8A9", "83AF9B"],
  ["ECD078", "D95B43", "C02942", "542437", "53777A"],
  ["556270", "4ECDC4", "C7F464", "FF6B6B", "C44D58"],
  ["774F38", "E08E79", "F1D4AF", "ECE5CE", "C5E0DC"],
  ["E8DDCB", "CDB380", "036564", "033649", "031634"],
  ["490A3D", "BD1550", "E97F02", "F8CA00", "8A9B0F"],
  ["594F4F", "547980", "45ADA8", "9DE0AD", "E5FCC2"],
  ["00A0B0", "6A4A3C", "CC333F", "EB6841", "EDC951"],
  ["E94E77", "D68189", "C6A49A", "C6E5D9", "F4EAD5"],
  ["3FB8AF", "7FC7AF", "DAD8A7", "FF9E9D", "FF3D7F"],
  ["D9CEB2", "948C75", "D5DED9", "7A6A53", "99B2B7"],
  ["FFFFFF", "CBE86B", "F2E9E1", "1C140D", "CBE86B"],
  ["EFFFCD", "DCE9BE", "555152", "2E2633", "99173C"],
  ["343838", "005F6B", "008C9E", "00B4CC", "00DFFC"],
  ["413E4A", "73626E", "B38184", "F0B49E", "F7E4BE"],
  ["99B898", "FECEA8", "FF847C", "E84A5F", "2A363B"],
  ["FF4E50", "FC913A", "F9D423", "EDE574", "E1F5C4"],
  ["655643", "80BCA3", "F6F7BD", "E6AC27", "BF4D28"],
  ["00A8C6", "40C0CB", "F9F2E7", "AEE239", "8FBE00"],
  ["351330", "424254", "64908A", "E8CAA4", "CC2A41"],
  ["554236", "F77825", "D3CE3D", "F1EFA5", "60B99A"],
  ["FF9900", "424242", "E9E9E9", "BCBCBC", "3299BB"],
  ["5D4157", "838689", "A8CABA", "CAD7B2", "EBE3AA"],
  ["8C2318", "5E8C6A", "88A65E", "BFB35A", "F2C45A"],
  ["FAD089", "FF9C5B", "F5634A", "ED303C", "3B8183"],
  ["FF4242", "F4FAD2", "D4EE5E", "E1EDB9", "F0F2EB"],
  ["D1E751", "FFFFFF", "000000", "4DBCE9", "26ADE4"],
  ["F8B195", "F67280", "C06C84", "6C5B7B", "355C7D"],
  ["BCBDAC", "CFBE27", "F27435", "F02475", "3B2D38"],
  ["1B676B", "519548", "88C425", "BEF202", "EAFDE6"],
  ["5E412F", "FCEBB6", "78C0A8", "F07818", "F0A830"],
  ["EEE6AB", "C5BC8E", "696758", "45484B", "36393B"],
  ["452632", "91204D", "E4844A", "E8BF56", "E2F7CE"],
  ["F0D8A8", "3D1C00", "86B8B1", "F2D694", "FA2A00"],
  ["F04155", "FF823A", "F2F26F", "FFF7BD", "95CFB7"],
  ["2A044A", "0B2E59", "0D6759", "7AB317", "A0C55F"],
  ["BBBB88", "CCC68D", "EEDD99", "EEC290", "EEAA88"],
  ["B9D7D9", "668284", "2A2829", "493736", "7B3B3B"],
  ["67917A", "170409", "B8AF03", "CCBF82", "E33258"],
  ["B3CC57", "ECF081", "FFBE40", "EF746F", "AB3E5B"],
  ["A3A948", "EDB92E", "F85931", "CE1836", "009989"],
  ["E8D5B7", "0E2430", "FC3A51", "F5B349", "E8D5B9"],
  ["AB526B", "BCA297", "C5CEAE", "F0E2A4", "F4EBC3"],
  ["607848", "789048", "C0D860", "F0F0D8", "604848"],
  ["AAB3AB", "C4CBB7", "EBEFC9", "EEE0B7", "E8CAAF"],
  ["300030", "480048", "601848", "C04848", "F07241"],
  ["A8E6CE", "DCEDC2", "FFD3B5", "FFAAA6", "FF8C94"],
  ["3E4147", "FFFEDF", "DFBA69", "5A2E2E", "2A2C31"],
  ["515151", "FFFFFF", "00B4FF", "EEEEEE"],
];

function colorToRgbArray(color) {
  var rgbColor = tinycolor(color).toRgb();
  return [rgbColor.r, rgbColor.g, rgbColor.b];
}

var rgbArrayToHex = (color) => {
  return tinycolor({
    r: color[0],
    g: color[1],
    b: color[2],
  }).toHex();
};

var fixMyColors = (colorScheme, overlayColor, overlayIntensity) => {
  return _.map(colorScheme, (color) => {
    var newColor = colorblend.overlay(
      colorToRgbArray(color),
      colorToRgbArray(overlayColor),
      overlayIntensity
    );
    return rgbArrayToHex(newColor);
  });
};

var getPalleteFromColorLovers = (callback) => {
  jsonp(
    "https://www.colourlovers.com/api/palettes/top?format=json&jsonCallback=callback&numResults=50",
    {
      param: "jsonCallback",
    },
    callback
  );
};

class Home extends React.Component {
  state = {
    overlayColor: "FF9C00",
    overlayIntensity: 0.3,
    colorSchemeIndex: 0,
    colorSchemeSource: kInitialColorSchemeSource,
    colorScheme: kInitialColorSchemeSource[0],
  };

  componentDidMount() {
    const colorScheme = new URLSearchParams(document.location.search).get(
      "src"
    );
    const overlayColor = new URLSearchParams(document.location.search).get(
      "overlay"
    );
    const overlayIntensity = new URLSearchParams(document.location.search).get(
      "intensity"
    );

    new Clipboard(".js-copy-url-button", {
      text: function (trigger) {
        return document.querySelector(".js-copy-url-input").value;
      },
    });

    this.setState((state) => {
      return {
        colorScheme: colorScheme ? colorScheme.split(",") : state.colorScheme,
        overlayColor: overlayColor || state.overlayColor,
        overlayIntensity: overlayIntensity || state.overlayIntensity,
      };
    });
  }

  updateColorSource(nextIndex) {
    getPalleteFromColorLovers((err, res) => {
      if (err) return console.error(err);

      const newColorSchemeSource = [
        this.state.colorScheme,
        ..._.map(res, "colors"),
      ];

      this.setState({
        colorSchemeIndex: 1,
        colorSchemeSource: newColorSchemeSource,
        colorScheme: newColorSchemeSource[1],
      });
    });
  }

  handleChangeColor(index, color) {
    var newColorScheme = this.state.colorScheme.slice();
    newColorScheme[index] = color.hex.replace("#", "");

    this.setState({
      colorScheme: newColorScheme,
    });
  }

  handleOverlayChange(index, color) {
    var newColor = color.hex.replace("#", "");

    this.setState({
      overlayColor: newColor,
    });
  }

  handleOverlayIntensityChange(evt) {
    this.setState({
      overlayIntensity: parseFloat(evt.target.value),
    });
  }

  handleResizePallete(delta) {
    var colorScheme = this.state.colorScheme.slice();

    if (delta === 1) {
      colorScheme.push(randomcolor().replace("#", ""));
    } else {
      colorScheme.pop();
    }

    this.setState({
      colorScheme: colorScheme,
    });
  }

  randomize() {
    const newSchemeIndex =
      (this.state.colorSchemeIndex + 1) % this.state.colorSchemeSource.length;

    if (newSchemeIndex === 0) {
      this.updateColorSource(true);
      return;
    }

    this.setState({
      colorScheme: this.state.colorSchemeSource[newSchemeIndex],
      colorSchemeIndex: newSchemeIndex,
    });
  }

  render() {
    var { colorScheme, overlayColor, overlayIntensity } = this.state;

    return (
      <div className="content">
        <div className="content-block">
          <br />
          <h1>Cohesive Colors</h1>
          <div>Tool that may help you to create cohesive color schemes.</div>
          {false && (
            <div>
              1. Pick or create a color palette. 2. Pick an overlay color. 3.
              ??? 4. Profit!
            </div>
          )}
        </div>
        <br />
        <div className="content-block">
          <h3>Original colors.</h3> Click to edit the colors.
          <br />
          <div
            style={{ paddingTop: "0.5rem" }}
            className="content-block flex flex-align-center">
            <button onClick={this.randomize.bind(this)}>Random</button>{" "}
            <div className="flex-1" />
            <button
              onClick={this.handleResizePallete.bind(this, -1)}
              disabled={colorScheme.length < 2}>
              -
            </button>
            <button onClick={this.handleResizePallete.bind(this, 1)}>+</button>
          </div>
          <ColorBar
            colors={colorScheme}
            onChange={this.handleChangeColor.bind(this)}
            action="edit"
          />
        </div>
        <br />
        <div className="content-block">
          <h3>Overlay Color.</h3> This color will bring the original colors
          together.
          <div className="flex flex-align-center">
            <ColorBar
              colors={[overlayColor]}
              onChange={this.handleOverlayChange.bind(this)}
              action="edit"
            />
            <div className="padding-1" />
            <div className="margin-right-Hx">Intensity</div>
            <input
              className="input-slider"
              type="range"
              min="0"
              max="1"
              step=".01"
              onChange={this.handleOverlayIntensityChange.bind(this)}
              value={overlayIntensity}
            />
          </div>
        </div>
        <br />
        <div className="content-block -result">
          <h3>Result.</h3>
          {!!window.ClipboardEvent && (
            <span className="help-text"> Click on any color to copy.</span>
          )}
          <ColorBar
            copyArray={true}
            colors={fixMyColors(colorScheme, overlayColor, overlayIntensity)}
            action="copy"
          />
        </div>

        <br />

        <strong>Share this color pallete</strong>
        <div className="flex flex-align-center">
          <input
            type="text"
            className="js-copy-url-input flex-1"
            value={`${document.location.href}?src=${colorScheme.join(
              ","
            )}&overlay=${overlayColor}&intensity=${overlayIntensity}`}
            disabled={true}
          />
          <button className="js-copy-url-button">Copy URL</button>
        </div>

        <br />

        <div className="credits">
          <div className="credits-header">Other projects</div>
          <a href="https://javier.xyz/img2css">
            <b>img2css</b>
            <div>Convert images to pure css.</div>
          </a>
          <a href="https://javier.xyz/visual-center">
            <b>visual-center</b>
            <div>Find the visual center of your images.</div>
          </a>
          <a href="https://javier.xyz/morphin">
            <b>morphin</b>
            <div>CSS image morphing.</div>
          </a>
          <a href="https://javier.xyz/clashjs/">
            <b>clashjs</b>
            <div>JS AI Battle Game.</div>
          </a>
        </div>
        <div className="content-block text-block">
          <div className="content-block -credits -note">
            I'm working on an iOS app! Create and save Cohesive Color palletes,{" "}
            <a href="http://eepurl.com/cZwQn9" target="_blank">
              Sign Up
            </a>{" "}
            to be the first to know!
          </div>
          <br />
          <div className="content-block -credits">
            {"Based on "}
            <a
              target="_blank"
              href="https://dribbble.com/shots/166246-My-Secret-for-Color-Schemes">
              this idea
            </a>
            {". Made by "}
            <a href="http://javier.xyz/" target="_blank">
              javierbyte
            </a>
            .
          </div>
          <br />
        </div>
      </div>
    );
  }
}

export default Home;
