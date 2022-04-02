import { Fragment, useState, useEffect } from 'react';

import ColorBar from './components/ColorBar.jsx';

import Credits from './components/Credits.jsx';
import MoreExperiments from './components/MoreExperiments.jsx';

import { FixMyColors } from './util/color-functions.js';

import {
  JBX,
  Button,
  Range,
  MainHeader,
  HeaderH3,
  Text,
  Space,
  Box,
  Container,
  Input,
  Inline,
} from 'jbx';

import Styled from 'styled-components';

const Alert = Styled.a({
  backgroundColor: '#1DA1F2',
  borderLeft: '3px solid rgba(0, 0, 0, 0.2)',
  textShadow: 'rgba(0, 0, 0, 0.1) 0 -1px 0',
  color: '#fff',
  display: 'none',
  padding: 8,
  zIndex: 2,
  textDecoration: 'none',
  '@media screen and (min-width: 1200px)': {
    display: 'inline-block',
    position: 'absolute',
    top: 32,
    right: 64,
    maxWidth: 380,
  },
  ':hover': {
    textDecoration: 'underline',
    backgroundColor: '#1d8ff2',
  },
});

const kInitialColorSchemeSource = [
  ['555e7b', 'b7d968', 'b576ad', 'e04644', 'fde47f', '7ccce5'],
  ['69D2E7', 'A7DBD8', 'E0E4CC', 'F38630', 'FA6900'],
  ['FE4365', 'FC9D9A', 'F9CDAD', 'C8C8A9', '83AF9B'],
  ['ECD078', 'D95B43', 'C02942', '542437', '53777A'],
  ['556270', '4ECDC4', 'C7F464', 'FF6B6B', 'C44D58'],
  ['774F38', 'E08E79', 'F1D4AF', 'ECE5CE', 'C5E0DC'],
  ['E8DDCB', 'CDB380', '036564', '033649', '031634'],
  ['490A3D', 'BD1550', 'E97F02', 'F8CA00', '8A9B0F'],
  ['594F4F', '547980', '45ADA8', '9DE0AD', 'E5FCC2'],
  ['00A0B0', '6A4A3C', 'CC333F', 'EB6841', 'EDC951'],
  ['E94E77', 'D68189', 'C6A49A', 'C6E5D9', 'F4EAD5'],
  ['3FB8AF', '7FC7AF', 'DAD8A7', 'FF9E9D', 'FF3D7F'],
  ['D9CEB2', '948C75', 'D5DED9', '7A6A53', '99B2B7'],
  ['FFFFFF', 'CBE86B', 'F2E9E1', '1C140D', 'CBE86B'],
  ['EFFFCD', 'DCE9BE', '555152', '2E2633', '99173C'],
  ['343838', '005F6B', '008C9E', '00B4CC', '00DFFC'],
  ['413E4A', '73626E', 'B38184', 'F0B49E', 'F7E4BE'],
  ['99B898', 'FECEA8', 'FF847C', 'E84A5F', '2A363B'],
  ['FF4E50', 'FC913A', 'F9D423', 'EDE574', 'E1F5C4'],
  ['655643', '80BCA3', 'F6F7BD', 'E6AC27', 'BF4D28'],
  ['00A8C6', '40C0CB', 'F9F2E7', 'AEE239', '8FBE00'],
  ['351330', '424254', '64908A', 'E8CAA4', 'CC2A41'],
  ['554236', 'F77825', 'D3CE3D', 'F1EFA5', '60B99A'],
  ['FF9900', '424242', 'E9E9E9', 'BCBCBC', '3299BB'],
  ['5D4157', '838689', 'A8CABA', 'CAD7B2', 'EBE3AA'],
  ['8C2318', '5E8C6A', '88A65E', 'BFB35A', 'F2C45A'],
  ['FAD089', 'FF9C5B', 'F5634A', 'ED303C', '3B8183'],
  ['FF4242', 'F4FAD2', 'D4EE5E', 'E1EDB9', 'F0F2EB'],
  ['D1E751', 'FFFFFF', '000000', '4DBCE9', '26ADE4'],
  ['F8B195', 'F67280', 'C06C84', '6C5B7B', '355C7D'],
  ['BCBDAC', 'CFBE27', 'F27435', 'F02475', '3B2D38'],
  ['1B676B', '519548', '88C425', 'BEF202', 'EAFDE6'],
  ['5E412F', 'FCEBB6', '78C0A8', 'F07818', 'F0A830'],
  ['EEE6AB', 'C5BC8E', '696758', '45484B', '36393B'],
  ['452632', '91204D', 'E4844A', 'E8BF56', 'E2F7CE'],
  ['F0D8A8', '3D1C00', '86B8B1', 'F2D694', 'FA2A00'],
  ['F04155', 'FF823A', 'F2F26F', 'FFF7BD', '95CFB7'],
  ['2A044A', '0B2E59', '0D6759', '7AB317', 'A0C55F'],
  ['BBBB88', 'CCC68D', 'EEDD99', 'EEC290', 'EEAA88'],
  ['B9D7D9', '668284', '2A2829', '493736', '7B3B3B'],
  ['67917A', '170409', 'B8AF03', 'CCBF82', 'E33258'],
  ['B3CC57', 'ECF081', 'FFBE40', 'EF746F', 'AB3E5B'],
  ['A3A948', 'EDB92E', 'F85931', 'CE1836', '009989'],
  ['E8D5B7', '0E2430', 'FC3A51', 'F5B349', 'E8D5B9'],
  ['AB526B', 'BCA297', 'C5CEAE', 'F0E2A4', 'F4EBC3'],
  ['607848', '789048', 'C0D860', 'F0F0D8', '604848'],
  ['AAB3AB', 'C4CBB7', 'EBEFC9', 'EEE0B7', 'E8CAAF'],
  ['300030', '480048', '601848', 'C04848', 'F07241'],
  ['A8E6CE', 'DCEDC2', 'FFD3B5', 'FFAAA6', 'FF8C94'],
  ['3E4147', 'FFFEDF', 'DFBA69', '5A2E2E', '2A2C31'],
];

