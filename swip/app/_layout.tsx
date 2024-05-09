import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const RootLayout = () => {
  return (
    <Stack screenOptions={{headerShown: false}}>

      <Stack.Screen name='index' />
      <Stack.Screen name='settingsView' />
      <Stack.Screen name='modelTimer' options={{presentation: 'modal'}} />
      <Stack.Screen name='category/addCategory' options={{presentation: 'modal'}} />
      <Stack.Screen name='[categoryID]' options={{presentation: 'modal'}} />
      <Stack.Screen name='player/addPlayerModal' options={{presentation: 'modal'}} />

    </Stack>
  )
}

export default RootLayout