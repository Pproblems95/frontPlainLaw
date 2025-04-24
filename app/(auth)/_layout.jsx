import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const RootLayout = () => {
  return (
    <Stack>
        <Stack.Screen name='index' options={{ title:'PlainLaw', headerTitleStyle:{
            color:'white',
            fontSize:15,
            fontWeight:'bold'
        }, headerTitleAlign:'center', headerStyle:{backgroundColor:'black'}, headerShown: false}}/>
        <Stack.Screen name='signUp' options={{ headerBackTitleVisible: false, title:'¡Regístrate!', headerTitleStyle:{
          color:'black',
          fontSize:15,
          fontWeight: 'bold',
        }, headerStyle:{backgroundColor:'white'}, headerTitleAlign:'center'}}/>
    </Stack>
  )
}

export default RootLayout

const styles = StyleSheet.create({})