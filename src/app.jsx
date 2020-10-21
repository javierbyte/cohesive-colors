import React from "react";

import { TinyColor } from "@ctrl/tinycolor";
import colorblend from "colorblendjs";
import randomcolor from "randomcolor";

import "./index.css";

import ColorBar from "./components/ColorBar";

import { Button, Range, HeaderH1, HeaderH3, Text, Space, Box, A, Container, Input, Inline, Ul, Li } from "./jbx.jsx";

const aa = 3;

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
  const rgbColor = new TinyColor(color).toRgb();
  return [rgbColor.r, rgbColor.g, rgbColor.b];
}

const rgbArrayToHex = (color) => {
  return new TinyColor({
    r: color[0],
    g: color[1],
    b: color[2],
  }).toHex();
};

const fixMyColors = (colorScheme, overlayColor, overlayIntensity) => {
  return colorScheme.map((color) => {
    const newColor = colorblend.overlay(colorToRgbArray(color), colorToRgbArray(overlayColor), overlayIntensity);
    return rgbArrayToHex(newColor);
  });
};

// const getPalleteFromColorLovers = (callback) => {
//   jsonp(
//     "https://www.colourlovers.com/api/palettes/top?format=json&jsonCallback=callback&numResults=50",
//     {
//       param: "jsonCallback",
//     },
//     callback
//   );
// };

class Home extends React.Component {
  state = {
    overlayColor: "FF9C00",
    overlayIntensity: 0.3,
    colorSchemeIndex: 0,
    colorSchemeSource: kInitialColorSchemeSource,
    colorScheme: kInitialColorSchemeSource[0],
  };

  componentDidMount() {
    const colorScheme = new URLSearchParams(document.location.search).get("src");
    const overlayColor = new URLSearchParams(document.location.search).get("overlay");
    const overlayIntensity = new URLSearchParams(document.location.search).get("intensity");

    this.setState((state) => {
      return {
        colorScheme: colorScheme ? colorScheme.split(",") : state.colorScheme,
        overlayColor: overlayColor || state.overlayColor,
        overlayIntensity: overlayIntensity || state.overlayIntensity,
      };
    });
  }

  // updateColorSource(nextIndex) {
  //   getPalleteFromColorLovers((err, res) => {
  //     if (err) return console.error(err);

  //     const newColorSchemeSource = [this.state.colorScheme, ...map(res, "colors")];

  //     this.setState({
  //       colorSchemeIndex: 1,
  //       colorSchemeSource: newColorSchemeSource,
  //       colorScheme: newColorSchemeSource[1],
  //     });
  //   });
  // }

  handleChangeColor(index, color) {
    const newColorScheme = this.state.colorScheme.slice();
    newColorScheme[index] = color.hex.replace("#", "");

    this.setState({
      colorScheme: newColorScheme,
    });
  }

  handleOverlayChange(index, color) {
    const newColor = color.hex.replace("#", "");

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
    const colorScheme = this.state.colorScheme.slice();

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
    const newSchemeIndex = (this.state.colorSchemeIndex + 1) % this.state.colorSchemeSource.length;

    // if (newSchemeIndex === 0) {
    //   this.updateColorSource(true);
    //   return;
    // }

    this.setState({
      colorScheme: this.state.colorSchemeSource[newSchemeIndex],
      colorSchemeIndex: newSchemeIndex,
    });
  }

