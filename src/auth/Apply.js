import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity
} from 'react-native'

import NavButton from '../components/NavButton'
import Button from '../components/Button'
import * as Images from '../assets/images'
import { dimensions, fonts, colors } from '../theme'

class Apply extends React.Component {
  state = {
    email: '',
    username: '',
    phone_number: '',
    password: '',
    confirmationCode: '',
    showConfirmation: false
  }
  onChangeText = (key, value) => {
    this.setState({ [key]: value })
  }
  signUp = () => {
    this.setState({ showConfirmation: true })
  }
  confirmSignUp = () => {
    this.setState({ showConfirmation: false })
    this.props.navigation.navigate('SignIn')
  }
  render() {
    const open = () => this.props.navigation.navigate('DrawerOpen')
    return (
      <ScrollView bounces={false} style={styles.container}>
        <ImageBackground
          source={Images.background}
          style={styles.background}
        >
          <Image
            resizeMode='contain'
            style={styles.logo}
            source={Images.logoWhite}
          />
          <Text style={styles.title}>REGISTER</Text>

          {
            !this.state.showConfirmation && (
              <View>
                <TextInput
                  placeholderTextColor='rgba(255, 255, 255, .6)'
                  style={styles.input}
                  placeholder='Username'
                  onChangeText={val => this.onChangeText('username', val)}
                  selectionColor='white'
                  autoCapitalize='none'
                  autoCorrect={false}
                  underlineColorAndroid='transparent'
                />
                <TextInput
                  placeholderTextColor='rgba(255, 255, 255, .6)'
                  style={styles.input}
                  placeholder='Email'
                  onChangeText={val => this.onChangeText('email', val)}
                  selectionColor='white'
                  autoCapitalize='none'
                  autoCorrect={false}
                  underlineColorAndroid='transparent'
                />
                <TextInput
                  placeholderTextColor='rgba(255, 255, 255, .6)'
                  style={styles.input}
                  placeholder='Password'
                  onChangeText={val => this.onChangeText('password', val)}
                  selectionColor='white'
                  secureTextEntry={true}
                  underlineColorAndroid='transparent'
                />
                <TextInput
                  placeholderTextColor='rgba(255, 255, 255, .6)'
                  style={styles.input}
                  placeholder='Phone Number'
                  onChangeText={val => this.onChangeText('phone_number', val)}
                  selectionColor='white'
                  underlineColorAndroid='transparent'
                />
                <Button
                  onPress={this.signUp}
                  containerStyle={styles.buttonContainer}
                  title="LET'S RYDE"
                />
              </View>
            )
          }
          {
            this.state.showConfirmation && (
              <View>
                <TextInput
                  placeholderTextColor='rgba(255, 255, 255, .6)'
                  style={styles.input}
                  placeholder='Username'
                  onChangeText={val => this.onChangeText('username', val)}
                  selectionColor='white'
                  autoCapitalize='none'
                  autoCorrect={false}
                  underlineColorAndroid='transparent'
                  value={this.state.username}
                />
                <TextInput
                  placeholderTextColor='rgba(255, 255, 255, .6)'
                  style={styles.input}
                  placeholder='Confirmation Code'
                  onChangeText={val => this.onChangeText('confirmationCode', val)}
                  selectionColor='white'
                  underlineColorAndroid='transparent'
                />
                <Button
                  onPress={this.confirmSignUp}
                  containerStyle={styles.buttonContainer}
                  title="CONFIRM SIGNUP"
                />
              </View>
            )
          }

        </ImageBackground>
        <NavButton
          onPress={open}
        />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  background: {
    height: dimensions.height
  },
  container: {
    flex: 1
  },
  logo: {
    width: '40%',
    alignSelf: 'center',
    marginTop: 40,
    marginBottom: 30
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 26,
    color: 'white',
    textAlign: 'center'
  },
  input: {
    margin: 10,
    borderBottomColor: 'white',
    borderBottomWidth: 2,
    height: 42,
    fontSize: 18,
    color: 'white',
    fontFamily: fonts.italic
  },
  buttonContainer: {
    marginTop: 30
  }
})

export default Apply