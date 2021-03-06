import Dimensions from 'Dimensions'

// Precalculate Device Dimensions for better performance
const x = Dimensions.get('window').width
const y = Dimensions.get('window').height

// Calculating ratio from iPhone breakpoints
const ratioX = x < 375 ? (x < 320 ? 0.75 : 0.875) : 1
const ratioY = y < 568 ? (y < 480 ? 0.75 : 0.875) : 1

// We set our base font size value
const baseUnit = 16

// We're simulating EM by changing font size according to Ratio
const unit = baseUnit * ratioX

// We add an em() shortcut function
function em (value) {
  return unit * value
}

// Then we set our styles with the help of the em() function
const Style = {
  // GENERAL
  DEVICE_WIDTH: x,
  DEVICE_HEIGHT: y,
  RATIO_X: ratioX,
  RATIO_Y: ratioY,
  UNIT: em(1),
  PADDING: em(1.25),

  // FONT
  FONT_SIZE: em(1),
  FONT_SIZE_SMALLER: em(0.75),
  FONT_SIZE_SMALL: em(0.875),
  FONT_SIZE_TITLE: em(1.25),

  // COLORS
  COLOR_MAIN: '#27AAC5'
}

export default Style
