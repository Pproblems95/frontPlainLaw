import { View, Text, TextInput, Dimensions, Pressable } from 'react-native'
import React, { useState } from 'react'
import { router } from 'expo-router'

const signUp = () => {
  const [credentials, SetCredentials] = useState({
    user: '',
    password: '',
    email: ''
})
const screenWidth = Dimensions.get('screen').width
const screenHeight = Dimensions.get('screen').height
return (
<View style={{display:'flex', flex:1, justifyContent:'space-between'}}>
    <View style={{display:'flex', }}>
        <Text style={{textAlign:'center', fontWeight:'bold', fontSize:30}}>Introduce tus datos</Text>
    </View>
    <View style={{ }}>
        <Text style={{textAlign:'center', fontSize:20}}>Usuario</Text>
        <TextInput placeholder='ingresa tu nombre de usuario' value={credentials.user} style={{borderBottomColor:'black', borderBottomWidth:2, textAlign:'center', marginHorizontal:screenWidth*0.15}} onChangeText={(e) => {
            SetCredentials({
                ...credentials,
                user: e
            })
        }}/>
    </View>
    <View style={{ }}>
        <Text style={{textAlign:'center', fontSize:20}}>Correo</Text>
        <TextInput placeholder='ingresa tu correo' value={credentials.user} style={{borderBottomColor:'black', borderBottomWidth:2, textAlign:'center', marginHorizontal:screenWidth*0.15}} onChangeText={(e) => {
            SetCredentials({
                ...credentials,
                email: e
            })
        }}/>
    </View>
    <View style={{ }}>
        <Text style={{textAlign:'center', fontSize:20}}>Contraseña</Text>
        <TextInput placeholder='ingrea tu contraseña' value={credentials.password} style={{borderBottomColor:'black', borderBottomWidth:2, textAlign:'center', marginHorizontal:screenWidth*0.15}} onChangeText={(e) => {
            SetCredentials({
                ...credentials,
                password: e
            })
        }}/>
    </View>

    <View style={{display:'flex', justifyContent:'space-between', alignItems:'center', }}>
        <Text style={{textAlign:'center', fontWeight:'bold', fontSize:30}}>¿Todo listo? </Text>
        <Pressable style={{backgroundColor:'black', borderRadius:15}} >
            <Text style={{color:'white',fontSize:25, padding:10}}>Registrar cuenta</Text>
        </Pressable>
    </View>

    <View style={{flexDirection:'row', display:'flex', backgroundColor:'black'}}>
        <Pressable style={{flex:1, backgroundColor:'white', margin:10, borderRadius:15}}  >
            <Text style={{color:'black', textAlign:'center', fontSize:20, overflow:'hidden'}}>Olvidé mi contraseña</Text>
        </Pressable>
        <Pressable style={{flex:1, backgroundColor:'white', margin:10, borderRadius:15, justifyContent:'center'}} >
            <Text style={{color:'black', textAlign:'center', fontSize:20, overflow:'hidden', textAlignVertical:'center'}} onPress={() => {
            router.navigate("/")
        }}>Iniciar sesión</Text>
        </Pressable>
    </View>
</View>
)
}

export default signUp

