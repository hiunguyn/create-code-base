import React from 'react'
import { View, Text, Button } from 'react-native'
import { useQuery } from 'react-query'

import { navigate } from '@/navigation/NavigationService'
import APP_ROUTER from '@/navigation/config/router'
import { api } from '@/utils/axios'

const About = () => {
  const { data } = useQuery('user', async () => {
    const res = await api.get('/auth/me')
    return res.data
  })

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text
        style={{
          fontSize: 25,
          fontWeight: 'bold',
          color: '#34495e',
        }}
      >
        ID: {data?.id}
      </Text>
      <Text
        style={{
          fontSize: 25,
          fontWeight: 'bold',
          marginBottom: 20,
          color: '#34495e',
        }}
      >
        Name: {data?.fullName}
      </Text>
      <Button
        title="Go to Home"
        onPress={() => {
          navigate(APP_ROUTER.APP.HOME.ROOT)
        }}
      />
    </View>
  )
}

export default About
