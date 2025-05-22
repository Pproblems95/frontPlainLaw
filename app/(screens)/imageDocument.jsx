import React, { useState, useEffect } from 'react';
import {Dimensions, Modal,Pressable,View,Text,TouchableOpacity,Image,TextInput,StyleSheet,ScrollView,Alert, ActivityIndicator} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import Icon from "react-native-vector-icons/Feather";
import {base_url} from '@env'
import { KeyboardAvoidingView, Platform } from 'react-native';
// Asegúrate de que esta importación sea correcta y que contenga los estilos de los modales
// import modal from '../styles/modals'; // Si 'modal' es tu archivo de estilos, asegúrate de que exporte los estilos necesarios.


const UploadImage = () => {
  const [images, setImages] = useState([]);
  const [ocrResult, setOcrResult] = useState('');
  const url = base_url
    const [menuVisible,setMenuVisible] = useState(false)
    const [text, SetText] = useState('')
    const [sendText, SetSendText] = useState([])
    const [word, SetWord] = useState('')
    const [sendWord, SetWordSend] = useState('')
    const [isOpen, SetOpen] = useState(false)
    const [errorMessage, SetErrorMessage] = useState('')
    const [postAI, SetPostAI] = useState(null)
    const [loading, SetLoading] = useState(false)
    const [inputHeight, SetInputHeight] = useState(300)
    const screenWidth = Dimensions.get('screen').width
    const screenHeight = Dimensions.get('screen').height
    useEffect(() => {
      if(sendText != ''){
        SetLoading(true)
        console.log(sendText)
        fetch(url+'/api/summaries/ai', {
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
      } else {
        SetErrorMessage('Hubo un error al procesar el texto');
        SetOpen(true);
        console.log(postAI);
      }
    }


    }, [postAI])
    useEffect(() => {
      if(errorMessage != '')
      SetOpen(true)
    }, [errorMessage])
    useEffect(() => {
      // Esta lógica se solapa con el manejo de errores del OCR y la API. 
      // Si `loading` se activa solo para la API, la "Cargando tu solicitud..."
      // para el OCR se manejará en `handleUpload`.
      // Si quieres un mensaje de carga general, podrías manejarlo de otra manera.
      // Por ahora, lo dejo como está en tu código original.
      if(loading){
        SetErrorMessage('Cargando tu solicitud, por favor espera...')
      }
      
    }, [loading])

  const selectImages = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      base64: true,
      allowsMultipleSelection: true,
      quality: 0.5,
    });

    if (!result.canceled) {
      const selected = result.assets.map(asset => ({
        uri: asset.uri,
        base64: asset.base64,
      }));
      setImages(prevImages => [...prevImages, ...selected]);
      setOcrResult('');
    }     
  };

