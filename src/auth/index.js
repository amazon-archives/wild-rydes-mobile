import Home from './Home'
import FAQ from './FAQ'
import Apply from './Apply'
import SignIn from './SignIn'
import MeetTheUnicorns from './MeetTheUnicorns'
import Investors from './Investors'

import { createDrawerNavigator } from 'react-navigation'

import { colors, fonts } from '../theme'

const routes = {
  Home: { screen: Home },
  MeetTheUnicorns: { screen: MeetTheUnicorns },
  Investors: { screen: Investors },
  FAQ: { screen: FAQ },
  Apply: { screen: Apply },
  SignIn: { screen: SignIn }
}

const routeConfig = {
  contentOptions: {
    labelStyle: {
      fontFamily: fonts.bold
    },
    activeTintColor: colors.pink
  }
}

export default createDrawerNavigator(routes, routeConfig)
