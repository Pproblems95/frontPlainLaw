import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const ScreensLayout = () => {
  return (
    <Stack>
        <Stack.Screen name='textTranslated' options={{title:'Traductor', headerTitleStyle:{fontSize:30, fontWeight:'bold', color:'white'},
      headerTitleAlign:'center', headerStyle:{backgroundColor:'black'}, headerBackVisible:true, headerTintColor:'white'} } />
        <Stack.Screen name='saveDocument' options={{title:'Firmar documento', headerTitleStyle:{fontSize:30, fontWeight:'bold', color:'white'},
      headerTitleAlign:'center', headerStyle:{backgroundColor:'black'}, headerBackVisible:true, headerTintColor:'white'} } />
        <Stack.Screen name='infoScreens' options={{ headerShown:false,}} />
    </Stack>
  )
}

export default ScreensLayout

const styles = StyleSheet.create({})