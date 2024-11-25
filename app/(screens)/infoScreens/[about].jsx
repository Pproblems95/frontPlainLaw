import { Modal, Pressable, ScrollView, StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import {base_url} from '@env'


const About = () => {
    const url = base_url
    const {about} = useLocalSearchParams()
    const [data, SetData] = useState(null)
    const [title, SetTitle] = useState('Contrato')
    const [text, SetText] = useState([])
    const [extra, SetExtra] = useState({
        notes: '',
        registerDate: ''
    })
    const [loading, SetLoading] = useState(true)
    const screenWidth = Dimensions.get('screen').width
    const [errorMessage, SetErrorMessage] = useState('Cargando, por favor espera...')
    useEffect(() => {
        fetch(url+'/api/summaries/search/'+about, {
            method:'GET',
            headers: {
                'Content-Type': 'application/json', // Indicar que el contenido es JSON
            }
        })
        .then((res) => {return res.json()})
        .then((res) => SetData(res))
    }, [])
    useEffect(() => {
        if (data != null) {
            if (!data.error) {
                SetTitle(data.body.site)
                SetText(data.body.content)
                SetExtra({
                    notes: data.body.notes,
                    registerDate: data.body.registerDate
                })
                SetLoading(false)
            }
        }
    }, [data])
    if (!loading) {
        return (
    
            <ScrollView style={{paddingHorizontal:10}}>
                <Stack.Screen options={{title: title}}/>
                <View style={{paddingHorizontal:5, overflow:'scroll'}}>
               {text.map((value, index) => {
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
              <View>
              <Text style={{textAlign:'center', fontSize:25, fontWeight:'bold'}}>Notas</Text>
              <Text style={{textAlign:'justify', fontSize:20}}>{extra.notes}</Text>
        
              </View>
              <View>
                <Text style={{textAlign:'center', fontSize:25, fontWeight:'bold'}}>Fecha</Text>
                <Text style={{textAlign:'center', fontSize:20}}>{extra.registerDate}</Text>
              </View>
              <View>
                <Pressable style={{backgroundColor:'black', borderRadius:20, marginTop:20, alignSelf:'flex-end'}} onPress={() => {
                    router.navigate('lobby')
                }}>
                    <Text style={{fontSize:20, color:'white', padding:10, borderRadius:20}}>Regresar</Text>
                </Pressable>
              </View>
            </ScrollView>
          )
    }
    else if(loading){
        return(
            <Modal visible={true} transparent={true} animationType="fade">
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <View style={{ width: screenWidth*0.7,padding: 20, backgroundColor: 'white', borderRadius: 10, borderColor: 'black', borderWidth: 1, display:'flex' }}>
          <View style={{borderBottomColor:'gray', borderBottomWidth:1, display:'flex', padding:10 }}>
            <Text style={{ textAlign: 'center', color: 'black', fontSize:30, fontWeight:'bold' }}>AVISO</Text>
          </View>
          <View  style={{borderBottomColor:'gray', borderBottomWidth:1, padding:10 }}  >
            <Text style={{textAlign:'center', fontSize:20}}>{errorMessage}</Text>
          </View>
          <View style={{display:'flex', alignSelf:'flex-end', padding:10 }}>
            
          </View>
          
          
        </View>
      </View>
    </Modal>
        )
    }
  
}

export default About

const styles = StyleSheet.create({})