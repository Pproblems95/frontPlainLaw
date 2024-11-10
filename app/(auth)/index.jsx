import { View, Text, TextInput, Dimensions, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router } from 'expo-router'
import {base_url} from '@env'

const signIn = () => {
    const url = base_url

    
    const [credentials, SetCredentials] = useState({
        username: '',
        password: ''
    })
    const [loginFailed, SetLoginFailed] = useState(null)
    const screenWidth = Dimensions.get('screen').width
    const screenHeight = Dimensions.get('screen').height
    useEffect(() => {
        if(loginFailed != null){
            if (!loginFailed.error) {
                router.navigate("lobby")
            }
            else{console.log(loginFailed)}
        }
        else{
            console.log(loginFailed)
        }
        console.log('se ejecutó el loginfailed')
    }, [loginFailed])
    useEffect(() => {
        
    })
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

        <View style={{flexDirection:'row', display:'flex', backgroundColor:'black'}}>
            <Pressable style={{flex:1, backgroundColor:'white', margin:10, borderRadius:15}} onPress={() => {
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
            </Pressable>
            <Pressable style={{flex:1, backgroundColor:'white', margin:10, borderRadius:15, justifyContent:'center'}} onPress={() => {
                fetch(url+'/api/auth/login/', {
                    method:'POST',
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
            }}>
                <Text style={{color:'black', textAlign:'center', fontSize:20, overflow:'hidden', textAlignVertical:'center'}} >Iniciar sesión</Text>
            </Pressable>
        </View>
    </View>
  )
}

export default signIn