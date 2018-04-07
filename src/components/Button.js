import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native'

import { fonts, colors } from '../theme'

export default ({ title, onPress, containerStyle }) => (
  <View style={[styles.container, containerStyle]}>
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{title}</Text>
      </View>
    </TouchableOpacity>
  </View>
)

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 27,
    backgroundColor: 'white',
    borderRadius: 25
  },
  buttonText: {
    color: colors.pink,
    fontFamily: fonts.bold,
    fontSize: 18
  }
})
