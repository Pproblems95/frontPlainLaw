import { StyleSheet, Text, View , Pressable, ScrollView, DevSettings} from 'react-native'
import React, { useEffect } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import {base_url} from '@env'




const textTranslated = () => {
  let { data } = useLocalSearchParams();
  let postAI = JSON.parse(data)
  const url = base_url
  return (
    <>
    <ScrollView style={{display:'flex', flex:1, }}>
      <View style={{paddingHorizontal:5, overflow:'scroll'}}>
       {postAI.body.map((value, index) => {
        const [tipo, texto] = value.split(" - ")
        if (tipo === "Resumen") {
          console.log('Resumen')
          return(
            <Text key={index} style={{fontSize:20, textAlign:'justify'}}>{texto}</Text>
          )
        }
        else if(tipo === "Subtitulo"){
          console.log('Subtitulo')
          return(
            <Text key={index} style={{fontSize:30, textAlign:'center'}}>{texto}</Text>
          )
        }
       })}
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
          router.push({
            pathname: "saveDocument",
            params: { data: JSON.stringify(postAI) }
        });
    }}> Firmar y guardar documento</Text>
    </Pressable>
    </View>
    </>
  )
}

export default textTranslated

const styles = StyleSheet.create({})