import React from 'react'
import { View, Text, Button } from 'react-native'
import { useTranslation } from 'react-i18next'

import { navigate } from '@/navigation/NavigationService'
import APP_ROUTER from '@/navigation/config/router'

const Home = () => {
  const { t } = useTranslation()

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text
        style={{
          fontSize: 50,
          fontWeight: 'bold',
          marginBottom: 20,
          color: '#34495e',
        }}
      >
        {t('home')}
      </Text>
      <Button
        title="Go to about"
        onPress={() => {
          navigate(APP_ROUTER.APP.HOME.ABOUT)
        }}
      />
    </View>
  )
}

export default Home
