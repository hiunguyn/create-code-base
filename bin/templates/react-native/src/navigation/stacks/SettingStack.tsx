import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Setting from '@/components/setting/Setting'
import APP_ROUTER from '@/navigation/config/router'
import navigationConfigs from '@/navigation/config/options'

const Stack = createStackNavigator()

const SettingStack = () => (
  <Stack.Navigator screenOptions={navigationConfigs}>
    <Stack.Screen name={APP_ROUTER.APP.SETTING.ROOT} component={Setting} />
  </Stack.Navigator>
)

export default SettingStack
