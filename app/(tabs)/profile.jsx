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
            <ScrollView contentContainerStyle={styles.container}>
                <Tabs.Screen options={{
                    title: 'Mi perfil',
                    headerRight: () => (
                    <Pressable
                        style={{
                        backgroundColor: editable ? 'white' : 'black',
                        padding: 10,
                        borderRadius: 10,
                        marginRight: 10
                        }}
                        onPress={() => SetEditable(!editable)}
                    >
                        <EditIcon color={editable ? 'black' : 'white'} size={40} />
                    </Pressable>
                    )
                }} />

                <View style={styles.center}>
                    <UserIcon size={120} />
                    <Text style={styles.username}>{data.body.username}</Text>
                </View>

                {[
                    { label: 'Nombre', key: 'name' },
                    { label: 'Apellido paterno', key: 'patLastName' },
                    { label: 'Apellido materno', key: 'matLastName' },
                    { label: 'Teléfono', key: 'phone' }
                ].map(({ label, key }) => (
                    <View key={key} style={styles.inputContainer}>
                    <Text style={styles.label}>{label}</Text>
                    <TextInput
                        style={[
                        styles.input,
                        editable && styles.inputEditable
                        ]}
                        editable={editable}
                        value={data.body[key]}
                        onChangeText={(text) =>
                        SetData({
                            ...data,
                            body: { ...data.body, [key]: text }
                        })
                        }
                        placeholder={label}
                    />
                    </View>
                ))}

                <Pressable
                    style={styles.button}
                    onPress={() => {
                    if (editable) {
                        fetch(url + '/api/users/current', {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            name: data.body.name,
                            patLastName: data.body.patLastName,
                            matLastName: data.body.matLastName,
                            phone: data.body.phone
                        })
                        })
                        .then(res => res.json())
                        .then(res => console.log(res))
                        .finally(() => router.navigate('profile'));
                    } else {
                        fetch(url + '/api/auth/logout/', {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                        })
                        .then(res => res.json())
                        .then(res => console.log(res))
                        .finally(() => router.navigate('/'));
                    }
                    }}
                >
                    <Text style={styles.buttonText}>
                    {editable ? 'Guardar cambios' : 'Cerrar sesión'}
                    </Text>
                </Pressable>
                </ScrollView>

          )
    }
  
}

export default profile

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white'
  },
  center: {
    alignItems: 'center',
    marginVertical: 16
  },
  username: {
    fontSize: 26,
    fontWeight: '600',
    color: '#1a1a1a'
  },
  label: {
    fontSize: 18,
    color: '#333',
    marginBottom: 6
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 18,
    padding: 12,
    backgroundColor: '#f9f9f9'
  },
  inputEditable: {
    borderColor: '#1a1a1a',
    backgroundColor: '#fff'
  },
  inputContainer: {
    marginBottom: 20
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    alignSelf: 'center',
    marginTop: 24
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  }
});

  