const handleUpload = async () => {
  if (images.length === 0) {
    SetErrorMessage('Por favor selecciona al menos una imagen.');
    SetOpen(true);
    return;
  }

  const idBase = 'img_id';
  const requestBody = {
    imgs: images.map((img, idx) => ({
      id: `${idBase}_${idx}`,
      data: img.base64,
    })),
  };

  try {
    SetErrorMessage('Cargando tu solicitud, por favor espera...');
    SetLoading(true);
    SetOpen(true); // Abrir el modal de aviso/carga

    const response = await fetch('https://equihua.org/api/ocr/recognize_imgs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const json = await response.json();
    const ocrText = requestBody.imgs.map((img, idx) => {
      const res = json.body?.imgs?.find(x => x.id === img.id);
      return res
        ? `\n${res.text}\n\n`
        : `⚠️ Imagen ${idx + 1}: No se recibió texto\n\n`;
    }).join('');
    setOcrResult(ocrText);
    // Cierra el modal de carga si el OCR fue exitoso y no hay error
    if (!loading) { // Asegúrate de que el loading no se esté utilizando para otra cosa
      SetOpen(false); 
      SetErrorMessage('');
    }
  } catch (error) {
    console.error('Error:', error);
    SetErrorMessage('No se pudo conectar al servidor o hubo un error al procesar las imágenes.');
    SetOpen(true); 
  } finally {
    SetLoading(false);
  }
};

  

  const resetForm = () => {
    setImages([]);
    setOcrResult('');
    SetErrorMessage(''); // Limpiar cualquier mensaje de error
    SetOpen(false); // Cerrar cualquier modal abierto
    SetLoading(false); // Detener cualquier indicador de carga
  }

  if(images.length === 0){
    return(
        <View style ={{flex: 1,alignItems: "center", justifyContent: 'center'}}>
          <Text style={[styles.title, {margin: 10}]}>Seleccione una o más imagenes para extraer el texto</Text>
          <View style ={{alignItems: "center", marginTop: 30}}>
            <Icon marginBottom = {20} name="upload" size={60} color="#000"/>
            <TouchableOpacity style={styles.buttonalone} onPress={selectImages}>
              <Text style={styles.buttonText}>Seleccionar Imágenes</Text>
            </TouchableOpacity>
          </View>
        </View>
    )
  }
  else{
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={100}
      >
        <ScrollView
          style={styles.container}
          contentContainerStyle={{ paddingBottom: 40 }}
          keyboardShouldPersistTaps="handled"
        >
          {images.length > 0 && (
            <>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.previewScroll}>
                {images.map((img, idx) => (
                  <Image key={idx} source={{ uri: img.uri }} style={styles.imageHorizontal} />
                ))}
              </ScrollView>
    
              <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <TouchableOpacity style={styles.buttonUpload} onPress={handleUpload}>
                  <Text style={styles.buttonText2}>Extraer Texto</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={selectImages}>
                  <Icon name="upload" size={30} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonReset} onPress={resetForm}>
                  <Icon name="trash-2" size={30} color="#FFFF" />
                </TouchableOpacity>
              </View>
    
              <View>
      <ScrollView
        style={[
          styles.textOutputContainer, // Un nuevo estilo para el ScrollView si lo necesitas
          {
            minHeight: 150, // Mismos límites de altura que tu TextInput
            maxHeight: 300,
          }
        ]}
        showsVerticalScrollIndicator ={false}
        // No necesitas scrollEnabled aquí, ya que el ScrollView lo maneja por defecto
      >
          <TextInput
            style={[
              styles.textOutput,
              {
                // Quita las propiedades de altura de aquí, el ScrollView las manejará
                minHeight: 'auto', // O 0, para que el TextInput no imponga su propia altura
                maxHeight: 'auto', // O 'none'
                height: 'auto',
              }
            ]}
            multiline={true} // Esencial para que el texto se "desborde" y el ScrollView lo capture
            scrollEnabled={false} // IMPORTANTE: Deshabilita el scroll del TextInput para que el ScrollView lo maneje
            textAlignVertical="top"
            editable={false}
            value={ocrResult}
            placeholder="Aquí aparecerá el texto extraído"
            onContentSizeChange={(e) => SetInputHeight(e.nativeEvent.contentSize.height)}
            // Ya que editable es false, onChangeText no es necesario
            // onChangeText={(e) => SetText(e)}
          />
        </ScrollView>
              </View>
            </>
          )}
    
            <Pressable
              style={styles.buttonUpload}
              onPress={() => {
                if (ocrResult.length > 0) {
                  const chunks = ocrResult.split('\n');
                  const filteredChunks = chunks.filter((value) => value.trim() !== '');
                  SetSendText(filteredChunks);
                  SetErrorMessage('Cargando tu solicitud, por favor espera...');
                  SetOpen(true); // Abre el modal de aviso/carga
                } else {
                  SetErrorMessage('Por favor extrae texto de una imagen primero.');
                  SetOpen(true);
                }
              }}
            >
              <Text style={styles.buttonText2}>Enviar texto</Text>
            </Pressable>

          {/* Modal de Aviso/Error */}
          <Modal visible={isOpen && !loading} transparent animationType="fade">
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Aviso</Text>
                <Text style={styles.modalMessage}>{errorMessage}</Text>
                <Pressable style={styles.modalButton} onPress={() => {
                  SetErrorMessage('');
                  SetOpen(false);
                }}>
                  <Text style={styles.modalButtonText}>Cerrar</Text>
                </Pressable>
              </View>
            </View>
          </Modal>

          {/* Modal de Carga */}
          <Modal visible={loading} transparent animationType="fade">
            <View style={styles.loadingOverlay}>
              <View style={styles.loadingContent}>
                <ActivityIndicator size="large" color="#000" />
                <Text style={styles.loadingText}>Procesando texto, por favor espera...</Text>
              </View>
            </View>
          </Modal>
        </ScrollView>
      </KeyboardAvoidingView>
    );
    
  }
};

export default UploadImage;

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
  textOutputContainer: {
    // Aquí puedes poner estilos como un borde, padding si quieres que el scrollbar esté dentro
    borderColor: '#bbb',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#f8f8f8',
    marginTop: 15,
    marginBottom: 10,
    // Las alturas minHeight y maxHeight del ScrollView son las que limitarán el área de scroll
  },
  textOutput: {
    width: '100%',
    padding: 12, // Asegúrate de que el padding esté en el TextInput
    fontSize: 16,
    // Aquí NO DEBEN IR minHeight, maxHeight, height porque el ScrollView las manejará
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
  // Estilos de los modales (copia de la pantalla Lobby)
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
});