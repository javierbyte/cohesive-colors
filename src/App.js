const React = require('react')
const _ = require('lodash')
const tinycolor = require('tinycolor2')
const colorblend = require('colorblendjs')
const randomcolor = require('randomcolor')

const jsonp = require('jsonp')

const ColorBar = require('./components/ColorBar')

function colorToRgbArray(color) {
  var rgbColor = tinycolor(color).toRgb()
  return [rgbColor.r, rgbColor.g, rgbColor.b]
}

var rgbArrayToHex = (color) => {
  return tinycolor({
    r: color[0],
    g: color[1],
    b: color[2]
  }).toHex()
}

var fixMyColors = (colorScheme, overlayColor, overlayIntensity) => {
  return _.map(colorScheme, (color) => {
    var newColor = colorblend.overlay(colorToRgbArray(color), colorToRgbArray(overlayColor), overlayIntensity)
    return rgbArrayToHex(newColor)
  })
}

var getPalleteFromColorLovers = (callback) => {
  jsonp('https://www.colourlovers.com/api/palettes/random?format=json&jsonCallback=callback', {
    param: 'jsonCallback'
  }, callback)
}

var App = React.createClass({
  getInitialState () {
    return {
      colorScheme: ['555e7b', 'b7d968', 'b576ad', 'e04644', 'fde47f', '7ccce5'],

      overlayColor: 'FF9C00',
      overlayIntensity: 0.3,

      colorLovers: this.colorScheme
    }
  },

  componentDidMount () {
    getPalleteFromColorLovers((err, res) => {
      if (err) return console.error(err)

      this.setState({
        colorLovers: res[0].colors
      })
    })
  },

  handleChangeColor (index, color) {
    var newColorScheme = this.state.colorScheme.slice()
    newColorScheme[index] = color.hex.replace('#', '')

    this.setState({
      colorScheme: newColorScheme
    })
  },

  handleOverlayChange (index, color) {
    var newColor = color.hex.replace('#', '')

    this.setState({
      overlayColor: newColor
    })
  },

  handleOverlayIntensityChange (evt) {
    this.setState({
      overlayIntensity: parseFloat(evt.target.value)
    })
  },

  handleResizePallete (delta) {
    var colorScheme = this.state.colorScheme.slice()

    if (delta === 1) {
      colorScheme.push(randomcolor().replace('#', ''))
    } else {
      colorScheme.pop()
    }

    this.setState({
      colorScheme: colorScheme
    })
  },

  randomize () {
    this.setState({
      colorScheme: this.state.colorLovers
    })

    getPalleteFromColorLovers((err, res) => {
      if (err) return console.error(err)

      this.setState({
        colorLovers: res[0].colors
      })
    })
  },

  render () {
    var {colorScheme, overlayColor, overlayIntensity} = this.state

    return (
      <div className='content'>
        <div className='content-block'>
          <h1>Cohesive Colors.</h1>
          <div>
            This is a tool that may help you to create cohesive color schemes.
          </div>
        </div>

        <div className='content-block'>
          <h2>Original colors:</h2>
          <ColorBar colors={colorScheme} onChange={this.handleChangeColor} action='edit' />
          <button onClick={this.randomize}>
            Ger random from ColourLovers
          </button>
          {' - '}
          <button onClick={this.handleResizePallete.bind(null, -1)} disabled={colorScheme.length < 2}>
            Less colors
          </button>
          <button onClick={this.handleResizePallete.bind(null, 1)}>
            More colors
          </button>
        </div>

        <div className='content-block'>
          <h2>OverlayColor</h2>
          <ColorBar colors={[overlayColor]} onChange={this.handleOverlayChange} action='edit' />
          <div className='flex-center'>
            <div className='margin-right-Hx'>Intensity</div>
            <input className='input-slider' type='range' min='0' max='1' step='.01' onChange={this.handleOverlayIntensityChange} value={overlayIntensity} />
          </div>
        </div>

        <div className='content-block'>
          <h2>Result:</h2>
          <ColorBar key={colorScheme.join('')} colors={fixMyColors(colorScheme, overlayColor, overlayIntensity)} action='copy' />
        </div>

        <div className='content-block text-block'>
          {!!window.ClipboardEvent && (
            <div>Click on any color to copy.</div>
          )}
          <br />
          <div className='content-block -credits'>
            Based on <a target='_blank' href='https://dribbble.com/shots/166246-My-Secret-for-Color-Schemes'>this idea</a> by <a target='_blank' href='https://twitter.com/_erica'>_erica</a>.
            Made by <a href='http://javier.xyz/' target='_blank'>javierbyte</a>.
          </div>
        </div>
      </div>
    )
  }

})

module.exports = App
