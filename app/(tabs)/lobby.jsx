import { Dimensions, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

const lobby = () => {
  
  const screenWidth = Dimensions.get('screen').width
  return (
    <View style={{display:'flex', flex:1, padding:5}}>
      <View style={{backgroundColor:'black', borderRadius:20, justifyContent:'space-between', flex:1, display:'flex', marginBottom:10}}> 
        <TextInput placeholder='Escribe o pega el texto a traducir aquí!' numberOfLines={4} multiline placeholderTextColor='silver' style={{textAlign:'center', color:'white' ,  fontSize:25}}/>
        <Pressable style={{backgroundColor:'white', borderRadius:20, alignSelf:'flex-end', padding:5, margin:5}} onPress={() => {
          router.navigate("textTranslated")
        }}>
          <Text style={{fontSize:20}}>Enviar texto</Text>
        </Pressable>
      </View>
      <View style={{ display:'flex', flex:1, justifyContent:'space-between', backgroundColor:'white', borderRadius:20, marginTop:10  }}>
        <Text style={{fontSize:30, textAlign:'center'}}>¿Deseas buscar alguna palabra específica?</Text>
        <TextInput style={{borderBottomColor:'black', borderBottomWidth:1, marginHorizontal:screenWidth*0.2}}/>
        <Pressable style={{alignSelf:'flex-end', padding:10, margin:10, backgroundColor:'black', borderRadius:20, marginBottom:10}}>
        <Text style={{fontSize:20, color:'white'}}>Enviar palabra</Text>
      </Pressable>
      </View>
      
    </View>
  )
}

export default lobby

const styles = StyleSheet.create({})