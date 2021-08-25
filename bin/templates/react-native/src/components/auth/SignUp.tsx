import React from 'react'
import { View, Text, Button } from 'react-native'

import { navigate } from '@/navigation/NavigationService'
import APP_ROUTER from '@/navigation/config/router'

const SignUp = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text
      style={{
        fontSize: 50,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#34495e',
      }}
    >
      Sign Up
    </Text>
    <Button
      title="Go to Sign In"
      onPress={() => {
        navigate(APP_ROUTER.AUTH.SIGN_IN)
      }}
    />
  </View>
)

export default SignUp
