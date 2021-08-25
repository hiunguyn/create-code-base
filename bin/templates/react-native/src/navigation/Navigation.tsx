import React from 'react'
import Spinner from 'react-native-loading-spinner-overlay'

import AppStack from '@/navigation/stacks/AppStack'
import AuthStack from '@/navigation/stacks/AuthStack'
import { useAppContext } from '@/contexts/app/app.context'
import { api } from '@/utils/axios'
import { removeContext, updateContext } from '@/contexts/app/app.action'

const Navigation = () => {
  const { state, dispatch } = useAppContext()
  const [isloading, setLoading] = React.useState(false)

  React.useEffect(() => {
    if (!state.accessToken) return
    setLoading(true)
    api
      .get('/auth/me')
      .then(({ data: user }) => {
        dispatch(updateContext({ user }))
      })
      .catch(() => dispatch(removeContext()))
      .finally(() => setLoading(false))
  }, [state.accessToken])

  if (isloading) return <Spinner visible />

  if (!state.user?.id) return <AuthStack />

  return <AppStack />
}

export default Navigation
