import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image, Pressable, TextInput, Modal, ActivityIndicator, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import Icon from "react-native-vector-icons/Feather";
import * as FileSystem from 'expo-file-system';
import TakePicture from '../components/takePicture';
// Asegúrate de que esta importación sea correcta si tienes los estilos de los modales en un archivo separado
// import modal from '../styles/modals'; 
import { router } from 'expo-router';

const pictureMenu = () => {
  const [sendingPhotos, setSendingPhotos] = useState([]);
  const [ocrResult, setOcrResult] = useState('');
  const [inputHeight, SetInputHeight] = useState(300);
  const [text, SetText] = useState('');
  const [cameraActive, setCameraActive] = useState(false);
  const [errorMessage, SetErrorMessage] = useState(''); // Estado para el mensaje de error
  const [postAI, SetPostAI] = useState(null);
  const [isOpen, SetOpen] = useState(false); // Estado para controlar la visibilidad del modal de aviso/error
  const [loading, SetLoading] = useState(false); // Estado para controlar la visibilidad del modal de carga
  const [sendText, SetSendText] = useState([]);


  useEffect(() => {
    if (sendText.length > 0) {
      SetLoading(true); // Activa el modal de carga
      SetOpen(true); // Abre el modal de aviso/carga
      SetErrorMessage('Cargando tu solicitud, por favor espera...'); // Mensaje para el modal de carga

      console.log(sendText);
      fetch("https://equihua.org/api/summaries/ai", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "termsConditions": sendText
        })
      })
      .then((res) => {
        if (!res.ok) {
          // Manejar errores HTTP aquí para evitar que el JSON falle
          return res.json().then(errorData => Promise.reject(errorData));
        }
        return res.json();
      })
      .then((res) => { SetPostAI(res); })
      .catch((error) => {
        SetErrorMessage('El texto enviado es irrelevante');
        SetOpen(true); // Asegúrate de que el modal de error se muestre
        SetPostAI({ error: true, message: 'Fallo de conexión o error en el servidor.' }); // Simular una respuesta de error
      })
      .finally(() => { SetLoading(false); }); // Desactiva el modal de carga
    }
  }, [sendText]);

  useEffect(() => {
    if (postAI != null) {
      if (postAI.error === false) {
        SetOpen(false); // Cierra el modal de aviso si fue exitoso
        SetErrorMessage(''); // Limpia el mensaje de error
        router.push({
          pathname: "textTranslated",
          params: { data: JSON.stringify(postAI) }
        });
      } else {
        // Mejorar el manejo de errores específicos aquí
        if (postAI.status === 400 && postAI.body === 'No se ha podido resumir') {
          SetErrorMessage('El texto contenido no es relevante o no se pudo resumir.');
        } else if (postAI.message) { // Si hay un mensaje de error desde la API
          SetErrorMessage(postAI.message);
        }
        else {
          SetErrorMessage('Hubo un error al procesar el texto.');
        }
        SetOpen(true); // Abre el modal de error
      }
    }
  }, [postAI]);

  useEffect(() => {
    // Este useEffect se encargará de abrir el modal de aviso cuando se establezca un errorMessage
    if (errorMessage !== '' && !loading) { // Asegúrate de que no esté el modal de carga activo
      SetOpen(true);
    }
  }, [errorMessage]);

  // Ya tienes la lógica para `loading` aquí, lo cual está bien.
  // Pero el mensaje de carga se establece en `sendText` y `handleUpload`
  // Para evitar duplicación, este `useEffect` podría ser más específico si es necesario
  // o se puede dejar que el mensaje de carga se establezca cuando `SetLoading(true)` se llama.
  // useEffect(() => {
  //   if (loading) {
  //     SetErrorMessage('Cargando tu solicitud, por favor espera...');
  //     SetOpen(true); // Abre el modal de aviso con el mensaje de carga
  //   }
  // }, [loading]);

  const handleUpload = async () => {
    if (sendingPhotos.length === 0) {
      SetErrorMessage('Por favor selecciona al menos una imagen para extraer texto.');
      SetOpen(true);
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
      SetErrorMessage('Extrayendo texto de las imágenes, por favor espera...');
      SetLoading(true); // Activa el modal de carga
      SetOpen(true); // Abre el modal de aviso/carga

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
      SetErrorMessage(''); // Limpia el mensaje de error
      SetOpen(false); // Cierra el modal de aviso/carga si fue exitoso
    } catch (error) {
      console.error('Error al procesar OCR:', error);
      SetErrorMessage('No se pudo conectar al servidor o hubo un error al extraer el texto de las imágenes.');
      SetOpen(true); // Asegúrate de que el modal de error se muestre
    } finally {
      SetLoading(false); // Desactiva el modal de carga
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
      SetErrorMessage('No se pudo procesar la imagen capturada.');
      SetOpen(true);
    }
  };

  const resetForm = () => {
    setSendingPhotos([]);
    setOcrResult('');
    SetErrorMessage('');
    SetOpen(false);
    SetLoading(false);
    SetSendText([]);
    SetPostAI(null);
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
        {/* Modales aquí para cuando no hay fotos seleccionadas y hay un error */}
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

        <Modal visible={loading} transparent animationType="fade">
          <View style={styles.loadingOverlay}>
            <View style={styles.loadingContent}>
              <ActivityIndicator size="large" color="#000" />
              <Text style={styles.loadingText}>Procesando, por favor espera...</Text>
            </View>
          </View>
        </Modal>
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

      <View style={{ flexDirection: 'row', justifyContent: 'space-around', }}>
        <TouchableOpacity style={styles.buttonUpload} onPress={handleUpload}>
          <Text style={styles.buttonText2}>Extraer texto</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setCameraActive(true)}>
          <AntDesign name="camerao" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonReset} onPress={resetForm}>
          <Icon name="trash-2" size={30} color="#FFFF" />
        </TouchableOpacity>
      </View>
      <ScrollView
        style={[
          styles.textOutputContainer, // Un nuevo estilo para el ScrollView si lo necesitas
          {
            minHeight: 150, // Mismos límites de altura que tu TextInput
            maxHeight: 300,
          }
        ]}
        showsVerticalScrollIndicator = {false}
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

      <View style={{ marginTop: 16 }}>
        <TouchableOpacity style={styles.buttonUpload} onPress={() => {
          if (ocrResult.length > 0) {
            const chunks = ocrResult.split('\n');
            const filteredChunks = chunks.filter((value) => value.trim() !== '');
            SetSendText(filteredChunks);
            // El mensaje de carga y el modal de aviso se manejan en el `useEffect` de `sendText`
          } else {
            SetErrorMessage('Por favor extrae texto de las imágenes primero.');
            SetOpen(true);
          }
        }}>
          <Text style={styles.buttonText2}>Enviar texto</Text>
        </TouchableOpacity>
      </View>

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
  buttonalone: {
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
  // Estilos de los modales copiados de Lobby
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