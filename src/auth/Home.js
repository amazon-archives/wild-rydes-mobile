import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  TextInput
} from 'react-native'

import { dimensions, colors, fonts } from '../theme'
import NavButton from '../components/NavButton'
import Title from '../components/PTitle'
import Paragraph from '../components/Paragraph'
import WhiteSpace from '../components/WhiteSpace'
import Footer from '../components/Footer'

const headerBg = require('../assets/images/wr-home-top.jpg')
const download = require('../assets/images/wr-home-block-1.png')
const unicorn = require('../assets/images/wr-home-block-2.png')
const price = require('../assets/images/wr-home-block-3.png')
const success = require('../assets/images/wr-home-block-4.png')
const footerBg = require('../assets/images/wr-home-about.jpg')
const appIcon = require('../assets/images/wr-home-w.png')
const apple = require('../assets/images/wr-home-apple.png')
const google = require('../assets/images/wr-home-google.png')
const facebook = require('../assets/images/wr-home-facebook.png')
const instagram = require('../assets/images/wr-home-instagram.png')
const twitter = require('../assets/images/wr-home-twitter.png')
const wechat = require('../assets/images/wr-home-wechat.png')
const weibo = require('../assets/images/wr-home-weibo.png')
const quoteBg = require('../assets/images/wr-home-quote.jpg')
const kracken = require('../assets/images/wr-home-kraken.png')

class Home extends React.Component {
  state = {
    greeting: 'SIGN UP'
  }
  signUp = () => {
    console.log('something')
  }
  onChangeText = (key, value) => {
    this.setState({
      [key]: value
    })
  }
  render() {
    const open = () => this.props.navigation.navigate('DrawerOpen')
    return (
      <ScrollView
        bounces={false}
        contentContainerStyle={styles.contentContainer}
        style={styles.container}
      >
        <Image
          source={headerBg}
          style={styles.headerImage}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={this.signUp}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>GIDDY UP!</Text>
            </View>
          </TouchableOpacity>
        </View>
        <NavButton onPress={open} />
        <Title title='HOW DOES THIS WORK?' />
        <Paragraph content={p1} />

        <Image
          source={download}
          resizeMode='contain'
          style={styles.centerImage}
        />
        <Title title='DOWNLOAD THE APP' />
        <Paragraph content={p2} />

        <Image
          source={unicorn}
          resizeMode='contain'
          style={styles.centerImage}
        />
        <Title title='REQUEST A UNICORN' />
        <Paragraph content={p3} />

        <Image
          source={price}
          resizeMode='contain'
          style={styles.centerImage}
        />
        <Title title='PICK A PRICE' />
        <Paragraph content={p4} />

        <Image
          source={success}
          resizeMode='contain'
          style={styles.centerImage}
        />
        <Title title='RIDE OFF TO SUCCESS!' />
        <Paragraph content={p5} />

        <WhiteSpace size={80} />

        <ImageBackground
          style={styles.ourStoryContainer}
          source={footerBg}
        >
          <Title title='OUR STORY' />
          <Paragraph content={p6} />
        </ImageBackground>

        {/* Signup Form */}
        <View style={styles.signUpForm}>
          <Image
            style={styles.appIcon}
            resizeMode='contain'
            source={appIcon}
          />
          <Title
            title={this.state.greeting}
            style={styles.signUpTitle}
          />
          <Paragraph
            content="Wild Rydes is coming sooon! Enter your email to enter the limited private beta"
          />
          <TextInput
            placeholder='Enter your email address'
            placeholderTextColor='rgba(255, 255, 255, .4)'
            onChangeText={val => this.onChangeText('email', value)}
            style={styles.emailInput}
          />
          <TouchableOpacity>
            <View style={styles.emailSubmitButton}>
              <Text style={styles.emailSubmitButtonText}>SUBMIT</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.appIconContainer}>
            <Image source={apple} />
            <Image source={google} />
          </View>

          <View style={styles.socialContainer}>
            <Image source={facebook} style={styles.socialIcon} />
            <Image source={instagram} style={styles.socialIcon} />
            <Image source={twitter} style={styles.socialIcon} />
            <Image source={wechat} style={styles.socialIcon} />
            <Image source={weibo} style={styles.socialIcon} />
          </View>
        </View>

        {/* Quote */}
        <ImageBackground
          source={quoteBg}
          style={styles.quote}
        >
          <Title style={styles.quoteTitle} title={quote} />
          <Paragraph
            content="- Satisfied Wild Rydes User"
          />
        </ImageBackground>

        {/* Kraken */}
        <View
          source={kracken}
          style={styles.kracken}
        >
          <Image
            source={kracken}
            resizeMode='contain'
            style={styles.krackenImage}
          />
          <Title style={styles.quoteTitle} title="COMING SOON" />
          <Paragraph
            content="Kraken 3xplorer and Dragon Flyght. We’re looking to provide you a full service package from air, land, and to sea."
          />
        </View>
        <Footer navigation={this.props.navigation} />
      </ScrollView>
    )
  }
}

