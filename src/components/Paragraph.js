import React from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'

import { colors, fonts } from '../theme'

export default ({ content, style }) => (
  <Text style={[styles.title, style]}>{content}</Text>
)

const styles = StyleSheet.create({
  title: {
    marginTop: 15,
    color: 'white',
    fontFamily: fonts.italic,
    fontSize: 16,
    paddingHorizontal: 20,
    textAlign: 'center'
  }
})
