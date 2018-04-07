import Home from './Home'
import FAQ from './FAQ'
import Apply from './Apply'
import MeetTheUnicorns from './MeetTheUnicorns'
import Investors from './Investors'

import { DrawerNavigator } from 'react-navigation'

import { colors, fonts } from '../theme'

const routes = {
  Home: { screen: Home },
  MeetTheUnicorns: { screen: MeetTheUnicorns },
  Investors: { screen: Investors },
  FAQ: { screen: FAQ },
  Apply: { screen: Apply },
}

const routeConfig = {
  contentOptions: {
    labelStyle: {
      fontFamily: fonts.bold
    },
    activeTintColor: colors.pink
  }
}

export default DrawerNavigator(routes, routeConfig)
