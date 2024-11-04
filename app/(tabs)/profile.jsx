import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { UserIcon } from '../../assets/icons'
import { Tabs } from 'expo-router'
import { EditIcon } from '../../assets/icons'

const profile = () => {
    const [editable, SetEditable] = useState(false)
  return (
    <ScrollView>
        <Tabs.Screen options={{title:'Mi perfil', headerRight:() => (
            <Pressable style={{backgroundColor: editable ? 'white' : 'black', padding:10, borderRadius:10 }} onPress={() => {
                if(editable){
                    SetEditable(false)
                }
                else{
                    SetEditable(true)
                }
            }}>
                <EditIcon color={editable ? 'black' : 'white'} size={40}/>
            </Pressable>
        )}}/>
        <View style={{alignItems:'center', margin:10}}>
            <UserIcon size={120}/>
            <Text style={{textAlign:'center', fontSize:30}}>Username</Text>
        </View>
        <View style={{ margin:10, }}>
            <Text style={{fontSize:20}}>Nombre</Text>
            <TextInput style={{ borderColor: editable ? 'black' : 'gray', borderWidth: editable ? 2 : 1, fontSize:20, padding:10, borderRadius:10}} placeholder='Nombre' editable={editable}/>
        </View>
        <View style={{ margin:10, }}>
            <Text style={{fontSize:20}}>E-mail</Text>
            <TextInput style={{borderColor: editable ? 'black' : 'gray', borderWidth: editable ? 2 : 1, fontSize:20, padding:10, borderRadius:10}} placeholder='Correo' editable={editable}/>
        </View>
        <View style={{ margin:10, }}>
            <Text style={{fontSize:20}}>Contraseña</Text>
            <TextInput style={{borderColor: editable ? 'black' : 'gray', borderWidth: editable ? 2 : 1, fontSize:20, padding:10, borderRadius:10}} placeholder='*****' editable={editable}/>
        </View>
        <View style={{ margin:10, }}>
            <Text style={{fontSize:20}}>Contratos firmados</Text>
            <TextInput style={{borderColor: editable ? 'black' : 'gray', borderWidth: editable ? 2 : 1, fontSize:20, padding:10, borderRadius:10}} placeholder='23' editable={editable}/>
        </View>


    </ScrollView>
  )
}

export default profile

const styles = StyleSheet.create({})