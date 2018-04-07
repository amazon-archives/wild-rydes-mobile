import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground
} from 'react-native'

import NavButton from '../components/NavButton'
import Footer from '../components/Footer'

import { colors, dimensions, fonts } from '../theme'

const headerBg = require('../assets/images/wr-investors-header.png')
const logoBlack = require('../assets/images/wr-logo-black.png')
const pcp = require('../assets/images/wr-investors-pcp.png')
const awesome = require('../assets/images/wr-investors-awesome.png')
const barn = require('../assets/images/wr-investors-thebarn.png')
const investor1 = require('../assets/images/wr-investors-1.png')
const investor2 = require('../assets/images/wr-investors-2.png')
const investor3 = require('../assets/images/wr-investors-3.png')
const investor4 = require('../assets/images/wr-investors-4.png')
const investor5 = require('../assets/images/wr-investors-5.png')

class Investors extends React.Component {
  render() {
    const open = () => this.props.navigation.navigate('DrawerOpen')
    return (
      <ScrollView style={styles.container}>
        <ImageBackground
          source={headerBg}
          style={{ alignItems: 'center' }}
        >
          <Image resizeMode='contain' source={logoBlack} style={styles.logo} />
          <Text style={styles.title}>BACKED BY TOP DECILE INVESTORS</Text>
          <Text style={styles.subtitle}>We would not be anywhere without our trusted investors. We thank each of them for where we are today.</Text>
          
          <Image
            source={pcp}
            resizeMode='contain'
            style={styles.investorCoImage}
          />
          <Text style={styles.investorCoTitle}>Penglai Communications and Post New Century Technology Corporation Ltd</Text>
          <Text style={styles.investorCoSubtitle}>Global Communications Provider</Text>
          <Text style={styles.investorCoSubtitle}>PCPNCTC was formed in 2008 to hold the telecommunications services, media, and IT businesses of Penglai Communications and Post LTD, a multinational mass media and telecommunications company. PCPL provides broadband subscription television services, fixed telephone, and mobile telephone across 20 countries and 3 continents.</Text>

          <Image
            source={awesome}
            resizeMode='contain'
            style={styles.investorCoImage}
          />
          <Text style={styles.investorCoTitle}>TENDERLOIN CAPITAL</Text>
          <Text style={styles.investorCoSubtitle}>Venture Capital Firm</Text>
          <Text style={styles.investorCoSubtitle}>What makes us awesome sauce and not your typical venture firm? Backed by over three decades of experience and partnering successfully with entrepreneurs, Tenderloin Capital was founded to serve the needs of early-stage founders. It’s not just our experience that sets us apart; we relate to our entrepreneurs as people, not just as investments. Tenderloin Capital backs entrepreneurs who are building market-disrupting social-mobile-local-machine learned-artificially-intelligent cognitive experiences.</Text>

          <Image
            source={barn}
            resizeMode='contain'
            style={styles.investorCoImage}
          />
          <Text style={styles.investorCoTitle}>THE BARN</Text>
          <Text style={styles.investorCoSubtitle}>Accelerator</Text>
          <Text style={styles.investorCoSubtitle}>The Barn is an institution for primarily incubating chicken eggs as well as the next revolutions in precision agriculture technology. The Barn created the industry defining model for funding sustainable, humane, non-GMO, and fairtrade early stage businesses in animal husbandry. We look forward to working with you.</Text>
        </ImageBackground>

        <View style={styles.board}>
          <Text style={styles.investorCoTitle}>OUR BOARD OF DIRECTORS</Text>
          <Text style={styles.investorCoSubtitle}>The Barn is an institution for primarily incubating chicken eggs as well as the next revolutions in precision agriculture technology. The Barn created the industry defining model for funding sustainable, humane, non-GMO, and fairtrade early stage businesses in animal husbandry. We look forward to working with you.</Text>

          <ImageBackground
            source={investor1}
            style={styles.boardImage}
          >
            <Text style={styles.boardTitle}>DR. TIM WAGNER</Text>
            <Text style={styles.boardSubtitle}>Chairman of the Board, Grand Master of the Serverless Rite</Text>
          </ImageBackground>

          <ImageBackground
            source={investor2}
            style={styles.boardImage}
          >
            <Text style={styles.boardTitle}>VAUGHN R. NICHOLSON</Text>
            <Text style={styles.boardSubtitle}>EIR at Awesome Sauce Capital</Text>
          </ImageBackground>

          <ImageBackground
            source={investor3}
            style={styles.boardImage}
          >
            <Text style={styles.boardTitle}>CONWAY BULLE</Text>
            <Text style={styles.boardSubtitle}>Partner at The Barn</Text>
          </ImageBackground>

          <ImageBackground
            source={investor4}
            style={styles.boardImage}
          >
            <Text style={styles.boardTitle}>DR. SAMANTHA WALLEFORD, PHD</Text>
            <Text style={styles.boardSubtitle}>Managing Partner at Tenderloin Capital</Text>
          </ImageBackground>

          <ImageBackground
            source={investor5}
            style={styles.boardImage}
          >
            <Text style={styles.boardTitle}>QILIN FEI</Text>
            <Text style={styles.boardSubtitle}>Chairman of the Central Committee for Planning at PENGLAI COMMUNICATIONS AND POST NEW CENTURY TECHNOLOGY CORPORATION LTD</Text>
          </ImageBackground>

        </View>
        <Footer navigation={this.props.navigation} />
        <NavButton
          onPress={open}
        />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    height: 65,
    marginTop: 40
  },
  title: {
    fontSize: 26,
    padding: 20,
    textAlign: 'center',
    fontFamily: fonts.bold
  },
  subtitle: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    fontSize: 18,
    textAlign: 'center',
    fontFamily: fonts.italic
  },
  investorCoImage: {
    width: '50%',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 40
  },
  investorCoTitle: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    fontFamily: fonts.bold,
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  investorCoSubtitle: {
    color: 'white',
    paddingHorizontal: 10,
    fontSize: 16,
    textAlign: 'center',
    fontFamily: fonts.italic,
    marginBottom: 20
  },
  board: {
    backgroundColor: '#000',
    paddingVertical: 20,
    paddingHorizontal: 10
  },
  boardImage: {
    width: '100%',
    paddingVertical: 100,
    marginTop: 10
  },
  boardTitle: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: fonts.bold,
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  boardSubtitle: {
    paddingHorizontal: 20,
    fontSize: 18,
    textAlign: 'center',
    fontFamily: fonts.italic,
    marginBottom: 20
  },
})

export default Investors