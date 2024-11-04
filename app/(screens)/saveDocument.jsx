import { StyleSheet, Text, View, TextInput, ScrollView, Pressable } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

const saveDocument = () => {
  return (
    <>
    <ScrollView>
        <View style={{ margin:10, }}>
            <Text style={{fontSize:20, textAlign:'center'}}>Nombre de la empresa</Text>
            <TextInput style={{ borderColor:'gray', borderWidth:1, fontSize:20, padding:10, borderRadius:10}} placeholder='Nombre' />
        </View>
        <View style={{ margin:10, }}>
            <Text style={{fontSize:20, textAlign:'center'}}>Síntesis del contrato</Text>
            <TextInput style={{ borderColor:'gray', borderWidth:1, fontSize:20, padding:10, borderRadius:10}} placeholder='Nombre' multiline editable={false}/>
        </View>
        <View style={{ margin:10, }}>
            <Text style={{fontSize:20, textAlign:'center'}}>Partes críticas</Text>
            <TextInput style={{ borderColor:'gray', borderWidth:1, fontSize:20, padding:10, borderRadius:10}} placeholder='Nombre' multiline editable={false}/>
        </View>
        <View style={{ margin:10, }}>
            <Text style={{fontSize:20, textAlign:'center'}}>Notas personales</Text>
            <TextInput style={{ borderColor:'gray', borderWidth:1, fontSize:20, padding:10, borderRadius:10}} placeholder='Nombre' />
        </View>
        
    </ScrollView>
    <View style={{flexDirection:'row', display:'flex', backgroundColor:'black'}}>
        <Pressable   style={{flex:1, backgroundColor:'white', margin:10, borderRadius:15, justifyContent:'center'}} onPress={() => {
              router.navigate("lobby")
        }}>
            <Text style={{color:'black', textAlign:'center', fontSize:20, overflow:'hidden'}}>Volver al menú</Text>
        </Pressable>
        <Pressable style={{flex:1, backgroundColor:'white', margin:10, borderRadius:15, justifyContent:'center'}} >
            <Text style={{color:'black', textAlign:'center', fontSize:20, overflow:'hidden', textAlignVertical:'center'}} onPress={() => {
              router.navigate("lobby")
        }}> Guardar documento</Text>
        </Pressable>
    </View>
    </>
  )
}

export default saveDocument

const styles = StyleSheet.create({})