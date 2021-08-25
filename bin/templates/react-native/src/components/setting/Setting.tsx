import React from 'react'
import { View, Text, Button } from 'react-native'
import { useQueryClient } from 'react-query'

import { useAppContext } from '@/contexts/app/app.context'
import { removeContext } from '@/contexts/app/app.action'

const Setting = () => {
  const { state, dispatch } = useAppContext()
  const queryClient = useQueryClient()

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Token: {state.accessToken}</Text>
      <Button
        title="Logout"
        onPress={() => {
          dispatch(removeContext())
          queryClient.getQueryCache().clear()
        }}
      />
    </View>
  )
}

export default Setting