function Home() {
  const [colorSources] = useState(kInitialColorSchemeSource);

  const [colorScheme, colorSchemeSet] = useState(kInitialColorSchemeSource[0]);

  const [overlayColor, overlayColorSet] = useState('FF9C00');
  const [overlayIntensity, overlayIntensitySet] = useState(0.3);

  const shareUrl = `${document.location.origin}${
    document.location.pathname
  }?src=${colorScheme.join(
    ','
  )}&overlay=${overlayColor}&intensity=${overlayIntensity}`;

  useEffect(() => {
    const colorSchemeQuery = new URLSearchParams(document.location.search).get(
      'src'
    );
    if (colorSchemeQuery) colorSchemeSet(colorSchemeQuery.split(','));

    const overlayColorQuery = new URLSearchParams(document.location.search).get(
      'overlay'
    );
    if (overlayColorQuery) overlayColorSet(overlayColorQuery);

    const overlayIntensityQuery = new URLSearchParams(
      document.location.search
    ).get('intensity');
    if (overlayIntensityQuery)
      overlayIntensitySet(Number(overlayIntensityQuery));
  }, []);

  return (
    <Fragment>
      <Container>
        <JBX accent={'#eb4d4b'} />

        <MainHeader>Cohesive Colors</MainHeader>

        <Space h={1} />
        <Text>Tool that can help you to create cohesive color palettes.</Text>
        <Space h={2} />

        <HeaderH3>1. Select Colors</HeaderH3>

        <Text>
          Create the original color palette, anything you want. Click to edit.
        </Text>

        <Space h={1} />
        <ColorBar
          colors={colorScheme}
          onChange={colorSchemeSet}
          action="EDIT"
        />
        <Space h={1} />
        <Inline>
          <Button
            onClick={() => {
              const randomColorScheme =
                colorSources[Math.floor(Math.random() * colorSources.length)];
              colorSchemeSet(randomColorScheme);
            }}
            className="-small"
          >
            Random
          </Button>
          <Space w={1} />
          <Button
            style={{ width: 42 }}
            disabled={colorScheme.length < 2}
            onClick={() => {
              colorSchemeSet(colorScheme.slice(0, -1));
            }}
          >
            -
          </Button>
          <Space w={0.5} />

          <Button
            style={{ width: 42 }}
            onClick={() => {
              const randomColorScheme =
                colorSources[Math.floor(Math.random() * colorSources.length)];
              const randomColor =
                randomColorScheme[
                  Math.floor(Math.random() * randomColorScheme.length)
                ];
              colorSchemeSet([...colorScheme, randomColor]);
            }}
          >
            +
          </Button>
        </Inline>

        <Space h={2} />
        <HeaderH3>2. Add overlay</HeaderH3>

        <Space h={1} />

        <Inline>
          <ColorBar
            colors={[overlayColor]}
            onChange={(newArr) => overlayColorSet(newArr[0])}
            action="EDIT"
          />

          <Space w={1} />

          <Box style={{ width: 220 }}>
            <Text>
              Intensity{' '}
              <span style={{ color: '#666' }}>
                {Math.round(overlayIntensity * 100)}%
              </span>
            </Text>
            <Space h={1} />
            <Range
              aria-label="Scale"
              type="range"
              value={overlayIntensity}
              onChange={(evt) => overlayIntensitySet(evt.target.value)}
              min={0}
              max={1}
              step={0.01}
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
                const colorsStr = FixMyColors(
                  colorScheme,
                  overlayColor,
                  overlayIntensity
                )
                  .map((color) => `#${color}`)
                  .join(', ');

                navigator.clipboard.writeText(colorsStr);
              }}
            >
              Copy All
            </Button>
          )}
        </Inline>
        <Text>Click on any color to copy.</Text>

        <Space h={1} />

        <ColorBar
          copyArray={true}
          colors={FixMyColors(colorScheme, overlayColor, overlayIntensity)}
          action="COPY"
        />

        <Space h={1} />

        <Text>Share this color palette</Text>
        <Space h={0.5} />
        <Inline>
          <Input
            aria-label="Share URL"
            type="text"
            style={{ maxWidth: '70vw' }}
            value={shareUrl}
            disabled={true}
          />
          <Space w={1} />
          {navigator && navigator.clipboard && navigator.clipboard.writeText && (
            <Button
              onClick={() => {
                navigator.clipboard.writeText(shareUrl);
              }}
            >
              Copy URL
            </Button>
          )}
        </Inline>

        <Space h={2} />
        <MoreExperiments />
        <Space h={2} />
        <Credits />
      </Container>

      <Alert href="https://twitter.com/javierbyte">
        <Text>
          {'Follow me on twitter, '}
          <strong>@javierbyte</strong>
          {' for more experiments and tools!'}
        </Text>
      </Alert>
    </Fragment>
  );
}

export default Home;
