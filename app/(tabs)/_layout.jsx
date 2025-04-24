import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { HomeIcon, UserIcon, DocumentIcon } from '../../assets/icons'

const TabsLayout = () => {
  return (
    <Tabs screenOptions={{
      tabBarStyle:{backgroundColor:'black', },
      tabBarActiveBackgroundColor:'white',
      tabBarActiveTintColor:'black',
      tabBarInactiveTintColor:'white',
      tabBarLabelStyle:{
        fontSize:15
      }
    }}>
        <Tabs.Screen name='myDocs' options={{title:'Mis documentos', tabBarIcon: ({color}) => <DocumentIcon color={color} /> , headerTitleStyle:{fontSize:20, fontWeight:'bold', color:'white'},
      headerTitleAlign:'center', headerStyle:{backgroundColor:'black'}}} />
      <Tabs.Screen name='profile' options={{title:'Mi perfil', tabBarIcon: ({color}) => <UserIcon color={color}/> , headerTitleStyle:{fontSize:20, fontWeight:'bold', color:'white'},
      headerTitleAlign:'center', headerStyle:{backgroundColor:'black'}}} />
    </Tabs>
  )
}

export default TabsLayout

const styles = StyleSheet.create({})