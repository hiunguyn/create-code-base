import React from 'react'
import { View, Text, Button } from 'react-native'
import { useMutation } from 'react-query'
import Spinner from 'react-native-loading-spinner-overlay'

import { navigate } from '@/navigation/NavigationService'
import APP_ROUTER from '@/navigation/config/router'
import { useAppContext } from '@/contexts/app/app.context'
import { api } from '@/utils/axios'
import { updateContext } from '@/contexts/app/app.action'

const params = {
  email: 'hieu.nguyen@amela.vn',
  password: '123456',
}

const SignIn = () => {
  const { dispatch } = useAppContext()
  const { mutate, isLoading } = useMutation(() => api.post('/auth/sign-in', params), {
    onSuccess: async (res) => {
      dispatch(updateContext({ accessToken: res.data.accessToken }))
    },
  })
  return (
    <>
      <Spinner visible={isLoading} />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text
          style={{
            fontSize: 50,
            fontWeight: 'bold',
            marginBottom: 20,
            color: '#34495e',
          }}
        >
          Sign In
        </Text>
        <Button title="Sign In" onPress={() => mutate()} />
        <Button
          title="Go to Sign Up"
          onPress={() => {
            navigate(APP_ROUTER.AUTH.SIGN_UP)
          }}
        />
      </View>
    </>
  )
}

export default SignIn
