import { ScrollView, StyleSheet, Text, View, Pressable, Modal, Dimensions, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { base_url } from '@env';
import { router } from 'expo-router';
import Icon from "react-native-vector-icons/Ionicons";
import FloatingButton from '../(components)/floatingButton';
import FloatingButton2 from '../(components)/floatingButton2';
import modal from '../styles/modals';

const myDocs = () => {
    const url = base_url;
    const [data, SetData] = useState(null);
    const [contracts, SetContracts] = useState([]);
    const [loading, SetLoading] = useState(true);
    const [errorMessage, SetErrorMessage] = useState('Cargando, por favor espera...');
    const screenWidth = Dimensions.get('screen').width;
    const screenHeight = Dimensions.get('screen').height;
    

    useEffect(() => {
        fetch(url+'/api/summaries/all/1', {
            method:'GET',
            headers: {
                'Content-Type': 'application/json', // Indicar que el contenido es JSON
            },
        })
        .then((res) => {return res.json()})
        .then((res) => {SetData(res)})
    }, [])
      
    

    useEffect(() => {
        if (data != null) {
            if (!data.error) {
                SetContracts(data.body.summaries);
                SetLoading(false);
            } else {
                SetErrorMessage('Por el momento no tienes contratos registrados. Cuando registres un contrato, aquí aparecerá.');
                SetLoading(false);
            }
        }
    }, [data]);

    if (!loading) {
        if (contracts.length === 0) {
            return (
                <View style={styles.emptyContainer}>
                <Icon name="document" size={40} color="#000" />
                <Text style={styles.emptyTitle}>Aún no hay documentos</Text>
                <Text style={styles.emptySubtitle}>Cuando registres uno, aparecerá aquí.</Text>
                <FloatingButton2 />
                </View>
            );
        } else {
            return (
                <View style={{ flex: 1, position: 'relative' }}>
                    <FlatList
                    data={contracts}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.listContainer}
                    renderItem={({ item }) => (
                        <Pressable onPress={() => router.navigate("infoScreens/" + item.id)} style={({ pressed }) => [
                        styles.card,
                        pressed && { transform: [{ scale: 0.97 }], opacity: 0.9 }
                        ]}>
                        <Text style={styles.siteText}>{item.site}</Text>
                        <Text style={styles.labelText}>Firmado el:</Text>
                        <Text style={styles.dateText}>{item.registerDate}</Text>
                        </Pressable>
                    )}
                    />

                    <FloatingButton onpress ={() => console.log('pene')}/>
                </View>
            );
        }
    } else {
        return (
            <Modal visible={true} transparent={true} animationType="fade">
                <View style={modal.modalOverlay}>
                    <View style={modal.modalContent}>
                            <Text style={modal.modalTitle}>AVISO</Text>                   
                            <Text style={modal.modalMessage}>{errorMessage}</Text>
                    </View>
                </View>
            </Modal>
        );
    }
};

export default myDocs;

const styles = StyleSheet.create({
    listContainer: {
      padding: 10,
      paddingBottom: 30
    },
    card: {
      backgroundColor: '#1e1e1e',
      marginVertical: 10,
      marginHorizontal: 5,
      borderRadius: 16,
      padding: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 5
    },
    siteText: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#FFF',
      marginBottom: 10
    },
    labelText: {
      fontSize: 16,
      textAlign: 'center',
      color: '#aaa'
    },
    dateText: {
      fontSize: 18,
      textAlign: 'center',
      color: '#fff',
      marginTop: 4
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'white'
      },
      emptyTitle: {
        fontSize: 26,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 5,
        textAlign: 'center'
      },
      emptySubtitle: {
        fontSize: 16,
        color: 'gray',
        textAlign: 'center',
        marginBottom: 20
      }
  })
  
