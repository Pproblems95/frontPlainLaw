import { StyleSheet, Text, View , Pressable} from 'react-native'
import React from 'react'
import { router } from 'expo-router'

const textTranslated = () => {
  return (
    <View style={{display:'flex', justifyContent:'space-between', flex:1, }}>
      <View style={{paddingHorizontal:5, overflow:'scroll'}}>
        <Text style={{fontSize:30, textAlign:'center'}}>Aquí está tu texto traducido</Text>
        <Text style={{fontSize:20}}>Texto traducidoooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo</Text>
      </View>

      <View>
        <Text style={{fontSize:30, textAlign:'center'}}>Las partes más críticas son</Text>
        <View style={{borderRadius:20, marginHorizontal:5, backgroundColor:'black'}}>
          <Text style={{fontSize:20, color:'white', padding:10, overflow:'scroll'}}>Partes criticassssssssssssssssssssssssssssssssssssssssssss</Text>
        </View>
      </View>
      
      <View>
      <View style={{flexDirection:'row', display:'flex', backgroundColor:'black'}}>
        <Pressable   style={{flex:1, backgroundColor:'white', margin:10, borderRadius:15}} onPress={() => {
              router.navigate("lobby")
        }}>
            <Text style={{color:'black', textAlign:'center', fontSize:20, overflow:'hidden'}}>Volver al menú</Text>
        </Pressable>
        <Pressable style={{flex:1, backgroundColor:'white', margin:10, borderRadius:15, justifyContent:'center'}} >
            <Text style={{color:'black', textAlign:'center', fontSize:20, overflow:'hidden', textAlignVertical:'center'}} onPress={() => {
              router.navigate("lobby")
        }}> Firmar y agregar a mis documentos</Text>
        </Pressable>
    </View>
      </View>
    </View>
  )
}

export default textTranslated

const styles = StyleSheet.create({})