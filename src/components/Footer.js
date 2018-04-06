import React from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'

import { fonts } from '../theme'

export default ({ navigation }) => (
  <View style={styles.footer}>
    <Text style={styles.link} onPress={() => navigation.navigate('Home')}>Home</Text>
    <Text style={styles.link} onPress={() => navigation.navigate('MeetTheUnicorns')}>Meet The Unicorns</Text>
    <Text style={styles.link} onPress={() => navigation.navigate('Investors')}>Investors & Board of Directors</Text>
    <Text style={styles.link} onPress={() => navigation.navigate('FAQ')}>FAQ</Text>
    <Text style={styles.link} onPress={() => navigation.navigate('Apply')}>Apply</Text>
  </View>
)

const styles = StyleSheet.create({
  footer: {
    width: '100%',
    paddingVertical: 15,
    backgroundColor: '#000'
  },
  link: {
    color: 'rgba(255, 255, 255, .9)',
    fontFamily: fonts.regular,
    paddingVertical: 5,
    textAlign: 'center'
  }
})
