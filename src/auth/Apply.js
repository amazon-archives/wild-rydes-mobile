import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

import NavButton from '../components/NavButton'
import Footer from '../components/Footer'

class Apply extends React.Component {
  render() {
    const open = () => this.props.navigation.navigate('DrawerOpen')
    return (
      <View style={styles.container}>
        <Text>Hello from Apply component</Text>
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
    flex: 1
  }
})

export default Apply