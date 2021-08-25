import React from 'react'
import { View } from 'react-native'

type LayoutProps = {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => <View style={{ flex: 1 }}>{children}</View>

export default Layout
