import { StyleSheet, Text, View, TextInput, ScrollView, Pressable, Modal, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import {base_url} from '@env'


const saveDocument = () => {
  const screenWidth = Dimensions.get('screen').width
  const screenHeight = Dimensions.get('screen').height
    const {data} = useLocalSearchParams()
    const postAI = JSON.parse(data)
    const url = base_url
    const [contractConfirmation, SetContractConfirmation] = useState(null)
    const [contract, SetContract] = useState({
        site: '',
        content:postAI.body,
        notes: 'Puedes añadir las notas que desees'
    })
    const [isOpen, SetOpen] = useState(false)
    const [errorMessage, SetErrorMessage] = useState('')

    useEffect(() => {
      if (contractConfirmation != null) {
        if (!contractConfirmation.error) {
          SetErrorMessage('Contrato guardado')
          router.navigate("myDocs")
        }
        else{
          SetErrorMessage('hubo un error')
          console.log(contractConfirmation)
        }
      }
    }, [contractConfirmation])
    useEffect(() => {
      if(errorMessage != '')
      SetOpen(true)
    }, [errorMessage])
  return (
    
    <>
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
        <Pressable style={{backgroundColor:'black', borderRadius:20, padding:10}}  onPress={() => {
          SetErrorMessage('')
          SetOpen(false)
        }}>
          <Text style={{color:'white', fontSize:20}}>Cerrar</Text>
        </Pressable>
      </View>
      
      
    </View>
  </View>
</Modal>
    <ScrollView>
        <View style={{ margin:10, }}>
            <Text style={{fontSize:20, textAlign:'center'}}>Nombre de la empresa</Text>
            <TextInput style={{ borderColor:'gray', borderWidth:1, fontSize:20, padding:10, borderRadius:10}} placeholder='Nombre' value={contract.site} onChangeText={(e) => {
                SetContract({
                    ...contract,
                    site: e
                })
            }} />
        </View>
        <View style={{paddingHorizontal:5, overflow:'scroll', borderWidth:1, borderColor:'gray' }}>
            <Text style={{fontSize:20, textAlign:'center'}} >Síntesis del contrato</Text>
       {postAI.body.map((value, index) => {
        const [tipo, texto] = value.split(" - ")
        if (tipo === "Resumen") {
          console.log('Resumen')
          return(
            <Text key={index} style={{fontSize:10, textAlign:'justify'}}>{texto}</Text>
          )
        }
        else if(tipo === "Subtitulo"){
          console.log('Subtitulo')
          return(
            <Text key={index} style={{fontSize:20, textAlign:'center'}}>{texto}</Text>
          )
        }
       })}
      </View>
        <View style={{ margin:10, }}>
            <Text style={{fontSize:20, textAlign:'center'}}>Notas personales</Text>
            <TextInput style={{ borderColor:'gray', borderWidth:1, fontSize:20, padding:10, borderRadius:10}} placeholder='Añade las notas que quieras' value={contract.notes} onChangeText={(e) => {
                SetContract({
                    ...contract,
                    notes: e
                })
            }}/>
        </View>
        
    </ScrollView>
    <View style={{flexDirection:'row', display:'flex', backgroundColor:'black'}}>
        <Pressable   style={{flex:1, backgroundColor:'white', margin:10, borderRadius:15, justifyContent:'center'}} onPress={() => {
        }}>
            <Text style={{color:'black', textAlign:'center', fontSize:20, overflow:'hidden'}}>Volver al menú</Text>
        </Pressable>
        <Pressable style={{flex:1, backgroundColor:'white', margin:10, borderRadius:15, justifyContent:'center'}}  onPress={() => {
            let legit = [contract.site, contract.notes].every(value => 
              typeof value === 'string' && value.trim().length >= 3
            );
            
            if(legit){
              fetch(url+'/api/summaries/sign', {
                method:'POST',
                headers:{
                    'Content-Type': 'application/json', // Indicar que el contenido es JSON
                  },
                body: JSON.stringify({
                    "site" : contract.site,
                    "content": contract.content,
                    "notes" : contract.notes
                })
              })
              .then((res) => {return res.json()})
              .then((res) => {SetContractConfirmation(res)
                console.log(res)
              })
            }
            else{
              SetErrorMessage('Por favor llena todos los campos con por lo menos 3 caracteres')
            }}}>
            <Text style={{color:'black', textAlign:'center', fontSize:20, overflow:'hidden', textAlignVertical:'center'}} > Guardar documento</Text>
        </Pressable>
    </View>
    </>
  )
}

export default saveDocument

const styles = StyleSheet.create({})