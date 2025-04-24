import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { router } from 'expo-router';
import { Stack } from 'expo-router'

const ScreensLayout = () => {
  return (
    <Stack>
        <Stack.Screen name='textTranslated' options={{title:'Traductor', headerTitleStyle:{fontSize:30, fontWeight:'bold', color:'white'},
      headerTitleAlign:'center', headerStyle:{backgroundColor:'black'}, headerBackVisible:true, headerTintColor:'white'} } />
        <Stack.Screen name='imageDocument' options={{presentation: "modal", headerBackTitleVisible: true, title:'agregar Imagen', headerTitleStyle:{fontSize:20, fontWeight:'bold', color:'white',},
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.push("myDocs")}>
                <Text style={{ color: 'white', marginLeft: 15, fontSize: 16 }}>Atrás</Text>
              </TouchableOpacity>
            ),
      headerTitleAlign:'center', headerStyle:{backgroundColor:'black'}, headerBackVisible:true, headerTintColor:'white'} } />
        <Stack.Screen name='lobby' options={{presentation: "modal", headerBackTitleVisible: true, title:'agregar Imagen', headerTitleStyle:{fontSize:20, fontWeight:'bold', color:'white',},
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.push("myDocs")}>
                <Text style={{ color: 'white', marginLeft: 15, fontSize: 16 }}>Atrás</Text>
              </TouchableOpacity>
            ),
      headerTitleAlign:'center', headerStyle:{backgroundColor:'black'}, headerBackVisible:true, headerTintColor:'white'} } />
        <Stack.Screen name='saveDocument' options={{title:'Firmar documento', headerTitleStyle:{fontSize:20, fontWeight:'bold', color:'white'},
      headerTitleAlign:'center', headerStyle:{backgroundColor:'black'}, headerBackVisible:true, headerTintColor:'white'} } />
        <Stack.Screen name='infoScreens' options={{ headerShown:false,}} />
    </Stack>
  )
}

export default ScreensLayout

const styles = StyleSheet.create({})