import React from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'

import { colors, fonts } from '../theme'

export default ({ title, style }) => (
  <Text style={[styles.title, style]}>{title}</Text>
)

const styles = StyleSheet.create({
  title: {
    color: 'white',
    fontFamily: fonts.bold,
    fontSize: 18
  }
})
