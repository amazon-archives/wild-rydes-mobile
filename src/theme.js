import {
  Dimensions
} from 'react-native'

const dimensions = Dimensions.get('window')

const colors = {
  pink: '#f50856',
  blue: '#00bbd3',
  yellow: '#ffc400'
}

const fonts = {
  regular: 'NotoSerif',
  bold: 'NotoSerif-Bold',
  italic: 'NotoSerif-Italic'
}

export {
  colors,
  dimensions,
  fonts
}