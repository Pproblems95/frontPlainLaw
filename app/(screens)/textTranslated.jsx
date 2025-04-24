import { StyleSheet, Text, View , Pressable, ScrollView, DevSettings} from 'react-native'
import React, { useEffect } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import {base_url} from '@env'




const textTranslated = () => {
  let { data } = useLocalSearchParams();
  let postAI = JSON.parse(data)
  const url = base_url
  return (
    <>
    <ScrollView style={styles.container}>
      {postAI.body.map((value, index) => {
        const [tipo, texto] = value.split(" - ");
        if (tipo === "Resumen") {
          return (
            <Text key={index} style={styles.sectionText}>
              {texto}
            </Text>
          );
        } else if (tipo === "Subtitulo") {
          return (
            <Text key={index} style={styles.sectionTitle}>
              {texto}
            </Text>
          );
        }
      })}
    </ScrollView>
  
    <View style={styles.buttonBar}>
      <Pressable style={styles.button} onPress={() => router.navigate("lobby")}>
        <Text style={styles.buttonText}>Volver al menú</Text>
      </Pressable>
  
      <Pressable
        style={styles.button}
        onPress={() =>
          router.push({
            pathname: "saveDocument",
            params: { data: JSON.stringify(postAI) },
          })
        }
      >
        <Text style={styles.buttonText}>Firmar y guardar</Text>
      </Pressable>
    </View>
  </>
  
  )
}

export default textTranslated

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
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
