import React from 'react'
import { LogBox } from 'react-native'
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { QueryClient, QueryClientProvider } from 'react-query'

import '@/utils/i18next'
import { navigationRef } from '@/navigation/NavigationService'
import Navogation from '@/navigation/Navigation'
import { AppContextProvider } from '@/contexts/app/app.context'

LogBox.ignoreLogs(['Setting a timer'])
const App = () => {
  const [queryClient] = React.useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <NavigationContainer ref={navigationRef}>
          <Navogation />
        </NavigationContainer>
      </AppContextProvider>
    </QueryClientProvider>
  )
}

export default App
