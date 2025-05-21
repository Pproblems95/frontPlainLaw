import { Dimensions, Pressable, StyleSheet, Text, TextInput, View, ScrollView, Modal, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router } from 'expo-router'
import { base_url } from '@env'
import { StatusBar } from 'expo-status-bar';

const Lobby = () => {
  const url = base_url
  const [menuVisible, setMenuVisible] = useState(false)
  const [text, setText] = useState('')
  const [sendText, setSendText] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [postAI, setPostAI] = useState(null)
  const [loading, setLoading] = useState(false)
  const [isOpen, setOpen] = useState(false)

  useEffect(() => {
    if (sendText.length > 0) {
      setLoading(true)
      fetch('https://equihua.org/api/summaries/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          termsConditions: sendText
        })
      })
        .then(res => res.json())
        .then(res => setPostAI(res))
        .finally(() => setLoading(false))
    }
  }, [sendText])

  useEffect(() => {
    if (postAI) {
      console.log(postAI)
      if (!postAI.error) {
        router.push({
          pathname: "textTranslated",
          params: { data: JSON.stringify(postAI) }
        });
      } else {
        setErrorMessage('Hubo un error procesando el texto.')
      }
    }
  }, [postAI])

  useEffect(() => {
    if (errorMessage !== '') setOpen(true)
  }, [errorMessage])

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Text style={styles.title}>Resumen de Términos</Text>
          <Text style={styles.subtitle}>Pega aquí los términos y condiciones de la red social que desees analizar.</Text>

          <TextInput
            style={styles.textInput}
            placeholder="Pega el texto aquí..."
            placeholderTextColor="#aaa"
            multiline
            value={text}
            onChangeText={setText}
          />

          <Pressable
            style={styles.button}
            onPress={() => {
              if (text.trim().length > 0) {
                const chunks = text.split('\n').filter(v => v.trim() !== '')
                setSendText(chunks)
              } else {
                setErrorMessage('Por favor ingresa un texto primero.')
              }
            }}
          >
            <Text style={styles.buttonText}>Resumir texto</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>

      <Modal visible={isOpen} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Aviso</Text>
            <Text style={styles.modalMessage}>{errorMessage}</Text>
            {!loading && (
              <Pressable style={styles.modalButton} onPress={() => {
                setErrorMessage('')
                setOpen(false)
              }}>
                <Text style={styles.modalButtonText}>Cerrar</Text>
              </Pressable>
            )}
          </View>
        </View>
      </Modal>

      <Modal visible={loading} transparent animationType="fade">
        <View style={styles.loadingOverlay}>
          <View style={styles.loadingContent}>
            <ActivityIndicator size="large" color="#000" />
            <Text style={styles.loadingText}>Procesando texto, por favor espera...</Text>
          </View>
        </View>
      </Modal>
    </>
  )
}

export default Lobby

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 10
  },
  subtitle: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    marginBottom: 20
  },
  textInput: {
    color: 'black',
    fontSize: 18,
    padding: 15,
    borderRadius: 15,
    minHeight: 200,
    borderWidth: 0.5,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: "#000",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 15,
    marginTop: 10,
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
    marginBottom: 10
  },
  buttonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold'
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 20,
    width: '80%',
    alignItems: 'center'
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10
  },
  modalMessage: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20
  },
  modalButton: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 15
  },
  modalButtonText: {
    color: 'white',
    fontSize: 18
  },
  loadingOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingContent: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 20,
    alignItems: 'center'
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: '#000',
    textAlign: 'center'
  }
})
