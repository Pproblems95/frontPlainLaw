import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image, Pressable, TextInput, Modal, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import Icon from "react-native-vector-icons/Feather";
import * as FileSystem from 'expo-file-system';
import TakePicture from '../components/takePicture';
import modal from '../styles/modals';
import { router } from 'expo-router';

const pictureMenu = () => {
  const [sendingPhotos, setSendingPhotos] = useState([]);
  const [ocrResult, setOcrResult] = useState('');
  const [inputHeight, SetInputHeight] = useState(300);
  const [text, SetText] = useState('');
  const [cameraActive, setCameraActive] = useState(false);
  const [errorMessage, SetErrorMessage] = useState('')
  const [postAI, SetPostAI] = useState(null)
  const [isOpen, SetOpen] = useState(false)
  const [loading, SetLoading] = useState(false)
  const [sendText, SetSendText] = useState([])


  useEffect(() => {
        if(sendText != ''){
          SetLoading(true)
          console.log(sendText)
          fetch("https://equihua.org/api/summaries/ai", {
            method:'POST',
            headers:{
              'Content-Type': 'application/json', // Indicar que el contenido es JSON
            },
            body: JSON.stringify({
              "termsConditions": sendText
            })
          })
          .then((res) => {return res.json()})
          .then((res) => {SetPostAI(res)})
          .finally(() => {SetLoading(false)})
        }
      }, [sendText])
      useEffect(() => {
        console.log(sendText)
        if (postAI != null) {
          if (postAI.error === false) {
            router.push({
                pathname: "textTranslated",
                params: { data: JSON.stringify(postAI) }
            });
            
        }
        else{
          alert('Hubo un error')
          console.log(postAI)
        }
          
        }
      }, [postAI])
  useEffect(() => {
        if(errorMessage != '')
        SetOpen(true)
      }, [errorMessage])
      useEffect(() => {
        if(loading){
          SetErrorMessage('Cargando tu solicitud, por favor espera...')
        }
        
      }, [loading])

   const handleUpload = async () => {
      if (sendingPhotos.length === 0) {
        Alert.alert('Error', 'Por favor selecciona al menos una imagen.');
        return;
      }
    
      const idBase = 'img_id';
      const requestBody = {
        imgs: sendingPhotos.map((img, idx) => ({
          id: `${idBase}_${idx}`,
          data: img.data,
        })),
      };
    
      try {
        SetErrorMessage('Cargando tu solicitud, por favor espera...');
        SetLoading(true);
        SetOpen(true);
    
        const response = await fetch('https://equihua.org/api/ocr/recognize_imgs', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(requestBody),
        });
    
        const json = await response.json();
        const ocrText = requestBody.imgs.map((img, idx) => {
          const res = json.body?.imgs?.find(x => x.id === img.id);
          return res
            ? `\n${res.text}\n\n`
            : `⚠️ Imagen ${idx + 1}: No se recibió texto\n\n`;
        }).join('');
        setOcrResult(ocrText);
      } catch (error) {
        console.error('Error:', error);
        Alert.alert('Error', 'No se pudo conectar al servidor.');
      } finally {
        SetLoading(false);
        SetOpen(false);
      }
    };



  const handlePictureTaken = async (photoUri) => {
    setCameraActive(false);

    try {
      const base64 = await FileSystem.readAsStringAsync(photoUri, {
        encoding: FileSystem.EncodingType.Base64
      });

      const newPhoto = {
        id: sendingPhotos.length,
        data: base64
      };

      setSendingPhotos(prev => [...prev, newPhoto]);
    } catch (err) {
      console.error("Error al convertir imagen a base64:", err);
    }
  };

  if (cameraActive) {
    return (
      <View style={{ flex: 1 }}>
        <TakePicture onPictureTaken={handlePictureTaken} />
      </View>
    );
  }

  if (sendingPhotos.length === 0) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: 'center' }}>
        <Text style={[styles.title, { margin: 10 }]}>
          Tome una o más fotos para extraer el texto
        </Text>
        <View style={{ alignItems: "center", marginTop: 30 }}>
          <AntDesign name="camerao" size={60} color="black" style={{ marginBottom: 30 }} />
          <TouchableOpacity style={styles.buttonalone} onPress={() => setCameraActive(true)}>
            <Text style={styles.buttonText}>Toma una foto</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        horizontal
        data={sendingPhotos}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 20, borderRadius: 10 }}>
            <Image
              source={{ uri: `data:image/jpeg;base64,${item.data}` }}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
        )}
      />

      <View style={{ flexDirection: 'row', justifyContent: 'space-around',}}>
        <TouchableOpacity style={styles.buttonUpload} onPress={handleUpload}>
          <Text style={styles.buttonText2}>Extraer texto</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setCameraActive(true)}>
          <AntDesign name="camerao" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonReset} onPress={() => {setSendingPhotos([])
          setOcrResult('')
        }}>
          <Icon name="trash-2" size={30} color="#FFFF" />
        </TouchableOpacity>
      </View>

      <TextInput
        style={[
          styles.textOutput,
          {
            minHeight: 300,
            maxHeight: 300,
            height: Math.min(inputHeight, 300),
          },
        ]}
        multiline
        scrollEnabled={inputHeight > 300}
        textAlignVertical="top"
        editable={false}
        value={ocrResult}
        placeholder="Aquí aparecerá el texto extraído"
        onContentSizeChange={(e) => SetInputHeight(e.nativeEvent.contentSize.height)}
        onChangeText={(e) => SetText(e)}
      />

      <View style={{ marginTop: 16 }}>
        <Pressable style={styles.buttonUpload} onPress={() => {
                if (ocrResult.length > 0) {
                  const chunks = ocrResult.split('\n');
                  const filteredChunks = chunks.filter((value) => value.trim() !== '');
                  SetSendText(filteredChunks);
                  SetErrorMessage('Cargando tu solicitud, por favor espera...');
                  SetOpen(true)
                } else {
                  SetErrorMessage('Por favor ingresa un texto primero');
                  SetOpen(true);
                }
              }}>
          <Text style={styles.buttonText2}>Enviar texto</Text>
        </Pressable>
      </View>

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
});