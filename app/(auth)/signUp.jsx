import { View, Text, TextInput, Modal, Pressable, StyleSheet} from 'react-native';
import React, { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { base_url } from '@env';
import modal from '../styles/modals';

const SignUp = () => {
  const url = base_url;
  const [isOpen, SetOpen] = useState(false);
  const [message, SetMessage] = useState('');

  const [credentials, SetCredentials] = useState({
    username: '',
    password: '',
    name: '',
    patLastName: '',
    matLastName: '',
    phone: '',
  });

  const [registered, SetRegistered] = useState(null);

  useEffect(() => {
    if (registered != null) {
      if (!registered.error) {
        SetMessage('Usuario registrado correctamente');
      } else {
        SetMessage('Hubo un error, por favor inténtalo de nuevo');
      }
      SetOpen(true);
    }
  }, [registered]);
  

  return (
      <View style={styles.container}>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nombre</Text>
          <TextInput
            placeholder="Ingresa tu nombre"
            value={credentials.name}
            onChangeText={(e) => SetCredentials({ ...credentials, name: e })}
            style={styles.input}
          />
        </View>

        <View style={styles.rowContainer}>
          <View style={[styles.inputGroup, { flex: 1, marginRight: 5 }]}>
            <Text style={styles.label}>Apellido paterno</Text>
            <TextInput
              placeholder="Apellido paterno"
              value={credentials.patLastName}
              onChangeText={(e) => SetCredentials({ ...credentials, patLastName: e })}
              style={styles.input}
            />
          </View>
          <View style={[styles.inputGroup, { flex: 1, marginLeft: 5 }]}>
            <Text style={styles.label}>Apellido materno</Text>
            <TextInput
              placeholder="Apellido materno"
              value={credentials.matLastName}
              onChangeText={(e) => SetCredentials({ ...credentials, matLastName: e })}
              style={styles.input}
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nombre de usuario</Text>
          <TextInput
            placeholder="Ingresa tu nombre de usuario"
            value={credentials.username}
            onChangeText={(e) => SetCredentials({ ...credentials, username: e })}
            style={styles.input}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Contraseña</Text>
          <TextInput
            placeholder="Ingresa tu contraseña"
            secureTextEntry
            value={credentials.password}
            onChangeText={(e) => SetCredentials({ ...credentials, password: e })}
            style={styles.input}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Teléfono</Text>
          <TextInput
            placeholder="Teléfono"
            value={credentials.phone}
            keyboardType="numeric"
            onChangeText={(e) => SetCredentials({ ...credentials, phone: e })}
            style={styles.input}
          />
        </View>

        <View style={{ flex: 1 }} />

        <Pressable
          style={styles.registerButton}
          onPress={() => {
            const valid = Object.values(credentials).every((value) => value.trim().length >= 3);
            if (!valid) {
              SetMessage('Por favor, llena todos los campos con por lo menos 3 caracteres');
              SetOpen(true);
              return;
            }
            
            fetch(url + '/api/auth/signup', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(credentials),
            })
              .then((res) => res.json())
              .then((res) => {
                console.log('Respuesta del servidor:', res);
                SetRegistered(res)});

          }}
        >
          <Text style={styles.ButtonText}>Registrar cuenta</Text>
        </Pressable>
        <Modal visible={isOpen} transparent={true} animationType="fade">
          <View style={modal.modalOverlay}>
            <View style={modal.modalContent}>
              <View>
                <Text style={modal.modalTitle}>AVISO</Text>
              </View>
              <View>
                <Text style={modal.modalMessage}>{message}</Text>
              </View>
              <View>
              <Pressable
                style={modal.modalButton}
                onPress={() => {
                  SetOpen(false);
                  SetMessage('');
                  if (registered !== null && registered?.error === false) {
                    router.navigate('/');
                  }
                }}
              >
                <Text style={modal.modalButtonText}>Cerrar</Text>
              </Pressable>

              </View>
            </View>
          </View>
        </Modal>

      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f6f6f6',
    alignContent: 'space-between',
  },
  inputGroup: {
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  rowContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  registerButton: {
    backgroundColor: '#000',
    paddingVertical: 14,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  ButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SignUp;
