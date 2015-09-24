var React = require('react')
var ColorPicker = require('react-color')
var _ = require('lodash')

var ColorBar = React.createClass({
  propTypes: {
    colors: React.PropTypes.array,
    onChange: React.PropTypes.func
  },

  getInitialState () {
    return {
      currentlyEditing: -1,

      popupPosition: {
        position: 'fixed',
        top: '0px',
        left: '0px'
      }
    }
  },

  onEdit (colorIndex, evt) {
    var elReact = evt.currentTarget.getBoundingClientRect()

    this.setState({
      currentlyEditing: colorIndex,
      popupPosition: {
        position: 'fixed',
        top: '' + Math.floor(elReact.top + elReact.height) + 'px',
        left: '' + Math.floor(elReact.left) + 'px'
      }
    })
  },

  handleClose () {
    this.setState({
      currentlyEditing: -1
    })
  },

  render () {
    var {colors, onChange} = this.props
    var {currentlyEditing, popupPosition} = this.state

    var colorRender = _.map(colors, (color, index) => {
      var colorClasses = 'colorbar-element'
      if (onChange) {
        colorClasses += ' -editable'
      }

      return (
      <div className={colorClasses} key={index} onClick={this.onEdit.bind(null, index)} style={{
        backgroundColor: '#' + color
      }}>
          #{color}
        </div>
      )
    })

    return (
    <div className='colorbar-container'>
      <div className='colorbar'>
        {colorRender}
      </div>
      {!!onChange && (
        <ColorPicker
          display={currentlyEditing !== -1}
          positionCSS={popupPosition}
          onClose={this.handleClose}
          type='chrome'
          onChange={onChange.bind(null, currentlyEditing)}
          color={colors[currentlyEditing]} />
      )}
      </div>
    )
  }

})

module.exports = ColorBar
