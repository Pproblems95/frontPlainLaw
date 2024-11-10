import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const _layout = () => {
  return (
   <Stack>
        <Stack.Screen name='[about]' options={{ title: 'Cargando...', headerTitleStyle:{fontSize:30, fontWeight:'bold', color:'white'},
      headerTitleAlign:'center', headerStyle:{backgroundColor:'black'}, headerBackVisible:true, headerTintColor:'white'} } />

   </Stack>
  )
}

export default _layout

const styles = StyleSheet.create({})