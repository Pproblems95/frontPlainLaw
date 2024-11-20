import { Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { UserIcon } from '../../assets/icons'
import { router, Tabs } from 'expo-router'
import { EditIcon } from '../../assets/icons'
import {base_url} from '@env'

const profile = () => {
    const [editable, SetEditable] = useState(false)
    const [data, SetData] = useState(null)
    const [loading, SetLoading] = useState(true)
    const screenWidth = Dimensions.get('screen').width
    const [errorMessage, SetErrorMessage] = useState('Cargando, por favor espera...')

    const url = base_url
    useEffect(() => {
        fetch(url+'/api/users/current', {
            method:'GET',
            headers: {
                'Content-Type': 'application/json', // Indicar que el contenido es JSON
            },
        })
        .then((res) => {return res.json()})
        .then((res) => {SetData(res)})
    }, [])
    useEffect(() => {
        if(data != null){
            if(!data.error){
                SetLoading(false)
            }
        }   
    })
    if (loading) {
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
    else if(!loading){
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
                    <Text style={{textAlign:'center', fontSize:30}}>{data.body.username}</Text>
                </View>
                <View style={{ margin:10, }}>
                    <Text style={{fontSize:20}}>Nombre</Text>
                    <TextInput style={{ borderColor: editable ? 'black' : 'gray', borderWidth: editable ? 2 : 1, fontSize:20, padding:10, borderRadius:10}} placeholder='Nombre' editable={editable}
                    value={data.body.name} onChangeText={(e) => {
                        SetData({
                            ...data,
                            body: {
                                ...data.body,
                                name: e
                            }
                        })
                    }}/>
                </View>
                <View style={{ margin:10, }}>
                    <Text style={{fontSize:20}}>Apellido paterno</Text>
                    <TextInput style={{borderColor: editable ? 'black' : 'gray', borderWidth: editable ? 2 : 1, fontSize:20, padding:10, borderRadius:10}} placeholder='*****' editable={editable}
                    value={data.body.patLastName} onChangeText={(e) => {
                        SetData({
                            ...data,
                            body: {
                                ...data.body,
                                patLastName: e
                            }
                        })
                    }}/>
                </View>
                <View style={{ margin:10, }}>
                    <Text style={{fontSize:20}}>Apellido materno</Text>
                    <TextInput style={{borderColor: editable ? 'black' : 'gray', borderWidth: editable ? 2 : 1, fontSize:20, padding:10, borderRadius:10}} placeholder='23' editable={editable}
                    value={data.body.matLastName} onChangeText={(e) => {
                        SetData({
                            ...data,
                            body: {
                                ...data.body,
                                matLastName: e
                            }
                        })
                    }}/>
                </View>
                <View style={{ margin:10, }}>
                    <Text style={{fontSize:20}}>Teléfono</Text>
                    <TextInput style={{borderColor: editable ? 'black' : 'gray', borderWidth: editable ? 2 : 1, fontSize:20, padding:10, borderRadius:10}} placeholder='Correo' editable={editable} 
                    value={data.body.phone} onChangeText={(e) => {
                        SetData({
                            ...data,
                            body: {
                                ...data.body,
                                phone: e
                            }
                        })
                    }}/>
                </View>
                
                {editable ? (
                    <Pressable style={{backgroundColor:'black', borderRadius:20, marginTop:20, alignSelf:'center'}} onPress={() => {
                        fetch(url+'/api/users/current', {
                            method:'PUT',
                            headers: {
                                'Content-Type': 'application/json', // Indicar que el contenido es JSON
                            },
                            body: JSON.stringify({
                                name: data.body.name,
                                patLastName: data.body.patLastName,
                                matLastName: data.body.matLastName,
                                phone: data.body.phone
                            })
                        })
                        .then((res) => {return res.json()})
                        .then((res) => console.log(res))
                        .finally(() => router.navigate("profile"))
                    }}>
                        <Text style={{fontSize:20, color:'white', padding:10, borderRadius:20}}>Guardar cambios</Text>
                </Pressable>) : (
                    <Pressable style={{backgroundColor:'black', borderRadius:20, marginTop:20, alignSelf:'center'}} onPress={() => {
                        fetch(url+'/api/auth/logout/', {
                            method:'DELETE',
                            headers: {
                                'Content-Type': 'application/json', // Indicar que el contenido es JSON
                            },
    
                        })
                        .then((res) => {return res.json()})
                        .then((res) => console.log(res))
                        .finally(() => {router.navigate('/')})
                    }}>
                        <Text style={{fontSize:20, color:'white', padding:10, borderRadius:20}}>Cerrar sesión</Text>
                    </Pressable>
                )}
        
        
            </ScrollView>
          )
    }
  
}

export default profile

const styles = StyleSheet.create({})