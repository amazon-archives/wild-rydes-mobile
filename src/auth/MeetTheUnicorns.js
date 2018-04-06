import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground
} from 'react-native'

import NavButton from '../components/NavButton'
import Footer from '../components/Footer'
import WhiteSpace from '../components/WhiteSpace'

import { colors, fonts, dimensions } from '../theme'

const headerBg = require('../assets/images/wr-unicorn-header.png')
const logoBlack = require('../assets/images/wr-logo-black.png')
const unicorn1 = require('../assets/images/wr-unicorn-one.png')
const unicorn2 = require('../assets/images/wr-unicorn-two.png')
const unicorn3 = require('../assets/images/wr-unicorn-three.png')

class MeetTheUnicorns extends React.Component {
  render() {
    const open = () => this.props.navigation.navigate('DrawerOpen')
    return (
      <ScrollView
        bounces={false}
        style={styles.container}
      >
        <ImageBackground
          source={headerBg}
          style={styles.headerBg}
        >
          <Image source={logoBlack} />
          <Text style={styles.headerTitle}>UNICORNS ARE OUR FRIENDS</Text>
        </ImageBackground>

        <Text style={styles.italicCenterText}>The app is what makes this service exist, but the unicorns make it move. Meet them and see who you are riding with!</Text>

        <Text style={styles.italicText}>Wild Rydes has a dedicated staff that recruits, trains, and tends to our herd of unicorns. We take great pride in the quality of unicorns and rydes that we provide to our customers, and our staff exercises the utmost care in vetting the unicorns that join our herd.</Text>

        <Text style={styles.italicText}>Every unicorn goes through a rigorous due diligence process where we perform background checks, flying exams, and several rounds of interviews. Unicorns accepted to Wild Rydes are then treated to the best care and maintenance possible. We provide them excellent benefits, health care, and employee perks. This is part of our company philosophy in which happy unicorns lead to happy customers.</Text>

        <Text style={styles.italicText}>Meet a few of the unicorns that are part of our family.</Text>

        <Image
          source={unicorn1}
          style={styles.centerImage}
          resizeMode='contain'
        />
        <Text style={styles.unicornTitle}>BUCEPHALUS</Text>
        <Text style={styles.unicornSubtitle}>Golden Swiss</Text>
        <Text style={styles.unicornSubtitle}>-</Text>
        <Text style={styles.unicornDescription}>Bucephalus joined Wild Rydes in February 2016 and has been giving rydes almost daily. He says he most enjoys getting to know each of his ryders, which makes the job more interesting for him. In his spare time, Bucephalus enjoys watching sunsets and playing Pokemon Go.</Text>

        <Image
          source={unicorn2}
          style={styles.centerImage}
          resizeMode='contain'
        />
        <Text style={[styles.unicornTitle, styles.blue]}>SHADOWFOX</Text>
        <Text style={[styles.unicornSubtitle, styles.blue]}>Brown Jersey</Text>
        <Text style={[styles.unicornSubtitle, styles.blue]}>-</Text>
        <Text style={styles.unicornDescription}>Shadowfox joined Wild Rydes after completing a distinguished career in the military, where he toured the world in many critical missions. Shadowfox enjoys impressing his ryders with magic tricks that he learned from his previous owner.</Text>

        <Image
          source={unicorn3}
          style={[styles.centerImage, { margin: 20 }]}
          resizeMode='contain'
        />
        <Text style={[styles.unicornTitle, styles.yellow]}>ROCINATE</Text>
        <Text style={[styles.unicornSubtitle, styles.yellow]}>Baby Flying Yellowback</Text>
        <Text style={[styles.unicornSubtitle, styles.yellow]}>-</Text>
        <Text style={styles.unicornDescription}>Rocinante recently joined the Wild Rydes team in Madrid, Spain. She was instrumental in forming Wild Rydes’ Spanish operations after a long, distinguished acting career in windmill shadow-jousting.</Text>

        <WhiteSpace size={40} />

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
    flex: 1
  },
  headerBg: {
    width: '100%',
    paddingBottom: 20,
    paddingTop: 45,
    alignItems: 'center'
  },
  headerTitle: {
    paddingTop: 50,
    fontFamily: fonts.bold,
    fontSize: 34,
    paddingHorizontal: 20,
    lineHeight: 36,
    textAlign: 'center'
  },
  italicCenterText: {
    padding: 20,
    fontFamily: fonts.italic,
    textAlign: 'center'
  },
  italicText: {
    fontFamily: fonts.italic,
    padding: 10,
    marginBottom: 15
  },
  centerImage: {
    width: dimensions.width * .85,
    height: dimensions.width * .85,
    alignSelf: 'center',
    marginTop: 30
  },
  unicornTitle: {
    color: colors.pink,
    fontFamily: fonts.bold,
    textAlign: 'center',
    fontSize: 18
  },
  unicornSubtitle: {
    color: colors.pink,
    fontFamily: fonts.italic,
    textAlign: 'center',
    fontSize: 16
  },
  unicornDescription: {
    padding: 10,
    paddingHorizontal: 20,
    fontFamily: fonts.italic,
    textAlign: 'center'
  },
  blue: {
    color: colors.blue
  },
  yellow: {
    color: colors.yellow
  }
})

export default MeetTheUnicorns