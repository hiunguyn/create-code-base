import React from 'react'
import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Image } from 'react-native'

import Icon from '@/assets/Icon'
import HomeStack from '@/navigation/stacks/HomeStack'
import SettingStack from '@/navigation/stacks/SettingStack'
import APP_ROUTER from '@/navigation/config/router'

type TabStackType = {
  key: number
  name: string
  component: React.ComponentType<any>
  options: BottomTabNavigationOptions
}

const Tab = createBottomTabNavigator()

const TabBarIcon: React.FC<{ color: string; source: any }> = ({ color, source }) => (
  <Image source={source} style={{ tintColor: color, width: 25, height: 25 }} />
)

const ArrayTabs: TabStackType[] = [
  {
    key: 1,
    name: APP_ROUTER.APP.HOME.TAB,
    component: HomeStack,
    options: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ color }) => <TabBarIcon color={color} source={Icon.home} />,
    },
  },
  {
    key: 2,
    name: APP_ROUTER.APP.SETTING.TAB,
    component: SettingStack,
    options: {
      tabBarLabel: 'Setting',
      tabBarIcon: ({ color }) => <TabBarIcon color={color} source={Icon.setting} />,
    },
  },
]

const RootTab = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarLabelStyle: { fontWeight: 'bold', fontSize: 13 },
    }}
  >
    {ArrayTabs.map((tab) => (
      <Tab.Screen {...tab} key={tab.key} />
    ))}
  </Tab.Navigator>
)

export default RootTab
