import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'

const TabsLayout = () => {
  return (
    <Tabs>
        <Tabs.Screen name='lobby' options={{title:'¡Bienvenido!', headerTitleStyle:{fontSize:30, fontWeight:'bold', color:'white'},
      headerTitleAlign:'center', headerStyle:{backgroundColor:'black'}}} />
    </Tabs>
  )
}

export default TabsLayout

const styles = StyleSheet.create({})