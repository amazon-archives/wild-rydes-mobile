import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ImageBackground,
  TouchableOpacity
} from 'react-native'

import NavButton from '../components/NavButton'
import Footer from '../components/Footer'

import { fonts, colors } from '../theme'
import * as Images from '../assets/images'

class FAQ extends React.Component {
  render() {
    const open = () => this.props.navigation.navigate('DrawerOpen')
    return (
      <ScrollView style={styles.container}>
        
        <ImageBackground
          source={Images.faqHeader}
          style={styles.header}
        >
          <Image
            source={Images.logoWhite}
            style={styles.logo}
            resizeMode='contain'
          />
          <Text style={styles.heading}>FREQUENTLY ASKED QUESTIONS</Text>
        </ImageBackground>

        <View style={styles.questionsContainer}>
          <Text style={styles.question}>Q: Why should I use this app?</Text>
          <Text style={styles.answer}>A: Unicorns are faster, safer, and more reliable. In recent times, their numbers have grown significantly, reaching a scale that makes it finally possible to harness them for mass transportation at an affordable cost.</Text>

          <Text style={styles.question}>Q: How do you recruit the unicorns? How can I know that my unicorn is trustworthy?</Text>
          <Text style={styles.answer}>A: Our unicorns are recruited from only the most humane and highest standard unicorn farms. Our unicorns are grass-fed, free range creatures raised on vegan, non-GMO diets. These unicorns are also completely safe because unicorns have infallible morality and judgment.</Text>

          <Text style={styles.question}>Q: How do I request a unicorn?</Text>
          <Text style={styles.answer}>A: Simply download our app, then tap a button to begin. Your unicorn will arrive shortly.</Text>

          <Text style={styles.question}>Q: How much does it cost?</Text>
          <Text style={styles.answer}>A: Since Wild Rydes is a marketplace for flight-based transportation, the price you pay is based on factors such as distance and availability of unicorns. You set the maximum price you’re willing to pay for a given ryde and then Wild Rydes matches you with a unicorn that’s willing to accept your price.</Text>

          <Text style={styles.question}>Q: How does it work?</Text>
          <Text style={styles.answer}>A: Our product is powered by a complex algorithm which efficiently matches idle unicorns with ryders based on factors such as proximity and shortest time-to-destination. The system is built on a serverless architecture, which makes running and scaling our backend services simple and cost-effective, allowing us to reliably serve the needs of Wild Rydes’ ever growing user base.</Text>

          <Text style={styles.question}>Q: What if I have a complaint about my unicorn?</Text>
          <Text style={styles.answer}>A: Wild Rydes is a customer obsessed company. We value each customer and want to ensure a positive experience. Therefore, we’ve staffed our customer service team with serverless chatbots that are available 24/7 to assist you.</Text>

          <Text style={styles.question}>Q: How do I cancel my ride?</Text>
          <Text style={styles.answer}>A: Tap the “Cancel Ryde” button in the Wild Rydes app.</Text>

          <Text style={styles.question}>Q: Can I use Wild Rydes internationally?</Text>
          <Text style={styles.answer}>A: Yes, you can use Wild Rydes in most countries except for Antarctica, Cuba, Sudan, Iran, North Korea, Syria and any other country designated by the United States Treasury's Office of Foreign Assets Control.</Text>

          <Text style={styles.question}>Q: How do I pay for my ryde?</Text>
          <Text style={styles.answer}>A: After creating a Wild Rydes account, fill in your payment method such as credit card, debit card, Bitcoin wallet, or Vespene gas repository. After you complete your Ryde, you will automatically be charged the fare.</Text>

          <Text style={styles.question}>Q: How many passengers can my unicorn take?</Text>
          <Text style={styles.answer}>A: The number of passengers on a single ryde depends on the size of your unicorn. Most unicorns can take one passenger per ryde. You can also request a large size unicorn which can take up to two passengers. If you select Sleigh version, you can take up to 4 passengers.</Text>
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
    flex: 1
  },
  header: {
    width: '100%'
  },
  logo: {
    width: '80%',
    marginTop: 60,
    marginBottom: 40,
    alignSelf: 'center'
  },
  heading: {
    color: 'white',
    fontFamily: fonts.bold,
    textAlign: 'center',
    paddingHorizontal: 20,
    fontSize: 34,
    paddingTop: 10,
    paddingBottom: 50
  },
  question: {
    fontFamily: fonts.bold,
    fontSize: 18
  },
  answer: {
    fontFamily: fonts.regular,
    fontSize: 16,
    marginBottom: 20
  },
  questionsContainer: {
    paddingTop: 20,
    paddingHorizontal: 15
  }
})

export default FAQ