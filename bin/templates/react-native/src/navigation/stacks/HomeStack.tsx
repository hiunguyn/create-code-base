import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import APP_ROUTER from '@/navigation/config/router'
import navigationConfigs from '@/navigation/config/options'
import Home from '@/components/home/Home'
import About from '@/components/home/About'

const Stack = createStackNavigator()

const HomeStack = () => (
  <Stack.Navigator screenOptions={navigationConfigs}>
    <Stack.Screen name={APP_ROUTER.APP.HOME.ROOT} component={Home} />
    <Stack.Screen name="HOME ABOUT" component={About} />
  </Stack.Navigator>
)

export default HomeStack
