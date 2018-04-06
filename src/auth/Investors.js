import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground
} from 'react-native'

import NavButton from '../components/NavButton'
import Footer from '../components/Footer'

import { colors, dimensions, fonts } from '../theme'

const headerBg = require('../assets/images/wr-investors-header.png')
const logoBlack = require('../assets/images/wr-logo-black.png')

class Investors extends React.Component {
  render() {
    const open = () => this.props.navigation.navigate('DrawerOpen')
    return (
      <View style={styles.container}>
        <ImageBackground
          source={headerBg}
          style={{ width: '100%' }}
        >
          <Image resizeMode='contain' source={logoBlack} style={styles.logo} />
        </ImageBackground>
        <Footer navigation={this.props.navigation} />
        <NavButton
          onPress={open}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    height: 40,
    paddingTop: 100
  }
})

export default Investors