  render() {
    const { colorScheme, overlayColor, overlayIntensity } = this.state;

    const shareUrl = `${document.location.origin}${document.location.pathname}?src=${colorScheme.join(
      ","
    )}&overlay=${overlayColor}&intensity=${overlayIntensity}`;

    return (
      <Container>
        <Box padding={2}>
          <Space h={1} />

          <HeaderH1
            style={{
              display: "inline-block",
              width: "auto",
              padding: "6px",
              backgroundColor: "var(--accent-color)",
            }}>
            Cohesive
          </HeaderH1>
          <HeaderH1
            style={{
              display: "inline-block",
              width: "auto",
              marginTop: "-4px",
              padding: "6px",
              backgroundColor: "var(--accent-color)",
            }}>
            Colors
          </HeaderH1>

          <Space h={1} />
          <Text>Tool that may help you to create cohesive color schemes.</Text>
          <Space h={2} />

          <HeaderH3>1. Select Colors</HeaderH3>

          <Text>Create the original color pallete, anything you want. Click to edit.</Text>

          <Space h={1} />
          <ColorBar colors={colorScheme} onChange={this.handleChangeColor.bind(this)} action="edit" />
          <Space h={1} />
          <Inline>
            <Button className="-small" onClick={this.randomize.bind(this)}>
              Random
            </Button>
            <Space w={1} />
            <Button
              style={{ width: 42 }}
              onClick={this.handleResizePallete.bind(this, -1)}
              disabled={colorScheme.length < 2}>
              -
            </Button>
            <Space w={0.5} />

            <Button style={{ width: 42 }} onClick={this.handleResizePallete.bind(this, 1)}>
              +
            </Button>
          </Inline>

          <Space h={2} />
          <HeaderH3>2. Add overlay</HeaderH3>
          <Text>This color will bring the original colors together.</Text>

          <Space h={1} />

          <Inline>
            <ColorBar colors={[overlayColor]} onChange={this.handleOverlayChange.bind(this)} action="edit" />

            <Space w={1} />

            <Box style={{ width: 220 }}>
              <Text>
                Intensity <span style={{ color: "#666" }}>{Math.round(overlayIntensity * 100)}%</span>
              </Text>
              <Space h={1} />
              <Range
                aria-label="Scale"
                type="range"
                value={overlayIntensity}
                onChange={this.handleOverlayIntensityChange.bind(this)}
                min="0"
                max="1"
                step=".01"
              />
            </Box>
          </Inline>

          <Space h={2} />

          <Inline>
            <HeaderH3>3. Result</HeaderH3>
            <div style={{ flex: 1 }} />
            {navigator && navigator.clipboard && navigator.clipboard.writeText && (
              <Button
                onClick={() => {
                  const colorsStr = fixMyColors(colorScheme, overlayColor, overlayIntensity)
                    .map((color) => `#${color}`)
                    .join(", ");

                  navigator.clipboard.writeText(colorsStr);
                }}>
                Copy All
              </Button>
            )}
          </Inline>
          <Text>Click on any color to copy.</Text>

          <Space h={1} />

          <ColorBar copyArray={true} colors={fixMyColors(colorScheme, overlayColor, overlayIntensity)} action="copy" />

          <Space h={1} />

          <Text>Share this color pallete</Text>
          <Inline>
            <Input aria-label="Share URL" type="text" value={shareUrl} disabled={true} />
            <Space w={1} />
            {"navigator && navigator.clipboard && navigator.clipboard.writeText" && (
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(shareUrl);
                }}>
                Copy URL
              </Button>
            )}
          </Inline>

          <Space h={2} />

          <Text>More unrelated experiments</Text>
          <Space h={0.5} />
          <Ul>
            <Li>
              <Text>
                Tool that can convert any image into a pure css image, <A href="https://javier.xyz/img2css/">img2css</A>
                .
              </Text>
            </Li>
            <Li>
              <Text>
                Find the visual center of your images / logos,{" "}
                <A href="https://javier.xyz/visual-center/">visual-center</A>.
              </Text>
            </Li>
            <Li>
              <Text>
                Create animated CSS transitions with box-shadow, <A href="https://javier.xyz/morphin/">morphin</A>.
              </Text>
            </Li>
            <Li>
              <Text>
                JS AI Battle Game, <A href="https://clashjs.com/">clashjs</A>.
              </Text>
            </Li>
          </Ul>

          <Space h={2} />

          <Box
            padding={0.25}
            style={{
              display: "inline-block",
              backgroundColor: "rgba(246,229,141,.19)",
              borderLeft: "3px solid #f6e58d",
            }}>
            <Text>
              I'm working on an iOS app! Create and save cohesive color palletes,{" "}
              <strong>
                <A href="http://eepurl.com/cZwQn9" target="_blank" rel="noopener noreferrer">
                  Sign Up
                </A>
              </strong>{" "}
              to be the first to know!
            </Text>
          </Box>

          <Space h={2} />
          <Text>
            Made by <A href="https://javier.xyz">javierbyte</A>. Based on this idea{" "}
            <A
              target="_blank"
              rel="noopener noreferrer"
              href="https://dribbble.com/shots/166246-My-Secret-for-Color-Schemes">
              this idea
            </A>
            .
          </Text>
          <Space h={3} />
        </Box>
      </Container>
    );
  }
}

export default Home;