const p1 = "In today’s fast paced world, you’ve got places you need to be but not enough time in your jam packed schedule. Wouldn’t it be nice if there were a transportation service that changed the way you get around daily? Introducing Wild Rydes, an innovative transportation service that helps people get to their destination faster and hassle-free. Getting started is as easy as tapping a button in our app."

const p2 = "Head over to the app store and download the Wild Rydes app. You’re just a few taps away from getting your ryde."

const p3 = "Pick the valuation you're willing to pay and your ryde is set up. The only surge is the acceleration you get when taking off."

const p4 = "Pick the valuation you're willing to pay and your ryde is set up. The only surge is the acceleration you get when taking off."

const p5 = "After matching with your unicorn and agreeing to its terms, you’ll be all set. Your unicorn will arrive shortly to pick you up."

const p6 = "Wild Rydes was started by a former hedge fund analyst and a software developer. The two long-time friends happened upon the Wild Rydes idea after attending a silent yoga retreat in Nevada. After gazing upon the majestic herds of unicorns prancing across a surreal Nevada sunset, they witnessed firsthand the poverty and unemployment endemic to that once proud race. Whether it was modern society’s reliance on science over magic or not, we’ll never know the cause of their Ozymandian downfall and fade to obscurity. Moved by empathy, romance, and free enterprise, they saw an opportunity to marry society’s demand for faster, more flexible transportation to underutilized beasts of labor through an on-demand market making transportation app. Using the founders’ respective expertise in animal husbandry and software engineering, Wild Rydes was formed and has since raised untold amounts of venture capital. Today, Wild Rydes has thousands of unicorns in its network fulfilling hundreds of rydes each day."

const quote = '“I was almost late to my ultimate frisbee tournament in DOLORES park. BUt Wild Rydes Got me there from the marina in under five minutes.”'


const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -50
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 30,
    paddingVertical: 8,
    paddingHorizontal: 24,
    marginBottom: 70
  },
  buttonText: {
    color: colors.pink,
    fontFamily: fonts.bold,
    fontSize: 20
  },
  headerImage: {
    width: dimensions.width,
    height: 300
  },
  title: {
    fontSize: 22,
    marginTop: 100
  },
  contentContainer: {
    alignItems: 'center',
  },
  container: {
    backgroundColor: colors.pink,
    flex: 1
  },
  centerImage: {
    marginTop: 40,
    marginBottom: 10,
    width: dimensions.width / 2
  },
  ourStoryContainer: {
    width: dimensions.width,
    alignItems: 'center'
  },
  signUpForm: {
    width: '100%',
    backgroundColor: '#000',
    alignItems: 'center',
    paddingBottom: 80
  },
  appIcon: {
    width: dimensions.width / 2,
    marginTop: 80
  },
  signUpTitle: {
    marginTop: -15
  },
  emailInput: {
    marginTop: 10,
    fontFamily: fonts.italic,
    backgroundColor: '#333',
    height: 35,
    width: dimensions.width - 30,
    paddingLeft: 9
  },
  emailSubmitButton: {
    backgroundColor: 'white',
    width: dimensions.width - 30,
    justifyContent: 'center',
    alignItems: 'center',
    height: 35
  },
  emailSubmitButtonText: {
    fontFamily: fonts.bold
  },
  appIconContainer: {
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  socialContainer: {
    flexDirection: 'row',
    paddingHorizontal: 50,
    justifyContent: 'center'
  },
  socialIcon: {
    marginHorizontal: 10
  },
  quote: {
    paddingVertical: 60,
    width: '100%',
    paddingHorizontal: 15
  },
  quoteTitle: {
    textAlign: 'center'
  },
  quoteContainer: {
    textAlign: 'center'
  },
  kracken: {
    paddingVertical: 50,
    width: '100%',
    backgroundColor: '#00BBD6',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  krackenImage: {
    width: dimensions.width * .7,
    height: 250,
    marginBottom: 20
  }
})

export default Home