import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const RootLayout = () => {
  return (
    <Stack>
        <Stack.Screen name='index' options={{title:'PlainLaw', headerTitleStyle:{
            color:'white',
            fontSize:40,
            fontWeight:'bold'
        }, headerTitleAlign:'center', headerStyle:{backgroundColor:'black'}}}/>
        <Stack.Screen name='signUp' options={{title:'¡Regístrate!', headerTitleStyle:{
          color:'white',
          fontSize:40,
          fontWeight: 'bold',
        }, headerStyle:{backgroundColor:'black'}, headerTitleAlign:'center'}}/>
    </Stack>
  )
}

export default RootLayout

const styles = StyleSheet.create({})