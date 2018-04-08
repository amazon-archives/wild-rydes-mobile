import React from 'react'
import { TabNavigator } from 'react-navigation'

import HailRide from './HailRide'

const tabs = {
  HailRide: { screen: HailRide }
}

export default TabNavigator(tabs)
