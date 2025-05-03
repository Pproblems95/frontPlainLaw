import { Modal, Pressable, ScrollView, StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import { base_url } from '@env'

const About = () => {
  const url = base_url
  const { about } = useLocalSearchParams()
  const [data, setData] = useState(null)
  const [title, setTitle] = useState('Contrato')
  const [text, setText] = useState([])
  const [extra, setExtra] = useState({ notes: '', registerDate: '' })
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('Cargando, por favor espera...')

  useEffect(() => {
    fetch(`${url}/api/summaries/search/${about}`)
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch(() => setErrorMessage('Error al cargar los datos.'))
  }, [])

  useEffect(() => {
    if (data && !data.error) {
      setTitle(data.body.site)
      setText(data.body.content)
      setExtra({ notes: data.body.notes, registerDate: data.body.registerDate })
      setLoading(false)
    }
  }, [data])

  if (loading) {
    return (
      <Modal visible={true} transparent animationType="fade">
        <View style={styles.loaderOverlay}>
          <View style={styles.loaderContainer}>
            <Text style={styles.loaderTitle}>AVISO</Text>
            <Text style={styles.loaderMessage}>{errorMessage}</Text>
          </View>
        </View>
      </Modal>
    )
  }

  return (
    <>
      <Stack.Screen options={{ title }} />
      <ScrollView style={styles.container}>
        {text.map((value, index) => {
          const [tipo, texto] = value.split(' - ')
          if (tipo === 'Resumen') {
            return (
              <Text key={index} style={styles.sectionText}>
                {texto}
              </Text>
            )
          } else if (tipo === 'Subtitulo') {
            return (
              <Text key={index} style={styles.sectionTitle}>
                {texto}
              </Text>
            )
          }
        })}

        <View>
          <Text style={styles.sectionTitle}>Notas</Text>
          <Text style={[styles.sectionText, {textAlign: "center"}]}>{extra.notes}</Text>
        </View>

        <View>
          <Text style={styles.sectionTitle}>Fecha</Text>
          <Text style={[styles.sectionText, { textAlign: 'center' }]}>{extra.registerDate}</Text>
        </View>
      </ScrollView>

      <View style={styles.buttonBar}>
        <Pressable style={styles.button} onPress={() => router.replace('myDocs')}>
          <Text style={styles.buttonText}>Volver al menú</Text>
        </Pressable>
      </View>
    </>
  )
}

export default About

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white'
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
    marginBottom: 12
  },
  buttonBar: {
    flexDirection: 'row',
    backgroundColor: '#000',
    paddingVertical: 12,
    justifyContent: 'center'
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: '500'
  },
  loaderOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  loaderContainer: {
    width: Dimensions.get('screen').width * 0.7,
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    gap: 10
  },
  loaderTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black'
  },
  loaderMessage: {
    fontSize: 18,
    textAlign: 'center',
    color: '#555'
  }
})
