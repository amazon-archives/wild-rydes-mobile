import Home from './Home'
import FAQ from './FAQ'
import Apply from './Apply'
import MeetTheUnicorns from './MeetTheUnicorns'
import Investors from './Investors'

import { DrawerNavigator } from 'react-navigation'

const routeConfig = {
  Investors: { screen: Investors },
  Home: { screen: Home },
  MeetTheUnicorns: { screen: MeetTheUnicorns },
  FAQ: { screen: FAQ },
  Apply: { screen: Apply },
  
}

export default DrawerNavigator(routeConfig)
