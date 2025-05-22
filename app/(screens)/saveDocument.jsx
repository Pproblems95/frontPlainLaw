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
        notes: ''
    })
    const [isOpen, SetOpen] = useState(false)
    const [errorMessage, SetErrorMessage] = useState('')

    useEffect(() => {
      if (contractConfirmation != null) {
        if (!contractConfirmation.error) {
          SetErrorMessage('Contrato guardado')
          router.replace("myDocs")
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
  
    <View style={styles.container}>
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Nombre de la empresa</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={contract.site}
          scrollEnabled={false}
          onChangeText={(e) =>
            SetContract({ ...contract, site: e })
          }
        />
      </View>
  
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Notas personales</Text>
        <TextInput
          style={styles.input}
          placeholder="Añade las notas que quieras"
          value={contract.notes}
          onChangeText={(e) =>
            SetContract({ ...contract, notes: e })
          }
        />
      </View>
  
      <Text style={styles.resumenLabel}>Síntesis del contrato</Text>
          <ScrollView style={{width: '90%', height: 300, alignSelf: 'center'}} showsVerticalScrollIndicator = {false}>
            {postAI.body.map((value, index) => {
              const [tipo, texto] = value.split(" - ");
              // if (tipo === "Resumen") {
              //   return (
              //     <Text key={index} style={styles.sectionText}>
              //       {texto}
              //     </Text>
              //   );
              // } else if (tipo === "Subtitulo") {
              //   return (
              //     <Text key={index} style={styles.sectionTitle}>
              //       {texto}
              //     </Text>
              //   );
              // }
              if(tipo === 'Subtitulo'){
                console.log('entre')
                if(!postAI.body[index+1]){
                  console.log('subtitulo detectado al final')
                  return}
                const [tipoSiguiente, textoSiguiente] = postAI.body[index+1].split(' - ')
                if(tipoSiguiente === 'Resumen'){
                  console.log('resumen detectado, imprimiendo subtitulo en teoria')
                  return (
                  <Text key={index} style={styles.sectionTitle}>
                    {texto}
                  </Text>
                );
                }
              }
              else{
                console.log('me valio verga el subtitulo')
                return (
                  <Text key={index} style={styles.sectionText}>
                    {texto}
                  </Text>)
              }
            })}
          </ScrollView>
  
    <View style={[styles.buttonBar,{alignSelf: 'flex-end'}]}>
      <Pressable style={styles.button} onPress={() => router.navigate('myDocs')}>
        <Text style={styles.buttonText}>Volver al menú</Text>
      </Pressable>
  
      <Pressable
        style={styles.button}
        onPress={() => {
          const valid = [contract.site, contract.notes].every(
            (v) => typeof v === 'string' && v.trim().length >= 3
          );
          if (valid) {
            fetch(`${url}/api/summaries/sign`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(contract),
            })
              .then((res) => res.json())
              .then((res) => {
                SetContractConfirmation(res);
                console.log(res);
              });
          } else {
            SetErrorMessage('Por favor llena todos los campos con al menos 3 caracteres');
          }
        }}
      >
        <Text style={styles.buttonText}>Guardar documento</Text>
      </Pressable>
    </View>
       <Modal visible={isOpen} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalBox}>
          <Text style={styles.modalHeader}>AVISO</Text>
          <Text style={styles.modalMessage}>{errorMessage}</Text>
          <Pressable
            style={styles.modalButton}
            onPress={() => {
              SetErrorMessage('');
              SetOpen(false);
            }}
          >
            <Text style={styles.modalButtonText}>Cerrar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
    </View>
  )
}

export default saveDocument

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    backgroundColor: '#fff',
  },
  inputGroup: {
    marginBottom: 20,
    marginRight: 20,
    marginLeft: 20
  },
  inputLabel: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    fontSize: 18,
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
  },
  resumenLabel: {
    fontSize: 22,
    textAlign: 'center',
    marginVertical: 10,
    fontWeight: 'bold',
    color: '#444',
  },
  resumenBox: {
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#f3f3f3',
    marginBottom: 20,
  },
  resumenText: {
    fontSize: 14,
    textAlign: 'justify',
    color: '#333',
    marginBottom: 8,
  },
  resumenTitle: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
    color: '#222'
  },
  sectionText: {
    fontSize: 18,
    lineHeight: 26,
    textAlign: 'justify',
    color: '#333',
    marginBottom: 12,
  },
  buttonBar: {
    flexDirection: 'row',
    backgroundColor: '#000',
    paddingVertical: 10,
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: '#fff',
    flex: 1,
    marginHorizontal: 10,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: '500'
  }
});
