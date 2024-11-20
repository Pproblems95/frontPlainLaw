import { ScrollView, StyleSheet, Text, View, Pressable, Modal, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import {base_url} from '@env'
import { router } from 'expo-router'

const myDocs = () => {
    const url = base_url
    const [data, SetData] = useState(null)
    const [contracts, SetContracts] = useState([])
    const [loading, SetLoading] = useState(true)
    const [errorMessage, SetErrorMessage] = useState('Cargando, por favor espera...')
    const screenWidth = Dimensions.get('screen').width
    useEffect(() => {
        fetch(url+'/api/summaries/all/1', {
            method:'GET',
            headers: {
                'Content-Type': 'application/json', // Indicar que el contenido es JSON
            },
        })
        .then((res) => {return res.json()})
        .then((res) => {SetData(res)})
    }, [])

    useEffect(() => {
        if (data != null) {
            if (!data.error) {
                SetContracts(data.body.summaries)
                SetLoading(false)
            }
            else{
                alert('hubo un error')
            }
        }
    }, [data])
 
  if (!loading) {
    return (
        <ScrollView>
            {contracts.map((item) => (
        <Pressable 
            key={item.id} 
            onPress={() => {
                router.navigate("infoScreens/"+item.id)
            }}
            style={{}}
        >
            <View style={{backgroundColor:'black', margin:10, borderRadius:10}}>
                <Text style={{fontSize:30, textAlign:'center', color:'white'}}>{item.site}</Text>
                <Text style={{fontSize:20, textAlign:'center', color:'white'}} >Firmado el </Text>
                <Text style={{fontSize:20, textAlign:'center', color:'white'}} >{item.registerDate}</Text>
            </View>
        </Pressable>
    ))}
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

export default myDocs

const styles = StyleSheet.create({})