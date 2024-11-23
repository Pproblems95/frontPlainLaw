import { View, Text, TextInput, Dimensions, Pressable, ScrollView, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router } from 'expo-router'
import {base_url} from '@env'

const signUp = () => {
    const url = base_url
  const [credentials, SetCredentials] = useState({
    username: '',
    password: '',
    name: '',
    patLastName:'',
    matLastName:'',
    phone:''
})
    const [registered, SetRegistered] = useState(null) 
    useEffect(() => {
        if(registered != null){
            if(!registered.error){
                alert('Usuario registrado correctamente')
                router.navigate('index')
                // fetch(url+'/api/auth/login/', {
                //     method:'POST',
                //     headers: {
                //         'Content-Type': 'application/json', // Indicar que el contenido es JSON
                //     },
                //     body: JSON.stringify({ 
                //         "username": credentials.username,
                //         "password": credentials.password
                //     })
                // })
                // .then((res) => {return res.json()})
                // .then((res) =>  {
                //     console.log(res)
                // })
                // .finally(() => {router.navigate('index')})
            }
            else{
                alert('Hubo un error, por favor inténtalo de nuevo')
            }
            console.log(registered)
        }
    }, [registered])
const screenWidth = Dimensions.get('screen').width
const screenHeight = Dimensions.get('screen').height
return (
    <>
    


<ScrollView style={{flex:1, display:'flex'}}>
<View style={{paddingVertical:10}}>
    <View style={{display:'flex',  justifyContent:'space-between'}}>
        <Text style={{textAlign:'center', fontWeight:'bold', fontSize:30}}>Introduce tus datos</Text>
    </View>
    <View style={styles.container}>
        <Text style={{textAlign:'center', fontSize:20}}>Nombre</Text>
        <TextInput placeholder='ingresa tu nombre' value={credentials.name} style={{borderBottomColor:'black', borderBottomWidth:2, textAlign:'center', marginHorizontal:screenWidth*0.15}} onChangeText={(e) => {
            SetCredentials({
                ...credentials,
                name: e
            })
        }}/>
    </View>
    <View style={styles.container}>
        <Text style={{textAlign:'center', fontSize:20}}>Apellido paterno</Text>
        <TextInput placeholder='ingresa tu apellido' value={credentials.patLastName} style={{borderBottomColor:'black', borderBottomWidth:2, textAlign:'center', marginHorizontal:screenWidth*0.15}} onChangeText={(e) => {
            SetCredentials({
                ...credentials,
                patLastName: e
            })
        }}/>
       
    </View>
    <View style={styles.container}>
        <Text style={{textAlign:'center', fontSize:20}}>Apellido materno</Text>
        <TextInput placeholder='ingresa tu apellido' value={credentials.matLastName} style={{borderBottomColor:'black', borderBottomWidth:2, textAlign:'center', marginHorizontal:screenWidth*0.15}} onChangeText={(e) => {
            SetCredentials({
                ...credentials,
                matLastName: e
            })
        }}/>
    </View>
    <View style={styles.container}>
        <Text style={{textAlign:'center', fontSize:20}}>Nombre de usuario</Text>
        <TextInput placeholder='ingresa tu nombre de usuario deseado' value={credentials.username} style={{borderBottomColor:'black', borderBottomWidth:2, textAlign:'center', marginHorizontal:screenWidth*0.15}} onChangeText={(e) => {
            SetCredentials({
                ...credentials,
                username: e
            })
        }}/>
    </View>
    <View style={styles.container}>
        <Text style={{textAlign:'center', fontSize:20}}>Contraseña</Text>
        <TextInput placeholder='ingresa tu contraseña' value={credentials.password} style={{borderBottomColor:'black', borderBottomWidth:2, textAlign:'center', marginHorizontal:screenWidth*0.15}} onChangeText={(e) => {
            SetCredentials({
                ...credentials,
                password: e
            })
        }}/>
    </View>
    
    
    <View style={styles.container}>
        <Text style={{textAlign:'center', fontSize:20}}>Teléfono</Text>
        <TextInput placeholder='ingresa tu contraseña' value={credentials.phone} style={{borderBottomColor:'black', borderBottomWidth:2, textAlign:'center', marginHorizontal:screenWidth*0.15}} keyboardType='numeric' onChangeText={(e) => {
            SetCredentials({
                ...credentials,
                phone: e
            })
        }}/>
    </View>

    <View style={{display:'flex', justifyContent:'space-between', alignItems:'center', }}>
        <Text style={{textAlign:'center', fontWeight:'bold', fontSize:30}}>¿Todo listo? </Text>
        <Pressable style={{backgroundColor:'black', borderRadius:15}}  onPress={() => {
            const valid = Object.values(credentials).every((value) => value.trim().length >= 3)
            if(!valid){
                alert('Por favor, llena todos los campos con por lo menos 3 caracteres')
                return;
            }
            fetch(url+'/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Indicar que el contenido es JSON
                },
                body: JSON.stringify({
                    username: credentials.username,
                    password: credentials.password,
                    name: credentials.name,
                    patLastName:credentials.patLastName,
                    matLastName:credentials.matLastName,
                    phone:credentials.phone
                })
            })
            .then((res) => {return res.json()})
            .then((res) => {SetRegistered(res)})

        }}>
            <Text style={{color:'white',fontSize:25, padding:10}}>Registrar cuenta</Text>
        </Pressable>
    </View>
</View>
    
</ScrollView>
<View style={{flexDirection:'row', display:'flex', backgroundColor:'black', }}>
        <Pressable style={{flex:1, backgroundColor:'white', margin:10, borderRadius:15}}  >
            <Text style={{color:'black', textAlign:'center', fontSize:20, overflow:'hidden'}}>Olvidé mi contraseña</Text>
        </Pressable>
        <Pressable style={{flex:1, backgroundColor:'white', margin:10, borderRadius:15, justifyContent:'center'}} >
            <Text style={{color:'black', textAlign:'center', fontSize:20, overflow:'hidden', textAlignVertical:'center'}} onPress={() => {
            router.navigate("/")
        }}>Ya tengo cuenta</Text>
        </Pressable>
    </View>
</>
)

}

export default signUp

const styles = StyleSheet.create({container: {
    paddingVertical:25
}})