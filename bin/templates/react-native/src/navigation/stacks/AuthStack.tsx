import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import SignIn from '@/screens/auth/SignIn'
import SignUp from '@/screens/auth/SignUp'
import APP_ROUTER from '@/navigation/config/router'
import navigationConfigs from '@/navigation/config/options'

const Stack = createStackNavigator()

const AuthStack = () => (
  <Stack.Navigator screenOptions={navigationConfigs}>
    <Stack.Screen name={APP_ROUTER.AUTH.SIGN_IN} component={SignIn} />
    <Stack.Screen name={APP_ROUTER.AUTH.SIGN_UP} component={SignUp} />
  </Stack.Navigator>
)

export default AuthStack
