import { View, Text, TextInput, Dimensions, Pressable, Modal, StatusBar, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router } from 'expo-router'
import styles from '../styles'
import modal from '../styles/modals'
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

                router.replace("myDocs")
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
    <View style={{display:'flex', flex:1, justifyContent:'space-around'}}>
        <View style = {{alignItems: "center"}}><Image style = {styles.logo} source={require('../../assets/rayo.jpg')}></Image></View>
        <View style={{ }}>
            <View style={{display:'flex', }}>
                <Text style={styles.homeText}>Inicia Sesión en PlanLaw</Text>
            </View>
            <TextInput placeholder=' Nombre de Usuario*' value={credentials.username} style={styles.input} onChangeText={(e) => {
                SetCredentials({
                    ...credentials,
                    username: e
                })
            }}/>
            <TextInput placeholder=' Contraseña*' value={credentials.password} secureTextEntry style={styles.input} onChangeText={(e) => {
                SetCredentials({
                    ...credentials,
                    password: e
                })
            }}/>
        </View>
        <View style={{ height:screenHeight*0.08, alignItems: "center"}}>
            <Pressable style={styles.button} onPress={() => {
                if(credentials.password.length < 3 || credentials.username.length < 3 ){
                    SetErrorMessage('Los campos deben estar llenos con por lo menos 3 caracteres.')
                    return
                }
                SetLoading(true)
                SetErrorMessage('Cargando solicitud, por favor espera.')
                fetch( url + '/api/auth/login/', {
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
                <Text style={styles.ButtonText} >Iniciar sesión</Text>
            </Pressable>
            <View style={{ flexDirection: "row"}}>
            <Text style={{color: "black"}}>¿Nuevo en PlainLaw?</Text>
            <Pressable onPress={() => router.navigate("signUp")}>
                <Text style={{color: "black", fontWeight: "bold"}}> Registrate Aquí</Text>
            </Pressable>
            </View>
        </View>
        {/*
        <View style={{ display:'flex', backgroundColor:'black', height:screenHeight*0.1}}>
            {<Pressable style={{flex:1, backgroundColor:'white', margin:10, borderRadius:15}} onPress={() => {
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
            </Pressable>}<Text>d</Text>
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
        */}
        <Modal visible={isOpen} transparent={true} animationType="fade">
  <View style={modal.modalOverlay}>
    <View style={modal.modalContent}>
      <View>
        <Text style={modal.modalTitle}>AVISO</Text>
      </View>
      <View>
        <Text style={modal.modalMessage}>{errorMessage}</Text>
      </View>
      <View>
        {!loading && (
          <Pressable style={modal.modalButton}  onPress={() => {
            SetErrorMessage('')
            SetOpen(false)
          }}>
            <Text style={modal.modalButtonText}>Cerrar</Text>
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