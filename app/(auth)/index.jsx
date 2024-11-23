import { View, Text, TextInput, Dimensions, Pressable, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router } from 'expo-router'
import {base_url} from '@env'

const signIn = () => {
    const url = base_url
    const [loading, SetLoading] = useState(false)

    const [isOpen, SetOpen] = useState(false)
    const [errorMessage, SetErrorMessage] = useState('')
    const [credentials, SetCredentials] = useState({
        username: '',
        password: ''
    })
    const [loginFailed, SetLoginFailed] = useState(null)
    const screenWidth = Dimensions.get('screen').width
    const screenHeight = Dimensions.get('screen').height
    //solucion provisional para el inicio de sesion 
    useEffect(() => {
        fetch(url+'/api/auth/logout/', {
            method:'DELETE',
            credentials:'include',
            headers:{
                'Content-Type': 'application/json', // Indicar que el contenido es JSON
              },
        })
        .then((res) => {return res.json()})
        .then((res) => console.log(res))
    }, [])
    useEffect(() => {
        if(loginFailed != null){
            if (!loginFailed.error) {
                
                router.navigate("lobby")
            }
            else if(loginFailed.error){
                SetErrorMessage("Credenciales incorrectas, por favor inténtalo de nuevo")

            }
            else{
                SetErrorMessage("Hubo un error desconocido, por favor inténtalo de nuevo")
            }
            
        }
        else{
            console.log(loginFailed)
        }
        console.log('se ejecutó el loginfailed')
    }, [loginFailed])
    useEffect(() => {
        if(errorMessage != '')
            SetOpen(true)
    }, [errorMessage])
  return (
    <View style={{display:'flex', flex:1, justifyContent:'space-between'}}>
        <View style={{display:'flex', }}>
            <Text style={{textAlign:'center', fontWeight:'bold', fontSize:30}}>Inicia sesión</Text>
        </View>
        <View style={{ }}>
            <Text style={{textAlign:'center', fontSize:20}}>Correo</Text>
            <TextInput placeholder='ingrese su correo' value={credentials.username} style={{borderBottomColor:'black', borderBottomWidth:2, textAlign:'center', marginHorizontal:screenWidth*0.15}} onChangeText={(e) => {
                SetCredentials({
                    ...credentials,
                    username: e
                })
            }}/>
        </View>
        <View style={{ }}>
            <Text style={{textAlign:'center', fontSize:20}}>Contraseña</Text>
            <TextInput placeholder='ingrese su contraseña' value={credentials.password} style={{borderBottomColor:'black', borderBottomWidth:2, textAlign:'center', marginHorizontal:screenWidth*0.15}} onChangeText={(e) => {
                SetCredentials({
                    ...credentials,
                    password: e
                })
            }}/>
        </View>

        <View style={{display:'flex', justifyContent:'space-between', alignItems:'center', }}>
            <Text style={{textAlign:'center', fontWeight:'bold', fontSize:30}}>¿Eres nuevo? Regístrate</Text>
            <Pressable style={{backgroundColor:'black', borderRadius:15} } onPress={() => {
                router.navigate("signUp")
            }}>
                <Text style={{color:'white',fontSize:25, padding:10}}>Registrarse</Text>
            </Pressable>
        </View>

        <View style={{ display:'flex', backgroundColor:'black', height:screenHeight*0.1}}>
            {/* <Pressable style={{flex:1, backgroundColor:'white', margin:10, borderRadius:15}} onPress={() => {
                fetch(url+'/api/auth/logout/', {
                    method:'DELETE',
                    headers:{
                        'Content-Type': 'application/json', // Indicar que el contenido es JSON
                    }
                })
                .then((res) => {return res.json()})
                .then((res) => console.log(res))
            }} >
                <Text style={{color:'black', textAlign:'center', fontSize:20, overflow:'hidden'}}>Olvidé mi contraseña</Text>
            </Pressable> */}<Text>d</Text>
            <Pressable style={{flex:1, backgroundColor:'white', margin:10, borderRadius:15, justifyContent:'center'}} onPress={() => {
                if(credentials.password.length < 3 || credentials.username.length < 3 ){
                    SetErrorMessage('Los campos deben estar llenos con por lo menos 3 caracteres.')
                    return
                }
                SetLoading(true)
                SetErrorMessage('Cargando solicitud, por favor espera.')
                fetch('https://velazduran.com:3000/api/auth/login/', {
                    method:'POST',
                    credentials:'include',
                    headers: {
                        'Content-Type': 'application/json', // Indicar que el contenido es JSON
                    },
                    body: JSON.stringify({ 
                        "username": credentials.username,
                        "password": credentials.password
                    })
                })
                .then((res) => {return res.json()})
                .then((res) =>  {SetLoginFailed(res)
                    console.log(res)
                })
                .finally(() => {SetLoading(false)})
                .catch((error) => {
                    console.error(error)
                })
            }}>
                <Text style={{color:'black', textAlign:'center', fontSize:25, overflow:'hidden', textAlignVertical:'center'}} >Iniciar sesión</Text>
            </Pressable>
        </View>
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
    </View>
  )
}

export default signIn