import { Dimensions, Pressable, StyleSheet, Text, TextInput, View, ScrollView, Modal, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router } from 'expo-router'
import {base_url} from '@env'


const lobby = () => {
  const url = base_url
  const [text, SetText] = useState('')
  const [sendText, SetSendText] = useState([])
  const [word, SetWord] = useState('')
  const [sendWord, SetWordSend] = useState('')
  const [isOpen, SetOpen] = useState(false)
  const [errorMessage, SetErrorMessage] = useState('')
  const [postAI, SetPostAI] = useState(null)
  const [loading, SetLoading] = useState(false)
  const [inputHeight, SetInputHeight] = useState(300)
  const screenWidth = Dimensions.get('screen').width
  const screenHeight = Dimensions.get('screen').height
  useEffect(() => {
    if(sendText != ''){
      SetLoading(true)
      console.log(sendText)
      fetch(url+'/api/summaries/ai', {
        method:'POST',
        headers:{
          'Content-Type': 'application/json', // Indicar que el contenido es JSON
        },
        body: JSON.stringify({
          "termsConditions": sendText
        })
      })
      .then((res) => {return res.json()})
      .then((res) => {SetPostAI(res)})
      .finally(() => {SetLoading(false)})
    }
  }, [sendText])
  useEffect(() => {
    console.log(sendText)
    if (postAI != null) {
      if (postAI.error === false) {
        router.push({
            pathname: "textTranslated",
            params: { data: JSON.stringify(postAI) }
        });
        
    }
    else{
      alert('Hubo un error')
      console.log(postAI)
    }
      
    }
  }, [postAI])
  useEffect(() => {
    if(errorMessage != '')
    SetOpen(true)
  }, [errorMessage])
  useEffect(() => {
    if(loading){
      SetErrorMessage('Cargando tu solicitud, por favor espera...')
    }
    
  }, [loading])
  return (
    <>
    <ScrollView style={{display:'flex', padding:5}}>
      <View style={{backgroundColor:'black', borderRadius:20, justifyContent:'space-between', flex:1, display:'flex', marginBottom:10}}> 
        <TextInput placeholder='Escribe o pega el texto a traducir aquí!' multiline placeholderTextColor='silver' onContentSizeChange={(event) => {
          SetInputHeight(event.nativeEvent.contentSize.height)
        }} style={{textAlign:'center', color:'white' , height:Math.max(300, inputHeight), fontSize:25}}
        value={text} onChangeText={(e) => {
          SetText(e)
        }}/>
        <Pressable style={{backgroundColor:'white', borderRadius:20, alignSelf:'flex-end', padding:5, margin:5}} onPress={() => {
          if(text.length > 0){
            const chunks = text.split('\n')
            const filteredChunks = chunks.filter((value) => value.trim() !== '')
            SetSendText(filteredChunks)
            
          }
          else{
            SetErrorMessage('Por favor ingresa un texto primero')
          }
          
        }}>
          <Text style={{fontSize:20}}>Enviar texto</Text>
        </Pressable>
      </View>
      {/* <View style={{ display:'flex',  justifyContent:'space-between', backgroundColor:'white', borderRadius:20, marginTop:10  }}>
        <Text style={{fontSize:30, textAlign:'center'}}>¿Deseas buscar alguna palabra específica?</Text>
        <TextInput style={{borderBottomColor:'black', borderBottomWidth:1, marginHorizontal:screenWidth*0.2}} value={word} onChangeText={(e) => {
          SetWord(e)
        }}/>
        <Pressable style={{alignSelf:'flex-end', padding:10, margin:10, backgroundColor:'black', borderRadius:20, marginBottom:10}} onPress={() => {
          if(word.length > 0 && !word.includes(' ')){
            SetSendText(word)
            router.navigate("textTranslated")
          }
          else{
            SetErrorMessage('Favor de ingresar una única palabra')
          }
        }}>
        <Text style={{fontSize:20, color:'white'}}>Enviar palabra</Text>
      </Pressable>
      </View> */}
      
    </ScrollView>
    <Modal visible={isOpen} transparent={true} animationType="fade">
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
    <View style={{ width: screenWidth*0.7,padding: 20, backgroundColor: 'white', borderRadius: 10, borderColor: 'black', borderWidth: 1, display:'flex' }}>
      <View style={{borderBottomColor:'gray', borderBottomWidth:1, display:'flex', padding:10 }}>
        <Text style={{ textAlign: 'center', color: 'black', fontSize:30, fontWeight:'bold' }}>AVISO</Text>
      </View>
      <View  style={{borderBottomColor:'gray', borderBottomWidth:1, padding:10 }}  >
        <Text style={{textAlign:'center', fontSize:20}}>{errorMessage}</Text>
      </View>
      <View style={{display:'flex', alignSelf:'flex-end', padding:10 }}>
        {!loading && (
          <Pressable style={{backgroundColor:'black', borderRadius:20, padding:10}}  onPress={() => {
            SetErrorMessage('')
            SetOpen(false)
          }}>
            <Text style={{color:'white', fontSize:20}}>Cerrar</Text>
          </Pressable>
        )}
        
      </View>
      
      
    </View>
  </View>
</Modal>
    </>
  )
}

export default lobby

const styles = StyleSheet.create({})