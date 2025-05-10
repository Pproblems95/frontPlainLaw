import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, {useEffect, useState} from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router, useLocalSearchParams } from 'expo-router';
import * as FileSystem from 'expo-file-system'

const pictureMenu = () => {
  const [sendingPhotos, setSendingPhotos] = useState([]);
  const { photoUri } = useLocalSearchParams();
  const [base64Image, setBase64Image] = useState(null)


  useEffect(() => {
    console.log(photoUri + 'que show')
    const convertToBase64 = async() => {
     if (!photoUri) return;
    try{
      const base64 = await FileSystem.readAsStringAsync(photoUri, {
        encoding: FileSystem.EncodingType.Base64 
      })
      setBase64Image(base64)
    } catch(err) {
      console.error(err)
    }}
    convertToBase64()
    }, [photoUri]);

    useEffect(() => {
      if(base64Image===null){
        return
      }
      setSendingPhotos(prev => [...prev, {id: sendingPhotos.length, data: base64Image}])
    }, [base64Image])

    useEffect(() => {
      console.log(photoUri)
      console.log(sendingPhotos.length)
    }, [sendingPhotos])

  if (sendingPhotos.length === 0) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: 'center' }}>
        <Text style={[styles.title, { margin: 10 }]}>
          Seleccione una o más imágenes para extraer el texto
        </Text>
        <View style={{ alignItems: "center", marginTop: 30 }}>
          <AntDesign name="camerao" size={60} color="black" style={{ marginBottom: 30 }} />
          <TouchableOpacity style={styles.buttonalone} onPress={() => { router.replace('takePicture') }} >
            <Text style={styles.buttonText}>Toma una foto</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View>
      <Text>{sendingPhotos.length}</Text>
    </View>
  );
};

export default pictureMenu;


const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
    alignContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  previewContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  image: {
    width: 280,
    height: 200,
    resizeMode: 'contain',
    borderRadius: 12,
    marginBottom: 15,
    borderColor: '#ddd',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  textOutput: {
    width: '100%',
    minHeight: 150,
    padding: 12,
    borderColor: '#bbb',
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 16,
    backgroundColor: '#f8f8f8',
    marginTop: 15,
    marginBottom: 10,
  },
  buttonalone:{
    backgroundColor: "#FFFF",
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "black",
    paddingHorizontal: 32,
    borderRadius: 15,
    width: "70%",
    height: "40%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10
  },
  button: {
    backgroundColor: "#FFFF",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 15,
    width: "15%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonUpload: {
    backgroundColor: '#000',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonReset: {
    backgroundColor: "#dc3545",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 15,
    width: "15%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonAloneText: {
    color: '#000',
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonText: {
    color: '#000',
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonText2: {
    color: '#FFFF',
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  previewScroll: {
    marginVertical: 20,
    maxHeight: 210,
  },
  
  imageHorizontal: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    borderRadius: 12,
    marginRight: 15,
    borderColor: '#ddd',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  regresar: {
    alignSelf: "flex-start",

  }
});